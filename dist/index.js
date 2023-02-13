"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caesarCipher = void 0;
const utility_1 = require("./lib/utility");
function cipherHelper(ch, rot, chars, decrypt = false) {
    let idx = (0, utility_1.findChar)(ch, chars);
    let shift = decrypt ? idx - rot : idx + rot;
    if (shift < 0) {
        shift = chars.length - Math.abs(shift);
    }
    return shift;
}
function caesarCipher(s, rot = 13, rotations = [], decrypt = false) {
    const letters = (0, utility_1.getAlphabet)();
    const ascii = (0, utility_1.getAsciiWithoutLetters)();
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
        }
        else if (ascii.includes(s[i])) {
            shift = cipherHelper(s[i], rot, ascii, decrypt);
            cipher += ascii[shift % nA];
        }
        else {
            continue;
        }
    }
    return cipher;
}
exports.caesarCipher = caesarCipher;
function customCipher(s, rotations, decrypt = false) {
    const n = rotations.length;
    const hasRotationArr = Boolean(rotations && n);
    let cipher = '';
    if (hasRotationArr && n != s.length) {
        throw new Error('Custom rotation array must be the same length as the input string');
    }
    for (let i = 0; i < n; i++) {
        cipher += caesarCipher(s[i], rotations[i], [], decrypt);
    }
    return cipher;
}
module.exports = {
    caesarCipher,
    randomRotation: utility_1.randomRotation,
    getUniqueRotations: utility_1.getUniqueRotations,
    getUniformCiphers: utility_1.getUniformCiphers,
    getCustomCiphers: utility_1.getCustomCiphers,
    getRandomCiphers: utility_1.getRandomCiphers,
    getRepeatedChars: utility_1.getRepeatedChars,
    getAlphabet: utility_1.getAlphabet,
    getAsciiTable: utility_1.getAsciiTable,
    getHumanReadableAscii: utility_1.getHumanReadableAscii,
    getAsciiWithoutLetters: utility_1.getAsciiWithoutLetters,
    rand: utility_1.rand,
    findChar: utility_1.findChar,
    makeSectionHeader: utility_1.makeSectionHeader,
    getCiphers: utility_1.getCiphers,
};
