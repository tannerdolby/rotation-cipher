# Rotation Cipher 🗝️

A lightweight utility for performing caesar ciphers. This classic cipher shifts characters in a given string by a specified amount to provide a small layer of encryption.

This package is capable of creating ciphers containing characters in the english alphabet (a-zA-Z) and human-readable ASCII characters (decimal value [33-126]).

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
const { caesarCipher } = require('rotation-cipher');

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
console.log(caesarCipher('tanner', 17, null, true));
// @Xee\>
```

### Custom rotation array

Rotate each character by a specific rotation:

```js
console.log(caesarCipher('tanner', null, [3, 5, 1, 2, 7, 8]));
// wfoplz
```

### Random rotation

Rotate each character by a random rotation:

```js
console.log(caesarCipher('tanner', null, randomRotation(input)));
// jiwogv
```

### Store ciphers

Write generated ciphers to an output file. Each file will have a timestamp included after the filename to ensure all records can be maintained.

To avoid making `fs` a required dependency, I dropped `writeCiphers` from this package. It can be found as a [GitHub gist](https://gist.github.com/tannerdolby/ffb9c8fc7992a8b2cff1d2a6dca524c3) for users to reference.

## Resources

-   https://en.wikipedia.org/wiki/Caesar_cipher
