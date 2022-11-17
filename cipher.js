const fs = require('fs')

/**
 * Caesar cipher. Default rotation is 13
 * @param {String} str 
 * @param {Number} rot 
 * @param {String} customRot 
 */
function caesarCipher(str, rot=13, customRot=null, decrypt=false) {
    if (!str) return str
    if (customRot && customRot.length != str.length) {
        return new Error('Custom rotation array must be the same length as the input string')
    }
    if (customRot && customRot.length) {
        let r = ''
        customRot.forEach((rotation, i) => {
            r += rotate(str[i], rotation)
        })
        return r
    }
    return rotate(str, rot, decrypt)
}

function decrypt(str, rot=null) {
    if (!rot) rot = 13
    return caesarCipher(str, rot, null, true)
}

function solve(encoded, guess=null) {
    // if you know the rotation its obv easy to decrypt
    // usually the rotation / shift amount is not known
    // hence the point of the encryption / substitution cipher
    const potential = []
    // 1. try a constant shift (e.g. each character shifted by N chars)
    for (let i=1; i < 27; i++) {
        const rotatedName = decrypt(encoded, i)
        potential.push(rotatedName)
    }
    // 2. Try random shifts for N guesses


    // check for guess
    if (potential.includes(guess)) {
        console.log('here', )
    }
    console.log(potential);
    
}

// rotating only between lowercase english alphabet a-zA-Z atm
/**
 * Transform a string by a given rotation amount
 * @param {String} str input string (full string undergoing rotation)
 * @param {Number} rot rotation amount - e.g. the number of characters to rotate a given char [0, 26]
 * @returns {String} rotated string
 * 
 * O(n) time and O(1) space
 */
function rotate(str, rot, decrypt=false, ascii=false) {
    let cipher = ''
    for (let i=0; i < str.length; i++) {
        if (str[i] === ' ') {
            cipher += str[i]
            continue
        }

        const charCode = str.charCodeAt(i)
        let shift = !decrypt ? charCode + rot : charCode - rot

        if (str[i] === str[i].toLowerCase()) {
            if (shift < 97) shift = 123 - (97-shift)
            if (shift > 122) shift = 96 + (shift-122)
        } else {
            if (shift < 65) shift = 90 - (65-shift)
            if (shift > 90) shift = 64 + (shift-90)
        }

        cipher += String.fromCharCode(shift)
    }
    return cipher
}

function asciiTable() {
    const asciiArr = [];
    // do 0-127 for decimal ASCII codes
    for (let i=0; i < 128; i++) {
        asciiArr.push(String.fromCharCode(i))
    }
    console.log(asciiArr)
}

function rand(min, max) {
    max = Math.ceil(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

const out = writeCipher('tanner', './rotations.txt', 10)
console.log(out)

// const el = caesarCipher('tanner', 17)
// const el = caesarCipher('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', 23)
// console.log(el)
console.log(caesarCipher('tanner'))
console.log(caesarCipher('tanner', 17))
console.log(decrypt('kreevi', 17))
// console.log(solve('kreevi', 'tanner'))
// gnaare
