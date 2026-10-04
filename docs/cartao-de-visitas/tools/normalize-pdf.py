"""Normalize Chromium paper rounding without rasterizing text or artwork."""
import sys
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

target = Path(sys.argv[1])
reader = PdfReader(target)
writer = PdfWriter()
mm = 72 / 25.4
for page in reader.pages:
    page.scale_to(96 * mm, 56 * mm)
    page.trimbox = RectangleObject([3 * mm, 3 * mm, 93 * mm, 53 * mm])
    page.bleedbox = RectangleObject([0, 0, 96 * mm, 56 * mm])
    writer.add_page(page)
writer.add_metadata({"/Title": "Pratic Limp | " + target.stem,
                     "/Subject": "90 x 50 mm; 3 mm bleed; RGB proof"})
with target.open("wb") as stream:
    writer.write(stream)
