const { join } = require('path')
const { createReadStream, createWriteStream } = require('fs')

const read = createReadStream(join(__dirname, 'source.txt'))

read.on('error', console.error.bind(console))

const write = createWriteStream(join(__dirname, 'target.txt'))

write.on('error', console.error.bind(console))

write.on('finish', () => console.log('success!'))

read.pipe(write)

console.log('done!')
