const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://say-safe:${password}@cluster0.9g99w.mongodb.net/clients?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  photo: String,
  raiting: Number,
  gender: String,
  follow: Boolean,
  isOnline: Boolean,
  chats: []
})
const Person = mongoose.model('Person', personSchema)

mongoose
.connect(url)
.then((result) => {
  console.log('connected')
  
      const person = new Person({
          name: 'Питер',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeC2xXnLuuRkW9jPbfuZiAJtp74H3danF4Hw&usqp=CAU',
          raiting: 3,
          id: '574',
          gender: 'man',
      follow: true,
      isOnline: true,
      chat: []
    })

    return person.save()
  })
  .then(() => {
      console.log('person saved!')
      return mongoose.connection.close()
    })
  .catch((err) => console.log(err))

  
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })