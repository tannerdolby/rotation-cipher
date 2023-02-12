const { getCiphers } = require('../dist/lib/utility');

describe('tests for writing ciphers to output file', () => {
    test('perform multiple cipher operations', () => {
        const customRots = [
            [15, 2, 8, 19, 12, 21],
            [3, 13, 11, 17, 10, 25],
        ];
        const output = getCiphers('tanner', customRots, false, 250);
        expect(output.ciphers.length).toBe(278);
    });
});
