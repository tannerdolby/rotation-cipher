import { caesarCipher } from '../index';

export function randomRotation(
    s: string,
    min: number = 1,
    max: number = 126
): Array<number> {
    if (!s) return [];
    return Array.from(s).map((_) => rand(min, max));
}

export function getUniqueRotations(s: string, n: number) {
    const rotations: Set<Array<number>> = new Set();
    for (let i = 0; i < n; i++) {
        rotations.add(randomRotation(s));
    }
    return rotations;
}

export function getUniformCiphers(s: string) {
    const ciphers = [];
    for (let i = 1; i < 27; i++) {
        ciphers.push(`${caesarCipher(s, i)} | ${i}`);
    }
    return ciphers;
}

export function getCustomCiphers(input: string, rotations: Array<Array<number>>) {
    if (!rotations) return [];
    return rotations.map((rot) => {
        return `${caesarCipher(input, 0, rot)} | [${rot}]`;
    });
}

export function getRandomCiphers(input: string, randomRotations = 250) {
    return [...getUniqueRotations(input, randomRotations)].map((rot) => {
        return `${caesarCipher(input, 0, rot)} | [${rot}]`;
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
    s: string,
    rotations: Array<Array<number>>,
    randomRotations: number
) {
    if (!s) return {};
    const cipherList = [];
    let uniform = makeSectionHeader(s, 'Uniform Rotations');
    let custom = makeSectionHeader(s, 'Custom Rotations', true);
    let unique = makeSectionHeader(s, 'Random Rotations', true);
    const uniformCiphers = getUniformCiphers(s);
    const customCiphers = getCustomCiphers(s, rotations);
    const randomCiphers = getRandomCiphers(s, randomRotations);

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
