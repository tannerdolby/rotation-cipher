const fs = require('fs')

/**
 * Caesar cipher. Default rotation is 13
 * @param {String} str 
 * @param {Number} rot 
 * @param {String} customRot 
 */
function caesarCipher(str, rot=13, customRot) {
    if (!str) return str
    if (customRot && customRot.length != str.length) {
        return new Error('Custom rotation array must be the same length as the input string')
    }
    if (customRot) {
        let r = ''
        customRot.forEach((rotation, i) => {
            r += rotate(str[i], rotation)
        })
        return r
    }
    return rotate(str, rot)
}

// rotating only between lowercase english alphabet a-z atm
/**
 * Rotate a string by a given rotation amount
 * @param {String} str input string (full string undergoing rotation)
 * @param {Number} rot rotation amount - e.g. the number of characters to rotate a given char [0, 26]
 * @returns {String} rotated string
 * 
 * O(n) time and O(n) space
 */
function rotate(str, rot) {
    let cipher = ''
    for (const idx in str) {
        if (str[idx] === ' ') {
            cipher += ' '
            continue
        }
        let rotation = str.charCodeAt(idx) + rot
        rotation = tumble(rotation, str[idx] === str[idx].toLowerCase())
        cipher += String.fromCharCode(rotation)
    }
    return cipher
}

/**
 * Make sure the rotation amount is within the 97-122 (a-z) character code range (Recursive)
 * 
 * @param {Number} rot rotation amount - e.g. the number of characters to rotate a given char [0, 26]
 * @returns {Number} the rotation amount after its been processed (tumbled)
 * 
 * O(1) time and O(n) space
 */
function tumble(rot, lower=true) {
    if ((lower && (rot > 96 && rot < 123))) return rot
    if ((!lower && (rot > 64 && rot < 91))) return rot
    if (lower) {
        rot = rot % 122
        if (rot < 97) rot += 96
    } else {
        rot = rot % 90
        if (rot < 65) rot += 64
    }
    return tumble(rot, lower)
}

/**
 * Random number between the inclusive range [min, max]
 * @param {Number} min
 * @param {Number} max
 */
function rand(min, max) {
    max = Math.ceil(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Return a random rotation array of length `str`
 * @param {String} str input string
 * @returns {Array} rotation array
 */
function randomRotation(str) {
    if (!str) return []
    return Array.from(str).map(_ => rand(1, 26))
}

function addSpace(spaces) {
    let s = ''
    for (let i=0; i < spaces; i++) {
        s += ' '
    }
    return s
}

function uniqueRotate(str, n) {
    const uniqueRotations = new Set()
    for (let i=0; i < n; i++) {
        uniqueRotations.add(randomRotation(str))
    }
    return uniqueRotations
}

function makeSectionHeader(str, header) {
    return `---------- ${header} ----------
input: ${str}
name${addSpace(str.length - 'name'.length)} | rotation
---------------------------------------\n`
}

const s = caesarCipher('tanner', null, [3, 5, 1, 2, 7, 8])
// t  a  n  n  e  r
// 3  5  1  2  7  8
// w  f  o  p  l  z
console.log(s)


// Rules
// ---------
// For a uniform rotation on each letter of a string
// there can only be 26 different rotated strings
// because the rotation will be from [1..26] characters
//
// Custom rotations
// -------------------
// c          a         t
// [1..26]    [1..26]      [1..26]

// O(N x N) time 
// N characters will mean N branches
// each branch can represent a range of 25 characters
// e.g. every other letter in the alphabet

// branch 1
// c [b,c,...z]^a t
// c b t
// c c t
// ...
// c z t

// branch 2
// c a [a,b,c,...z]^t
// c a a
// c a b
// ...
// c a z

// branch 3
// [a,b,c,...z]^c a t
// a a t
// b a t
// ...
// z a t

function writeCipher(str, filePath, n=13) {
    const uniqueRotations = uniqueRotate(str, n)
    let names = makeSectionHeader(str, 'Uniform Rotations');
    let unique = makeSectionHeader(str, 'Random Rotations')

    // Uniform rotation
    for (let i=1; i < 27; i++) {
        const rotatedName = caesarCipher(str, i)
        names += `${rotatedName} | ${i}\n`
    }

    // k * n^[1-26] time where n is the length of the input string and k is the size of `uniqueRotations`
    uniqueRotations.forEach(rotArr => {
        unique += `${caesarCipher(str, null, rotArr)} | ${JSON.stringify(rotArr)}\n`
    })

    const output = names + unique

    fs.writeFile(filePath, output, (err) => {
        if (err) console.error(err)
        console.log(`Writing ${filePath}`)
    })

    return output
}

const out = writeCipher('tanner', './rotations.txt', 1000)
// console.log(out)

// n^[1-26] time where n is the length of the input string
// const el = caesarCipher('tanner', 17)
const el = caesarCipher('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', 23)
console.log(el)
// gnaare
