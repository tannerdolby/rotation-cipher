"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caesarCipher = exports.getCiphers = exports.getAsciiWithoutLetters = exports.getHumanReadableAscii = exports.getAsciiTable = exports.getAlphabet = exports.getRepeatedChars = exports.getRandomCiphers = exports.getCustomCiphers = exports.getUniformCiphers = exports.getUniqueRotations = exports.randomRotation = exports.util = void 0;
const util = require("./lib/utility");
exports.util = util;
var utility_1 = require("./lib/utility");
Object.defineProperty(exports, "randomRotation", { enumerable: true, get: function () { return utility_1.randomRotation; } });
Object.defineProperty(exports, "getUniqueRotations", { enumerable: true, get: function () { return utility_1.getUniqueRotations; } });
Object.defineProperty(exports, "getUniformCiphers", { enumerable: true, get: function () { return utility_1.getUniformCiphers; } });
Object.defineProperty(exports, "getCustomCiphers", { enumerable: true, get: function () { return utility_1.getCustomCiphers; } });
Object.defineProperty(exports, "getRandomCiphers", { enumerable: true, get: function () { return utility_1.getRandomCiphers; } });
Object.defineProperty(exports, "getRepeatedChars", { enumerable: true, get: function () { return utility_1.getRepeatedChars; } });
Object.defineProperty(exports, "getAlphabet", { enumerable: true, get: function () { return utility_1.getAlphabet; } });
Object.defineProperty(exports, "getAsciiTable", { enumerable: true, get: function () { return utility_1.getAsciiTable; } });
Object.defineProperty(exports, "getHumanReadableAscii", { enumerable: true, get: function () { return utility_1.getHumanReadableAscii; } });
Object.defineProperty(exports, "getAsciiWithoutLetters", { enumerable: true, get: function () { return utility_1.getAsciiWithoutLetters; } });
Object.defineProperty(exports, "getCiphers", { enumerable: true, get: function () { return utility_1.getCiphers; } });
function cipherHelper(ch, rot, chars, decrypt = false) {
    let idx = util.findChar(ch, chars);
    let shift = decrypt ? idx - rot : idx + rot;
    if (shift < 0) {
        shift = chars.length - Math.abs(shift);
    }
    return shift;
}
function caesarCipher(s, rot = 13, rotations = [], decrypt = false) {
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
