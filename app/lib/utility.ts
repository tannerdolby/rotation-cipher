import { caesarCipher } from '../index';

export function randomRotation(s: string, useAscii: boolean = false): Array<number> {
    if (!s) return [];
    const min = 1;
    const max = useAscii ? 126 : 26;
    return Array.from(s).map((_) => rand(min, max));
}

export function getUniqueRotations(s: string, n: number, useAscii: boolean = false) {
    const rotations: Set<Array<number>> = new Set();
    for (let i = 0; i < n; i++) {
        rotations.add(randomRotation(s, useAscii));
    }
    return rotations;
}

export function getUniformCiphers(s: string, useAscii = false) {
    const ciphers = [];
    for (let i = 1; i < 27; i++) {
        ciphers.push(`${caesarCipher(s, i, [], useAscii)} | ${i}`);
    }
    return ciphers;
}

export function getCustomCiphers(
    input: string,
    useAscii = false,
    rotations: Array<Array<number>>
) {
    if (!rotations) return [];
    return rotations.map((rot) => {
        return `${caesarCipher(input, 0, rot, useAscii)} | [${rot}]`;
    });
}

export function getRandomCiphers(
    input: string,
    useAscii = false,
    randomRotations = 250
) {
    return [...getUniqueRotations(input, randomRotations)].map((rotArr) => {
        return `${caesarCipher(input, 0, rotArr, useAscii)} | [${rotArr}]`;
    });
}

export function getRepeatedChars(ch: string, n: number) {
    return ''.padEnd(n, ch);
}

export function getAlphabet(lowercase: boolean = true): Array<string> {
    const alphabet = [];
    const start: number = lowercase ? 97 : 65;
    const end: number = lowercase ? 123 : 91;

    for (let i = start, j = 0; i < end; i++, j++) {
        alphabet[j] = String.fromCharCode(i);
    }

    return alphabet;
}

export function getAsciiTable(): Array<string> {
    const ascii: Array<string> = [];
    for (let i = 33, j = 0; i < 127; i++, j++) {
        ascii[j] = String.fromCharCode(i);
    }
    return ascii;
}

export function getHumanReadableAscii(): Array<string> {
    return Array.from(getAsciiTable().values());
}

export function getAsciiWithoutLetters(): Array<string> {
    const ascii = getHumanReadableAscii();
    return ascii
        .slice(0, 32)
        .concat(ascii.slice(91, 96))
        .concat(ascii.slice(123, 126));
}

export function rand(min: number, max: number) {
    max = Math.ceil(max);
    min = Math.ceil(min);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function findChar(ch: string, chars: Array<string>) {
    return chars.findIndex((char) => char === ch);
}

export function makeSectionHeader(
    s: string,
    header: string,
    hideInfo: boolean = false
) {
    const input = `input: ${s}`;
    const label = getRepeatedChars(' ', s.length - 'name'.length);
    const nameLine = `name${label} | rotation`;
    const info = !hideInfo
        ? `${input}\n${nameLine}\n${getRepeatedChars('-', 39)}\n`
        : '';
    return `---------- ${header} ----------\n${info}`;
}

export function getCiphers(
    input: string,
    rotations: Array<Array<number>>,
    useAscii: boolean,
    randomRotations: number
) {
    if (!input) return {};
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
