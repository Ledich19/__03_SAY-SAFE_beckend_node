const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  lastName: String,
  passwordHash: String,
  age: Number,
  passworld: String,
  Country: String,
  city: String,
  education: String,
  gender: String,
  aboutMe: String,
  myFavoriteThem: String,
  Photos: [],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Personal'
  }],
  mails: [],
  chats: [],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User