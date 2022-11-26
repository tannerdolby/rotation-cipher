function rand(min, max) {
    max = Math.ceil(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function addSpace(spaces) {
    let s = ''
    for (let i=0; i < spaces; i++) {
        s += ' '
    }
    return s
}

function getAsciiTable() {
    const ascii = {};
    for (let i=33; i < 127; i++) {
        ascii[i] = String.fromCharCode(i)
    }
    return ascii;
}

function getHyphenStr(n) {
    return ''.padEnd(n, '-')
}

function makeSectionHeader(str, header, hideInfo=false) {
    const input = `input: ${str}`
    const nameLine = `name${addSpace(str.length - 'name'.length)} | rotation`
    const info = !hideInfo ? `${input}\n${nameLine}\n${getHyphenStr(39)}\n` : ''
    return `---------- ${header} ----------\n${info}`
}

module.exports = {
    rand,
    addSpace,
    getAsciiTable,
    getHyphenStr,
    makeSectionHeader,
}
