const mongoose = require('mongoose')

const dialogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  personal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Personal'
  },
  lastMessage: {
    type: String,
  },
  text: String,
  newFoUser: Number,
  newFoPersonal: Number,
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Massage'
  }],
},{
  timestamps: true
})

dialogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Dialog = mongoose.model('Dialog', dialogSchema)

module.exports = Dialog