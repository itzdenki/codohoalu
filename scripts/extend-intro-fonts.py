"""Extend the existing PDF font subsets for the English introduction.

All outlines come from the project's original fonts. Duralith E is the
unaccented body of its Ê; D removes the crossbar detours from Đ. Stampa e
is the unaccented body of ê. No original font file is modified.
"""
from array import array
from pathlib import Path

from fontTools import subset
from fontTools.merge import Merger
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import Glyph, GlyphCoordinates
from fontTools.ttLib.tables.ttProgram import Program

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / 'public/pages'
DESTINATION = PAGES / 'dth/gioi-thieu'


def retained_outline(source_font, glyph_name, retained_contours):
    original = source_font['glyf'][glyph_name]
    assert not original.isComposite()
    coordinates, _, flags = original.getCoordinates(source_font['glyf'])
    indices = [i for contour in retained_contours for i in contour]
    glyph = Glyph()
    glyph.numberOfContours = len(retained_contours)
    glyph.coordinates = GlyphCoordinates([coordinates[i] for i in indices])
    glyph.flags = array('B', [flags[i] for i in indices])
    glyph.endPtsOfContours = []
    endpoint = -1
    for contour in retained_contours:
        endpoint += len(contour)
        glyph.endPtsOfContours.append(endpoint)
    glyph.program = Program()
    glyph.program.fromBytecode([])
    return glyph


def add_glyph(font, source_font, source_name, new_name, contours, character):
    order = font.getGlyphOrder()[:]
    assert new_name not in order
    font['glyf'][new_name] = retained_outline(source_font, source_name, contours)
    font.setGlyphOrder(order + [new_name])
    font['hmtx'][new_name] = source_font['hmtx'][source_name]
    for table in font['cmap'].tables:
        if table.isUnicode():
            table.cmap[ord(character)] = new_name


def save_font(font, filename, required_text):
    assert not {ord(c) for c in required_text} - set(font.getBestCmap())
    options = subset.Options()
    options.hinting = False
    cleaner = subset.Subsetter(options=options)
    cleaner.populate(unicodes=font.getBestCmap())
    cleaner.subset(font)
    font.flavor = 'woff'
    font.save(DESTINATION / filename)
    verified = TTFont(DESTINATION / filename)
    missing = {c for c in required_text if ord(c) not in verified.getBestCmap()}
    assert not missing, missing
    print(f'{filename}: {len(verified.getBestCmap())} mapped characters; title coverage complete')


def main():
    script = Merger().merge([
        str(PAGES / 'dth/kien-truc/f2.woff'),
        str(PAGES / 'dth/long-sang-nghi-mon-ngoai/f3.woff'),
    ])
    source = TTFont(PAGES / 'dth/den-tho-vua-chi-tiet/f2.woff')
    e_coordinates, e_ends, _ = source['glyf']['Ecircumflex'].getCoordinates(source['glyf'])
    assert list(e_ends) == [47, 51, 55, 88]
    assert max(y for x, y in e_coordinates[:48]) == 700
    d_coordinates, d_ends, _ = source['glyf']['Dcroat'].getCoordinates(source['glyf'])
    assert list(d_ends) == [31, 60]
    assert tuple(d_coordinates[14]) == (53, 52)
    assert tuple(d_coordinates[28]) == (53, 647)
    assert tuple(d_coordinates[45]) == (140, 595)
    assert tuple(d_coordinates[58]) == (140, 105)
    add_glyph(script, source, 'Ecircumflex', 'introE', [list(range(48))], 'E')
    add_glyph(script, source, 'Dcroat', 'introD', [
        list(range(15)) + list(range(28, 32)),
        list(range(32, 46)) + list(range(58, 61)),
    ], 'D')
    save_font(script, 'intro-script.woff', 'GENERAL INTRODUCTION')

    display = Merger().merge([
        str(PAGES / 'dth/gioi-thieu/f4.woff'),
        str(PAGES / 'ldh/den-tho-vua/f4.woff'),
    ])
    source = TTFont(PAGES / 'ldh/den-tho-vua/f4.woff')
    coordinates, ends, _ = source['glyf']['ecircumflex'].getCoordinates(source['glyf'])
    assert list(ends) == [6, 18]
    assert min(y for x, y in coordinates[:7]) == 760
    assert max(y for x, y in coordinates[7:]) == 700
    add_glyph(display, source, 'ecircumflex', 'introe', [list(range(7, 19))], 'e')
    save_font(display, 'intro-display.woff', 'to the Hoa Lư ancient capital site')


if __name__ == '__main__':
    main()
