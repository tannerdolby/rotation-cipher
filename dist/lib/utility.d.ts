export declare function randomRotation(s: string, min?: number, max?: number): Array<number>;
export declare function getUniqueRotations(s: string, n: number): Set<number[]>;
export declare function getUniformCiphers(s: string): string[];
export declare function getCustomCiphers(input: string, rotations: Array<Array<number>>): string[];
export declare function getRandomCiphers(input: string, randomRotations?: number): string[];
export declare function getRepeatedChars(ch: string, n: number): string;
export declare function getAlphabet(lowercase?: boolean): Array<string>;
export declare function getAsciiTable(): Array<string>;
export declare function getHumanReadableAscii(): Array<string>;
export declare function getAsciiWithoutLetters(): Array<string>;
export declare function rand(min: number, max: number): number;
export declare function findChar(ch: string, chars: Array<string>): number;
export declare function makeSectionHeader(s: string, header: string, hideInfo?: boolean): string;
export declare function getCiphers(s: string, rotations: Array<Array<number>>, randomRotations: number): {
    ciphers?: undefined;
    cipherString?: undefined;
    createdAt?: undefined;
} | {
    ciphers: string[];
    cipherString: string;
    createdAt: string;
};
