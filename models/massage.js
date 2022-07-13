const mongoose = require('mongoose')

const massagesSchema = new mongoose.Schema({
  ovner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dialog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dialog'
  },
  text: String,
  createAt: Date,
  isReaded: Boolean,
  type: String,
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

const Massage = mongoose.model('Massage', massagesSchema)

module.exports = Massage