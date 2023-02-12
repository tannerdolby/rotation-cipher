export declare function randomRotation(s: string, useAscii?: boolean): Array<number>;
export declare function getUniqueRotations(s: string, n: number, useAscii?: boolean): Set<number[]>;
export declare function getUniformCiphers(s: string, useAscii?: boolean): string[];
export declare function getCustomCiphers(input: string, useAscii: boolean | undefined, rotations: Array<Array<number>>): string[];
export declare function getRandomCiphers(input: string, useAscii?: boolean, randomRotations?: number): string[];
export declare function getRepeatedChars(ch: string, n: number): string;
export declare function getAlphabet(lowercase?: boolean): Array<string>;
export declare function getAsciiTable(): Array<string>;
export declare function getHumanReadableAscii(): Array<string>;
export declare function getAsciiWithoutLetters(): Array<string>;
export declare function rand(min: number, max: number): number;
export declare function findChar(ch: string, chars: Array<string>): number;
export declare function makeSectionHeader(s: string, header: string, hideInfo?: boolean): string;
export declare function getCiphers(input: string, rotations: Array<Array<number>>, useAscii: boolean, randomRotations: number): {
    ciphers?: undefined;
    cipherString?: undefined;
    createdAt?: undefined;
} | {
    ciphers: string[];
    cipherString: string;
    createdAt: string;
};
