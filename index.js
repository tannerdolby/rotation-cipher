const fs = require('fs/promises')
const { rand, makeSectionHeader } = require('./lib/utility')

function caesarCipher(str, rot=13, customRot=null, useAscii=false, decrypt=false) {
    if (!str) return ''

    if (typeof str != 'string') {
        throw new Error(`Input must be type 'string'`)
    }

    const hasCustomRotArr = customRot && customRot.length > 0

    if (hasCustomRotArr && customRot.length != str.length) {
        throw new Error('Custom rotation array must be the same length as the input string')
    }

    if (hasCustomRotArr) {
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

function randomRotation(str, useAscii=false) {
    if (!str) return []
    const min = 1
    const max = useAscii ? 122 : 26
    return Array.from(str).map(_ => rand(min, max))
}

function getUniqueRotations(str, n, useAscii=false) {
    const uniqueRotations = new Set()
    for (let i = 0; i < n; i++) {
        uniqueRotations.add(randomRotation(str, useAscii))
    }
    return uniqueRotations
}

async function writeCiphers(cipherObj) {
    if (!cipherObj) return
    const allCiphers = []
    const {input, folder, filename, customRotations, useAscii, randomRotations} = cipherObj;
    let uniform = makeSectionHeader(input, 'Uniform Rotations')
    let custom = makeSectionHeader(input, 'Custom Rotations', true)
    let unique = makeSectionHeader(input, 'Random Rotations', true)

    // Uniform rotations
    const uniformCiphers = getUniformCiphers(input, useAscii)
    uniform += uniformCiphers.join('\n')

    // Custom rotations
    const customCiphers = getCustomCiphers(input, useAscii, customRotations)
    custom += customCiphers.join('\n')

    // Random unique rotations
    // k * n^[1-26] time where n is the length of the input string and k is the size of `uniqueRotations`
    const randomCiphers = getRandomCiphers(input, useAscii, randomRotations)
    unique += randomCiphers.join('\n')

    const fileContent = `${uniform}\n${custom}\n${unique}`
    const dateString = cipherObj.date || new Date().toISOString()
    const fileExt = filename.match(/\.\w+$/gm)
    const name = filename.slice(0, -1 * fileExt[0].length)
    const pathToWrite = `${folder}/${name}-${dateString}${fileExt[0]}`

    allCiphers.push(...uniformCiphers)
    allCiphers.push(...customCiphers)
    allCiphers.push(...randomCiphers)

    await createDir(folder)
    await writeFile(pathToWrite, fileContent)

    return {
        ciphers: allCiphers,
        fileContent: fileContent,
        createdAt: dateString,
        filePath: pathToWrite,
    }
}

function getUniformCiphers(input, useAscii=false) {
    const res = []
    for (let i = 1; i < 27; i++) {
        res.push(`${caesarCipher(input, i, null, useAscii)} | ${i}`)
    }
    return res
}

function getCustomCiphers(input, useAscii=false, customRotations=[[]]) {
    if (!customRotations) return []
    return customRotations
        .map(rotArr => {
            return `${caesarCipher(input, null, rotArr, useAscii)} | [${rotArr}]`
        })
}

function getRandomCiphers(input, useAscii=false, randomRotations=250) {
    return [...getUniqueRotations(input, randomRotations)]
        .map(rotArr => {
            return `${caesarCipher(input, null, rotArr, useAscii)} | [${rotArr}]`
        })
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
    createDir,
    writeFile,
    rotate,
    getUniformCiphers,
    getCustomCiphers,
    getRandomCiphers,
    getUniqueRotations,
    randomRotation
}
