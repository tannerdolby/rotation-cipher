# Caesar Cipher 🗝️
JavaScript utility for a ceasar cipher. Default rotation is 13 and can be modified. A custom array of rotations matching the length of the input string can be provided to create more custom transformations.

Use cases:
- perform a basic substitution cipher
- perform a randomized subsitution cipher
- generate a cool username / handle

## Example Usage

### Basic Cipher
Rotate each character by the default 13 characters:
```js
const s = ceasarCipher('tanner')
console.log(s)
// gnaare
```

### User defined uniform rotation
Rotate each character by 17 characters:
```js
const s = ceasarCipher('tanner', 17)
console.log(s)
// kreevi
```

### Custom rotation array
Rotate each letter by a specific rotation:
```js
const s = caesarCipher('tanner', null, [3, 5, 1, 2, 7, 8])
console.log(s)
// wfoplz
```

### Write ciphers to output file

```js
const out = writeCipher('tanner', './rotations.txt', 1000)
console.log(out)
// ---------- Uniform Rotations ----------
// input: tanner
// name   | rotation
// ---------------------------------------
// uboofs | 1
// vcppgt | 2
// wdqqhu | 3
// ...
// ryllcp | 24
// szmmdq | 25
// tanner | 26
// ---------- Random Rotations ----------
// input: tanner
// name   | rotation
// ---------------------------------------
// pjgyub | [22,9,19,11,16,10]
// omilau | [21,12,21,24,22,3]
// umjlfy | [1,12,22,24,1,7]
// ...
```

Note: Scroll through the output file and checkout the random rotations for a chance of finding a really cool username / social share handle.

### Resources
- https://en.wikipedia.org/wiki/Caesar_cipher