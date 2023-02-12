const {
    rand,
    getAsciiTable,
    getRepeatedChars,
    makeSectionHeader,
} = require('../dist/lib/utility');

describe('tests for utility functions', () => {
    let asciiTable = {};

    beforeEach(() => {
        asciiTable = getAsciiTable();
    });

    test('creates a random number in the inclusive range', () => {
        const random = rand(10, 15);
        expect(typeof random).toBe('number');
        expect(random >= 10 && random <= 15).toBe(true);
    });

    test('add space', () => {
        const str = 'foo bar';
        expect(str + getRepeatedChars(' ', 3)).toBe(str + '   ');
    });

    test('get ascii table (dec 33-27)', () => {
        expect(getAsciiTable()).toStrictEqual(asciiTable);
    });

    test('get hypen string', () => {
        expect(getRepeatedChars('-', 3)).toBe('---');
    });

    test('make section header', () => {
        const hyphens = getRepeatedChars('-', 10);
        const footerHyphens = getRepeatedChars('-', 39);
        const header = `${hyphens} Some Header ${hyphens}\ninput: foo bar\nname    | rotation\n${footerHyphens}\n`;
        expect(makeSectionHeader('foo bar', 'Some Header')).toBe(header);
    });
});
