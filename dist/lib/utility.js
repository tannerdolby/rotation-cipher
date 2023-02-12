"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCiphers = exports.makeSectionHeader = exports.findChar = exports.rand = exports.getAsciiWithoutLetters = exports.getHumanReadableAscii = exports.getAsciiTable = exports.getAlphabet = exports.getRepeatedChars = exports.getRandomCiphers = exports.getCustomCiphers = exports.getUniformCiphers = exports.getUniqueRotations = exports.randomRotation = void 0;
const index_1 = require("../index");
function randomRotation(s, useAscii = false) {
    if (!s)
        return [];
    const min = 1;
    const max = useAscii ? 126 : 26;
    return Array.from(s).map((_) => rand(min, max));
}
exports.randomRotation = randomRotation;
function getUniqueRotations(s, n, useAscii = false) {
    const rotations = new Set();
    for (let i = 0; i < n; i++) {
        rotations.add(randomRotation(s, useAscii));
    }
    return rotations;
}
exports.getUniqueRotations = getUniqueRotations;
function getUniformCiphers(s, useAscii = false) {
    const ciphers = [];
    for (let i = 1; i < 27; i++) {
        ciphers.push(`${(0, index_1.caesarCipher)(s, i, [], useAscii)} | ${i}`);
    }
    return ciphers;
}
exports.getUniformCiphers = getUniformCiphers;
function getCustomCiphers(input, useAscii = false, rotations) {
    if (!rotations)
        return [];
    return rotations.map((rot) => {
        return `${(0, index_1.caesarCipher)(input, 0, rot, useAscii)} | [${rot}]`;
    });
}
exports.getCustomCiphers = getCustomCiphers;
function getRandomCiphers(input, useAscii = false, randomRotations = 250) {
    return [...getUniqueRotations(input, randomRotations)].map((rotArr) => {
        return `${(0, index_1.caesarCipher)(input, 0, rotArr, useAscii)} | [${rotArr}]`;
    });
}
exports.getRandomCiphers = getRandomCiphers;
function getRepeatedChars(ch, n) {
    return ''.padEnd(n, ch);
}
exports.getRepeatedChars = getRepeatedChars;
function getAlphabet(lowercase = true) {
    const alphabet = [];
    const start = lowercase ? 97 : 65;
    const end = lowercase ? 123 : 91;
    for (let i = start, j = 0; i < end; i++, j++) {
        alphabet[j] = String.fromCharCode(i);
    }
    return alphabet;
}
exports.getAlphabet = getAlphabet;
function getAsciiTable() {
    const ascii = [];
    for (let i = 33, j = 0; i < 127; i++, j++) {
        ascii[j] = String.fromCharCode(i);
    }
    return ascii;
}
exports.getAsciiTable = getAsciiTable;
function getHumanReadableAscii() {
    return Array.from(getAsciiTable().values());
}
exports.getHumanReadableAscii = getHumanReadableAscii;
function getAsciiWithoutLetters() {
    const ascii = getHumanReadableAscii();
    return ascii
        .slice(0, 32)
        .concat(ascii.slice(91, 96))
        .concat(ascii.slice(123, 126));
}
exports.getAsciiWithoutLetters = getAsciiWithoutLetters;
function rand(min, max) {
    max = Math.ceil(max);
    min = Math.ceil(min);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.rand = rand;
function findChar(ch, chars) {
    return chars.findIndex((char) => char === ch);
}
exports.findChar = findChar;
function makeSectionHeader(s, header, hideInfo = false) {
    const input = `input: ${s}`;
    const label = getRepeatedChars(' ', s.length - 'name'.length);
    const nameLine = `name${label} | rotation`;
    const info = !hideInfo
        ? `${input}\n${nameLine}\n${getRepeatedChars('-', 39)}\n`
        : '';
    return `---------- ${header} ----------\n${info}`;
}
exports.makeSectionHeader = makeSectionHeader;
function getCiphers(input, rotations, useAscii, randomRotations) {
    if (!input)
        return {};
    const cipherList = [];
    let uniform = makeSectionHeader(input, 'Uniform Rotations');
    let custom = makeSectionHeader(input, 'Custom Rotations', true);
    let unique = makeSectionHeader(input, 'Random Rotations', true);
    const uniformCiphers = getUniformCiphers(input, useAscii);
    const customCiphers = getCustomCiphers(input, useAscii, rotations);
    const randomCiphers = getRandomCiphers(input, useAscii, randomRotations);
    uniform += uniformCiphers.join('\n');
    custom += customCiphers.join('\n');
    unique += randomCiphers.join('\n');
    cipherList.push(...uniformCiphers);
    cipherList.push(...customCiphers);
    cipherList.push(...randomCiphers);
    return {
        ciphers: cipherList,
        cipherString: `${uniform}\n${custom}\n${unique}`,
        createdAt: new Date().toISOString(),
    };
}
exports.getCiphers = getCiphers;
