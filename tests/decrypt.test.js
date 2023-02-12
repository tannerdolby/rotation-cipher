const { caesarCipher } = require('../dist/index');

describe('decrypt cipher tests', () => {
    test('decrypt a uniform rotation string', () => {
        expect(caesarCipher('kreevi', 17, [], true)).toBe('tanner');
        expect(caesarCipher('gnaare', 13, [], true)).toBe('tanner');
    });

    test('decrypt a custom rotation', () => {
        expect(caesarCipher('foo', 0, [3, 4, 5], true)).toBe('ckj');
    });
});
