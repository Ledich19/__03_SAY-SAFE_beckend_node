const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
    console.log('\x1b[42m connected to MongoDB\x1b[0m')
  })
  .catch((error) => {
    console.log('\x1b[41m error connecting to MongoDB:\x1b[0m', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: String,
    photo: String,
    raiting: Number,
    gender: String,
    follow: Boolean,
    isOnline: Boolean,
    chat: []
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)
