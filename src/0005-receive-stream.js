const { Readable, Transform } = require('stream')

const createTextStream = text => new Readable({
  read () {
    this.push(text)
    this.push(null)
  }
})

const outside = new Transform({
  transform (chunk, encoding, callback) {
    this.push(`before ${chunk.toString()} after`)
    return callback()
  }
})

createTextStream('foo').pipe(outside).pipe(process.stdout)
