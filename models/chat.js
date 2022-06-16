const mongoose = require('mongoose')

const chatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  personal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Personal'
  },
  newFoUser: Number,
  newFoPersonal: Number,
  massages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Personal'
  }],
})

chatsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Chat = mongoose.model('Chat', chatsSchema)

module.exports = Chat