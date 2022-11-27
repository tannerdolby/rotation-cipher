const {
    rand,
    addSpace,
    getAsciiTable,
    getHyphenStr,
    makeSectionHeader,
} = require('../lib/utility')

describe('tests for utility functions', () => {
    let asciiTable = {}

    beforeEach(() => {
        asciiTable = getAsciiTable()
    })

    test('creates a random number', () => {
        const random = rand(10, 15)

        expect(typeof random).toBe('number')
    })

    test('add space', () => {
        const str = 'foo bar'

        expect(str + addSpace(3)).toBe(str + '   ')
    })

    test('get ascii table (dec 33-27)', () => {
        expect(getAsciiTable()).toStrictEqual(asciiTable)
    })

    test('get hypen string', () => {
        expect(getHyphenStr(3)).toBe('---')
    })

    test('make section header', () => {
        const hyphens = getHyphenStr(10)
        const footerHyphens = getHyphenStr(39)
        const header = `${hyphens} Some Header ${hyphens}\ninput: foo bar\nname    | rotation\n${footerHyphens}\n`
        
        expect(makeSectionHeader('foo bar', 'Some Header')).toBe(header)
    })
})