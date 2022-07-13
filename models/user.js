const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required',
  },
  email: {
    type: String,
    required: 'Email address is required',
    unique: 'Email address mast be uniqued',
  },
  passwordHash: {
    type: String,
    required: 'Password is required',
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  avatar: String,
  confirmedHesh: String,

  lastSeen: Date,

  name: String,
  lastName: String,
  age: Number,
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
  mails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mail'
    }
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ],
}, {
  timestamps: true
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