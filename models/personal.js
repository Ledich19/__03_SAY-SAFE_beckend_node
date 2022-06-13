const mongoose = require('mongoose')

const personalSchema = new mongoose.Schema({
  username: String,
  photo: String,
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
  chats: [],
  raiting: [],
  isOnline : Boolean,
  follovers:[],
})

personalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log('aaaaaaaaaaaaaaaaaa', returnedObject )
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
    console.log('ooooooooooo', returnedObject )

  }
})

const Personal = mongoose.model('Personal', personalSchema)

module.exports = Personal