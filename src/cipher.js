const fs = require('fs/promises')
const { rand, makeSectionHeader } = require('./lib/utility')

function caesarCipher(str, rot=13, customRot=[], useAscii=false, decrypt=false) {
    if (!str) return str

    if (customRot && customRot.length > 0 && customRot.length != str.length) {
        return new Error('Custom rotation array must be the same length as the input string')
    }

    if (customRot.length) {
        let res = ''
        customRot.forEach((rotation, i) => {
            res += rotate(str[i], rotation, useAscii, decrypt)
        })
        return res
    }

    return rotate(str, rot, useAscii, decrypt)
}

function decrypt(str, rot=13, customRot, useAscii=false) {
    return caesarCipher(str, rot, customRot, useAscii, true)
}

/**
 * Transform a string by a given rotation amount
 * @param {String} str input string (full string undergoing rotation)
 * @param {Number} rot rotation amount - e.g. the number of characters to rotate a given char [0, 26]
 * @returns {String} rotated string
 *
 */
function rotate(str, rot, useAscii=false, decrypt=false) {
    let cipher = ''
    for (let i=0; i < str.length; i++) {
        if (str[i] === ' ') {
            cipher += str[i]
            continue
        }

        const charCode = str.charCodeAt(i)
        let shift = !decrypt ? charCode + rot : charCode - rot

        // TODO: cleanup with modular arithmetic
        if (useAscii) {
            if (shift < 33) {
                shift = 127 - (33 - shift)
            }
            if (shift > 127) {
                shift = 33 + (shift - 127)
            }
        }

        if (!useAscii && str[i] === str[i].toLowerCase()) {
            if (shift < 97) shift = 123 - (97 - shift)
            if (shift > 122) shift = 96 + (shift - 122)
        } else {
            if (shift < 65) shift = 90 - (65 - shift)
            if (shift > 90) shift = 64 + (shift - 90)
        }

        cipher += String.fromCharCode(shift)
    }
    return cipher
}

function randomRotation(str) {
    if (!str) return []
    return Array.from(str).map(_ => rand(1, 26))
}

function getUniqueRotations(str, n) {
    const uniqueRotations = new Set()
    for (let i = 0; i < n; i++) {
        uniqueRotations.add(randomRotation(str))
    }
    return uniqueRotations
}

function solve(encoded, guess = null) {
    // if you know the rotation its obv easy to decrypt
    // usually the rotation / shift amount is not known
    // hence the point of the encryption / substitution cipher
    const potential = []
    // 1. try a constant shift (e.g. each character shifted by N chars)
    for (let i = 1; i < 27; i++) {
        const rotatedName = decrypt(encoded, i)
        potential.push(rotatedName)
    }
    // 2. Try random shifts for N guesses


    // check for guess
    if (potential.includes(guess)) {
        console.log('here')
    }
    console.log(potential)

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

function writeCipher(cipherObj) {
    if (!cipherObj) return
    const {input, folder, filename, customRotations, useAscii, randomRotations} = cipherObj;
    let names = makeSectionHeader(input, 'Uniform Rotations')
    let custom = makeSectionHeader(input, 'Custom Rotations', true)
    let unique = makeSectionHeader(input, 'Random Rotations', true)

    // Uniform rotation
    for (let i = 1; i < 27; i++) {
        names += `${caesarCipher(input, i)} | ${i}\n`
    }

    // Custom rotations
    custom += getCustomCiphers(input, useAscii, customRotations).join('\n')

    // Random unique rotations
    // k * n^[1-26] time where n is the length of the input string and k is the size of `uniqueRotations`
    unique += getRandomCiphers(input, useAscii, randomRotations).join('\n')

    const data = `${names}${custom}\n${unique}`
    const dateString = new Date().toISOString()
    const fileExt = filename.match(/\.\w+$/gm)
    const name = filename.slice(0, -1 * fileExt[0].length)
    const pathToWrite = `${folder}/${name}-${dateString}${fileExt[0]}`

    createDir(folder)
    writeFile(pathToWrite, data)

    return data
}

function getCustomCiphers(input, useAscii=false, customRotations) {
    if (!customRotations) return []
    const res = []
    customRotations.forEach(rotArr => {
        res.push(`${caesarCipher(input, null, rotArr, useAscii || false)} | [${rotArr}]`)
    })
    return res
}

function getRandomCiphers(input, useAscii=false, randomRotations=250) {
    const res = []
    const uniqueRotations = getUniqueRotations(input, randomRotations)
    uniqueRotations.forEach(rotArr => {
        res.push(`${caesarCipher(input, null, rotArr, useAscii)} | [${rotArr}]`)
    })
    return res
}

async function createDir(folder, opts) {
    if (!opts) opts = { recursive: true }
    try {
        await fs.mkdir(folder, opts)
    } catch (err) {
        console.error(`Unable to create directory: ${err}`)
    }
}

async function writeFile(path, data) {
    try {
        await fs.writeFile(path, data)
    } catch (err) {
        console.error(`Unable to write file: ${err}`)
    }
}

const out = writeCipher({
    input: 'tanner',
    folder: './ciphers',
    filename: 'phase-one.txt',
    customRotations: [
        [15, 2, 8, 19, 12, 21],
        [3, 13, 11, 17, 10, 25],
    ],
    useAscii: false,
    randomRotations: 250
})
// console.log(out)

// const el = caesarCipher('tanner', 17)
// const el = caesarCipher('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', 23)
// console.log(el)

console.log(caesarCipher('tanner'))
// gnaare
console.log(caesarCipher('tanner', 17))
// kreevi
console.log(decrypt('kreevi', 17))
// tanner
console.log(decrypt('gnaare', 13))
// tanner
// console.log(solve('kreevi', 'tanner'))
