# Rotation Cipher 🗝️

A lightweight utility for performing caesar ciphers. This classic cipher shifts characters in a given string by a specified amount to provide a small layer of encryption.

Capable of creating ciphers containing characters in the english alphabet (a-zA-Z) and human-readable ASCII characters.

Use cases:

-   perform basic, custom, and randomized caesar ciphers
-   generate a cool username / social media handle

## Installation

Install the package from [npm](https://www.npmjs.com/package/rotation-cipher):

```shell
npm install rotation-cipher
```

Create ciphers on the fly:

```js
import { caesarCipher } from 'rotation-cipher';

console.log(caesarCipher('tanner', 21));
// oviizm
```

## Example usage

### Basic Cipher

Rotate each character by the default 13 characters:

```js
console.log(caesarCipher('tanner'));
// gnaare
```

### User defined uniform rotation

Rotate each character by a uniform rotation:

```js
console.log(caesarCipher('tanner', 17));
// kreevi
```

### User defined uniform rotation (with ASCII)

Rotate each character by a uniform rotation including ASCII:

```js
console.log(caesarCipher('t@nn3r!', 15));
// i,cc}g0
```

### Custom rotation array

Rotate each character by a specific rotation:

```js
console.log(caesarCipher('tanner', 0, [3, 5, 1, 2, 7, 8]));
// wfoplz
```

### Random rotation

Rotate each character by a random rotation:

```js
import { caesarCipher, randomRotation } from 'rotation-cipher';

let s = 'tanner';
console.log(caesarCipher(s, 0, randomRotation(s)));
```

## Resources

-   https://en.wikipedia.org/wiki/Caesar_cipher
