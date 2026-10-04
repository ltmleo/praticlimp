from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
import subprocess
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'tmp/panfletos-deps'))
import zxingcpp
from PIL import Image

folder = Path(__file__).resolve().parent
import re
images = list(folder.glob('*-feed.png')) + list(folder.glob('*-story.png'))
assert len(images) == 8
for image in images:
    assert Image.open(image).size == (1080, 1350 if '-feed' in image.name else 1920)
for link in re.findall(r'(?:href|src)="([^"]+)"', (folder / 'index.html').read_text(encoding='utf-8')):
    assert (folder / link).exists(), link
mm = 72 / 25.4
for target in folder.glob('*.pdf'):
    reader = PdfReader(target)
    assert len(reader.pages) == 2, (target, len(reader.pages))
    writer = PdfWriter()
    for page in reader.pages:
        page.scale_to(154 * mm, 216 * mm)
        page.trimbox = RectangleObject([3 * mm, 3 * mm, 151 * mm, 213 * mm])
        page.bleedbox = RectangleObject([0, 0, 154 * mm, 216 * mm])
        writer.add_page(page)
    writer.add_metadata({'/Title': 'Pratic Limp | ' + target.stem, '/Subject': 'A5; sangria 3 mm; conferencia RGB'})
    with target.open('wb') as stream:
        writer.write(stream)
    check = PdfReader(target)
    for page in check.pages:
        assert abs(float(page.trimbox.width) / mm - 148) < .01
        assert abs(float(page.trimbox.height) / mm - 210) < .01
        assert '97416-3336' in page.extract_text()
    subprocess.run(['pdftoppm', '-scale-to', '1300', '-png', str(target), str(folder / 'previews' / target.stem)], check=True, capture_output=True)
    for i, side in enumerate(['front', 'back']):
        png = folder / 'previews' / f'{target.stem}-{side}.png'
        (folder / 'previews' / f'{target.stem}-{i+1}.png').replace(png)
    # Decode the full-resolution PDF raster, not the source SVG.
    decoded = zxingcpp.read_barcodes(Image.open(folder / 'previews' / f'{target.stem}-back.png'))
    assert len(decoded) == 1, target
    value = decoded[0].text
    assert value.startswith('https://wa.me/5519974163336?text='), (target, value)
    assert target.stem[:2] in value
    print(target.name, '2 pages, A5 trim, QR OK')
