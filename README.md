# Caesar Cipher 🗝️
A lightweight utility for performing Ceasar Ciphers. The cipher shifts characters in a given string by a specified amount to provide a small layer of encryption. Supports shifting in english alphabet (a-zA-Z) and the human-readable ASCII characters between decimal value [33-126].

Default rotation is 13 (ROT13). A custom array of rotations matching the length of the input string can also be provided to create more customized transformations. Random rotations can be generated.

Use cases:
- perform a basic substitution cipher
- perform a randomized subsitution cipher
- generate a cool username / handle

## Example Usage

### Basic Cipher
Rotate each character by the default 13 characters:
```js
const s = caesarCipher('tanner')
console.log(s)
// gnaare
```

### User defined uniform rotation
Rotate each character by a uniform rotation:
```js
const s = caesarCipher('tanner', 17)
console.log(s)
// kreevi
```

### Custom rotation array
Rotate each character by a specific rotation:
```js
const s = caesarCipher('tanner', null, [3, 5, 1, 2, 7, 8])
console.log(s)
// wfoplz
```

### Store ciphers
Write the ciphers to an output file.

```js
const out = writeCipher({
    input: 'tanner',
    folder: './shh',
    filename: 'ciphers.txt',
    customRotations: [
        [15, 2, 8, 19, 12, 21],
        [3, 13, 11, 17, 10, 25],
    ],
    useAscii: false,
    randomRotations: 250
})
console.log(out)
/* 
---------- Uniform Rotations ----------
input: tanner
name   | rotation
---------------------------------------
uboofs | 1
vcppgt | 2
wdqqhu | 3
xerriv | 4
...
qxkkbo | 23
ryllcp | 24
szmmdq | 25
tanner | 26
---------- Custom Rotations ----------
icvgqm | [15,2,8,19,12,21]
wnyeoq | [3,13,11,17,10,25]
---------- Random Rotations ----------
rvbaps | [24,21,14,13,11,1]
rzqnmf | [24,25,3,26,8,14]
ykafnb | [5,10,13,18,9,10]
tdxvck | [26,3,10,8,24,19]
...
*/
```

Each file will have a timestamp included after the filename to ensure all records can be maintained. To find your next cool username, scroll through the output file.

### Resources
- https://en.wikipedia.org/wiki/Caesar_cipher