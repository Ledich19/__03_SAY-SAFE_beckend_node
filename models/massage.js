const mongoose = require('mongoose')

const massagesSchema = new mongoose.Schema({
  ovner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  dialog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dialog',
    require: true,
  },
  text:{
    type: String,
    require: true,
  },
  wasRead: {
    type: Boolean,
    default: false
  },
  type: String,
  atachments: []
},{
  timestamps: true
})

massagesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Message = mongoose.model('Message', massagesSchema)

module.exports = Message