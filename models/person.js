const mongoose = require('mongoose')

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