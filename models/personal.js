const mongoose = require('mongoose')

const personalSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  rating: Number,
  email: String,
  name: String,
  lastName: String,
  passwordHash: String,
  age: Number,
  Country: String,
  city: String,
  education: String,
  gender: String,
  aboutMe: String,
  thems: String,
  photos: [],
  favoriteMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  mails: [],
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  dialogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dialog'
    }
  ],
  raiting: [],
  isOnline: Boolean,
  follovers: [],
})

personalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString()

    }

    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Personal = mongoose.model('Personal', personalSchema)

module.exports = Personal