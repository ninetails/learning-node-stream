const { PassThrough, Readable } = require('stream')

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
const text2 = new TextStream('bar')

const concat = (...streams) =>
  streams.reduce(
    (pt, stream, index, all) => {
      stream.pipe(pt, { end: false })
      stream.once('end', () => all.every(stream => stream.ended) && pt.emit('end'))
      return pt
    },
    new PassThrough()
  )

concat(text1, text2).pipe(process.stdout)
