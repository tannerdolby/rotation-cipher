import * as util from './lib/utility';
export { util };
export { randomRotation, getUniqueRotations, getUniformCiphers, getCustomCiphers, getRandomCiphers, getRepeatedChars, getAlphabet, getAsciiTable, getHumanReadableAscii, getAsciiWithoutLetters, getCiphers, } from './lib/utility';
export declare function caesarCipher(s: string, rot?: number, rotations?: Array<number>, decrypt?: boolean): string;
