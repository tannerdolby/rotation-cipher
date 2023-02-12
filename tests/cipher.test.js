const { caesarCipher } = require('../dist/index');

describe('tests for cipher utility', () => {
    test('cipher with default rotation (rot13)', () => {
        const cipher = caesarCipher('tanner');
        expect(typeof cipher).toBe('string');
        expect(cipher).toBe('gnaare');
    });

    test('cipher with user-defined uniform rotation', () => {
        const cipher = caesarCipher('tanner', 17);
        expect(typeof cipher).toBe('string');
        expect(cipher).toBe('kreevi');
    });

    test('cipher with default rotation (rot13) and includes ASCII', () => {
        const cipher = caesarCipher('tanner!', 13);
        expect(typeof cipher).toBe('string');
        expect(cipher).toBe('gnaare.');
    });

    test('cipher with user-defined uniform rotation and includes ASCII', () => {
        const cipher = caesarCipher('tanner!', 17);
        expect(typeof cipher).toBe('string');
        expect(cipher).toBe('kreevi2');
    });

    test('cipher with custom rotation array', () => {
        const cipher = caesarCipher('tanner', 0, [6, 12, 5, 8, 14, 17]);
        expect(typeof cipher).toBe('string');
        expect(cipher).toBe('zmsvsi');
    });

    test('cipher with custom rotation array and includes ASCII', () => {
        const cipher = caesarCipher('t@nner!', 0, [16, 30, 5, 10, 23, 17, 11]);
        expect(typeof cipher).toBe('string');
        expect(cipher).toBe('j;sxbi,');
    });

    test('throw error if custom rotation array does not equal length of input str', () => {
        function cipher() {
            caesarCipher('tanner', null, [20, 30, 5, 10, 23], true);
        }
        expect(cipher).toThrow();
        expect(cipher).toThrow(
            'Custom rotation array must be the same length as the input string'
        );
    });

    test('throw error if input is not a string', () => {
        function cipherOne() {
            return caesarCipher({});
        }
        function cipherTwo() {
            return caesarCipher([]);
        }
        function cipherThree() {
            return caesarCipher(13);
        }
        function cipherFour() {
            return caesarCipher(true);
        }
        function cipherFive() {
            return caesarCipher(null);
        }
        function cipherSix() {
            return caesarCipher();
        }

        const fns = [
            cipherOne,
            cipherTwo,
            cipherThree,
            cipherFour,
            cipherFive,
            cipherSix,
        ];

        fns.forEach((fn, i) => {
            expect(fn).toThrow();
            expect(fn).toThrow(`Input must be type 'string'`);
        });
    });
});
