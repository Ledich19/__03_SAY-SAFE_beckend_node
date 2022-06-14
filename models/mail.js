const mongoose = require('mongoose')

const mailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ownerName: String,
  recipient: String,
  ownerWisible: Boolean,
  recipientWisible: Boolean,
  ownerPhotoMin: String,
  text: String,
  data: Date,
  type: String,
  isReaded: Boolean,
})

mailSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Mail', mailSchema)