const { writeCiphers } = require('../index')
const fs = require('fs/promises')

describe('tests for writing ciphers to output file', () => {
    beforeEach(() => {
        this.testFolder = './test-ciphers'
        this.testFile = 'test.txt'
    })

    test.only('write cipher to file', async () => {
        const output = await writeCiphers({
            input: 'tanner',
            folder: this.testFolder,
            filename: this.testFile,
            customRotations: [
                [15, 2, 8, 19, 12, 21],
                [3, 13, 11, 17, 10, 25],
            ],
            useAscii: false,
            randomRotations: 250,
        })

        const path = `${this.testFolder}/${this.testFile.slice(0, -4)}-${output.createdAt}.txt`
        const fileContent = await fs.readFile(path)
        
        expect(output.fileContent).toBe(fileContent.toString())
        expect(output.filePath).toBe(path)

        // delete the test folder
        await fs.rm(this.testFolder, { recursive: true })
    })
})