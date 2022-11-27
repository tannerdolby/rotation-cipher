const { decrypt } = require('../index')

describe('decrypt cipher tests', () => {

    test('decrypt a uniform rotation string', () => {
        expect(decrypt('kreevi', 17)).toBe('tanner')
        expect(decrypt('gnaare')).toBe('tanner')
    })

    test('decrypt a custom rotation', () => {
        expect(decrypt('foo', null, [3, 4, 5])).toBe('ckj')
    })
})