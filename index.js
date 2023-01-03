const { rand } = require('./lib/utility')

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
    const max = useAscii ? 126 : 26
    return Array.from(str).map(_ => rand(min, max))
}

function getUniqueRotations(str, n, useAscii=false) {
    const uniqueRotations = new Set()
    for (let i = 0; i < n; i++) {
        uniqueRotations.add(randomRotation(str, useAscii))
    }
    return uniqueRotations
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

module.exports = {
    caesarCipher,
    decrypt,
    rotate,
    getUniformCiphers,
    getCustomCiphers,
    getRandomCiphers,
    getUniqueRotations,
    randomRotation
}
