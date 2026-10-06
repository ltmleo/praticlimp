from pathlib import Path
import json
import re
import subprocess
import sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from PIL import Image, ImageOps, ImageDraw

folder = Path(__file__).resolve().parent
root = folder.parents[1]
sys.path.insert(0, str(root / 'tmp/materiais-deps'))
import zxingcpp
out = root / 'output/pdf'
preview = folder / 'previews'
preview.mkdir(exist_ok=True)
scratch = root / 'tmp/pdfs/materiais'
scratch.mkdir(parents=True, exist_ok=True)
mm = 72 / 25.4
pieces = json.loads((folder / 'manifest.json').read_text(encoding='utf-8'))
whatsapp = re.search(r"whatsapp:\s*'([^']+)'", (root / 'src/data/company.ts').read_text(encoding='utf-8'))[1]

for piece in pieces:
    target = out / (piece['id'] + '.pdf')
    width, height = piece['trim']
    reader = PdfReader(target)
    assert len(reader.pages) == 2, (target, len(reader.pages))
    writer = PdfWriter()
    for page in reader.pages:
        page.scale_to((width + 6) * mm, (height + 6) * mm)
        page.trimbox = RectangleObject([3*mm, 3*mm, (width+3)*mm, (height+3)*mm])
        page.bleedbox = RectangleObject([0, 0, (width+6)*mm, (height+6)*mm])
        writer.add_page(page)
    writer.add_metadata({'/Title': 'Pratic Limp | ' + piece['name'], '/Subject': 'Frente e verso; sangria de 3 mm; conferencia RGB; design system 1.0'})
    with target.open('wb') as stream:
        writer.write(stream)
    check = PdfReader(target)
    combined_text = '\n'.join(p.extract_text() for p in check.pages)
    assert '1991' in combined_text
    assert not re.search(r'\b\d+\s*anos\b|nossos clientes|base de clientes', combined_text, re.I)
    assert '(19) 97416-3336' in combined_text
    assert 'adm@praticlimp.com.br' in combined_text
    for page in check.pages:
        assert abs(float(page.trimbox.width) / mm - width) < .01
        assert abs(float(page.trimbox.height) / mm - height) < .01
        for ref in page['/Resources'].get('/Font', {}).values():
            font = ref.get_object()
            descendants = font.get('/DescendantFonts')
            descriptor = (descendants[0].get_object() if descendants else font).get('/FontDescriptor')
            assert descriptor is not None, font
            descriptor = descriptor.get_object()
            assert any(k in descriptor for k in ['/FontFile', '/FontFile2', '/FontFile3']), font
    subprocess.run(['pdftoppm', '-r', '180', '-png', str(target), str(scratch / piece['id'])], check=True, capture_output=True)
    for i, side in enumerate(['front', 'back'], 1):
        full = Image.open(scratch / f"{piece['id']}-{i}.png").convert('RGB')
        sx, sy = full.width/(width+6), full.height/(height+6)
        cropped = full.crop((round(3*sx), round(3*sy), round((width+3)*sx), round((height+3)*sy)))
        cropped.save(preview / f"{piece['id']}-{side}.png")
        if side == 'back':
            codes = zxingcpp.read_barcodes(cropped)
            assert len(codes) == 1 and codes[0].text == 'https://wa.me/' + whatsapp, (target, codes)
    print(piece['id'], ': 2 paginas; corte e sangria OK; fontes incorporadas; QR decodificado; texto perene OK')

canvas = Image.new('RGB', (1600, 1880), '#eff4f7')
draw = ImageDraw.Draw(canvas)
for row, piece in enumerate(pieces):
    y = row * 470 + 15
    draw.text((30, y), piece['id'], fill='#102f43')
    for col, side in enumerate(['front', 'back']):
        img = Image.open(preview / f"{piece['id']}-{side}.png")
        img.thumbnail((740, 415))
        canvas.paste(img, (30 + col*790 + (740-img.width)//2, y+30))
canvas.save(preview / 'conferencia.png')
