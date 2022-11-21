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

// do 33-127 for decimal ASCII codes
function getAsciiTable() {
    const ascii = {};
    for (let i=33; i < 127; i++) {
        ascii[i] = String.fromCharCode(i);
    }
    return ascii;
}

function makeSectionHeader(str, header) {
    return `---------- ${header} ----------
input: ${str}
name${addSpace(str.length - 'name'.length)} | rotation
---------------------------------------\n`
}

module.exports = {
    rand,
    addSpace,
    getAsciiTable,
    makeSectionHeader
}
