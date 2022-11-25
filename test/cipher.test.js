const { caesarCipher } = require('../src/index')

describe('tests for cipher utility', () => {

    test('cipher with default rotation (rot13)', () => {
        const cipher = caesarCipher('tanner')

        expect(typeof cipher).toBe('string')
        expect(cipher).toBe('gnaare')
    })

    test('cipher with default rotation (rot13) and includes ASCII', () => {
        const cipher = caesarCipher('tanner', 13, null, true)

        expect(typeof cipher).toBe('string')
        expect(cipher).toBe('<TaaXe')
    })

    test('cipher with user-defined uniform rotation', () => {
        const cipher = caesarCipher('tanner', 17)

        expect(typeof cipher).toBe('string')
        expect(cipher).toBe('kreevi')
    })

    test('cipher with user-defined uniform rotation and includes ASCII', () => {
        const cipher = caesarCipher('tanner', 17, null, true)

        expect(typeof cipher).toBe('string')
        expect(cipher).toBe('@Xee\\>')
    })

    test('cipher with custom rotation array', () => {
        const customRot = [6, 12, 5, 8, 14, 17]
        const cipher = caesarCipher('tanner', null, customRot)

        expect(typeof cipher).toBe('string')
        expect(cipher).toBe('zmsvsi')
    })

    test('cipher with custom rotation array and includes ASCII', () => {
        const customRot = [20, 30, 5, 10, 23, 17]
        const cipher = caesarCipher('tanner', null, customRot, true)

        expect(typeof cipher).toBe('string')
        expect(cipher).toBe('CeY^b>')
    })

    test('throw error if custom rotation array does not equal length of input str', () => {
        function cipher() {
            caesarCipher('tanner', null, [20, 30, 5, 10, 23], true)
        }

        expect(cipher).toThrow()
        expect(cipher).toThrow('Custom rotation array must be the same length as the input string')
    })

    test('throw error if input is not a string', () => {
        function cipherOne() { caesarCipher({}) }
        function cipherTwo() { caesarCipher([]) }
        function cipherThree() { caesarCipher(13) }
        function cipherFour() { caesarCipher(null) }
        function cipherFive() { caesarCipher(true) }
        function cipherSix() { caesarCipher() }

        const fns = [cipherOne, cipherTwo, cipherThree, cipherFour, cipherFive, cipherSix]

        fns.forEach(fn => {
            expect(fn).toThrow()
            expect(fn).toThrow(`Input must be type 'string'`)
        })
    })

})