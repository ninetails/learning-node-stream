const { join } = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { Transform } = require('stream')

class PrependText extends Transform {
  _transform (chunk, encoding, done) {
    let data = chunk.toString()

    if (!this._lastData) {
      this.push('prepended text\n')
    }
    this._lastData = true

    this.push(data)
    done()
  }
}

const read = createReadStream(join(__dirname, 'source.txt'))

read.on('error', console.error.bind(console))

const write = createWriteStream(join(__dirname, 'target.txt'))

write.on('error', console.error.bind(console))

write.on('finish', () => console.log('success!'))

read.pipe(new PrependText()).pipe(write)

console.log('done!')
