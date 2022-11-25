const fs = require('fs/promises')
const { rand, makeSectionHeader } = require('./lib/utility')

function caesarCipher(str, rot=13, customRot=null, useAscii=false, decrypt=false) {
    if (!str) return ''

    if (typeof str != 'string') {
        throw new Error(`Input must be type 'string'`)
    }

    if (customRot && customRot.length > 0 && customRot.length != str.length) {
        throw new Error('Custom rotation array must be the same length as the input string')
    }

    if (customRot) {
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
            if (shift < 33) shift = 127 - (33 - shift)
            if (shift > 127) shift = 33 + (shift - 127)
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

function writeCiphers(cipherObj) {
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
    const dateString = cipherObj.date || new Date().toISOString()
    const fileExt = filename.match(/\.\w+$/gm)
    const name = filename.slice(0, -1 * fileExt[0].length)
    const pathToWrite = `${folder}/${name}-${dateString}${fileExt[0]}`

    createDir(folder)
    writeFile(pathToWrite, data)

    return {data: data, createdAt: dateString, filePath: pathToWrite}
}

function getCustomCiphers(input, useAscii=false, customRotations) {
    if (!customRotations) return []
    const res = []
    customRotations.forEach(rotArr => {
        res.push(`${caesarCipher(input, null, rotArr, useAscii)} | [${rotArr}]`)
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

module.exports = {
    caesarCipher,
    decrypt,
    writeCiphers,
}
