const { Readable } = require('stream')

class TextStream extends Readable {
  constructor (data, opts) {
    super(opts)

    this.push(`${data}\n`)
  }

  _read () {
    return undefined
  }
}

const text1 = new TextStream('foo')

text1.pipe(process.stdout)
