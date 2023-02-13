import * as util from './lib/utility';
export { util };
export {
    randomRotation,
    getUniqueRotations,
    getUniformCiphers,
    getCustomCiphers,
    getRandomCiphers,
    getRepeatedChars,
    getAlphabet,
    getAsciiTable,
    getHumanReadableAscii,
    getAsciiWithoutLetters,
    getCiphers,
} from './lib/utility';

function cipherHelper(
    ch: string,
    rot: number,
    chars: Array<string>,
    decrypt: boolean = false
) {
    let idx = util.findChar(ch, chars);
    let shift = decrypt ? idx - rot : idx + rot;
    if (shift < 0) {
        shift = chars.length - Math.abs(shift);
    }
    return shift;
}

export function caesarCipher(
    s: string,
    rot: number = 13,
    rotations: Array<number> = [],
    decrypt: boolean = false
) {
    const letters = util.getAlphabet();
    const ascii = util.getAsciiWithoutLetters();
    let nL = letters.length;
    let nA = ascii.length;
    let cipher = '';
    let shift = 0;

    if (typeof s != 'string') {
        throw new Error(`Input must be type 'string'`);
    }

    if (rotations && rotations.length) {
        return customCipher(s, rotations, decrypt);
    }

    for (let i = 0; i < s.length; i++) {
        if (letters.includes(s[i])) {
            shift = cipherHelper(s[i], rot, letters, decrypt);
            let letter = letters[shift % nL];
            cipher += s[i].toLowerCase() === s[i] ? letter : letter.toUpperCase();
        } else if (ascii.includes(s[i])) {
            shift = cipherHelper(s[i], rot, ascii, decrypt);
            cipher += ascii[shift % nA];
        } else {
            continue;
        }
    }

    return cipher;
}

function customCipher(
    s: string,
    rotations: Array<number>,
    decrypt: boolean = false
) {
    const n = rotations.length;
    const hasRotationArr = Boolean(rotations && n);
    let cipher = '';

    if (hasRotationArr && n != s.length) {
        throw new Error(
            'Custom rotation array must be the same length as the input string'
        );
    }

    for (let i = 0; i < n; i++) {
        cipher += caesarCipher(s[i], rotations[i], [], decrypt);
    }

    return cipher;
}
