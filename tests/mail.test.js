const bcrypt = require('bcrypt')

const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Personal = require('../models/personal')
const Mail = require('../models/mail')
const jwt = require('jsonwebtoken')



beforeEach(async () => {
  await User.deleteMany({})
  await Personal.deleteMany({})
  await Mail.deleteMany({})
  console.log('cleared')
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'root',
    passwordHash
  })
  await user.save()
  const personal = new Personal({
    username: 'root',
    passwordHash
  })
  await personal.save()

})

test('mail can be send', async () => {
  const mailsAtStart = await helper.mailsInDb()
  const users = await User.find({})
  const personals = await Personal.find({})

  const userForToken = {
    username: users[0].username,
    id: users[0].id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  const newMail = {
    user: users[0].id,
    ownerName: 'String',
    recipient: personals[0].id,
    ownerPhotoMin: '',
    text: 'String',
    type: 'String'
  }

  await api
    .post('/api/mails')
    .set('Authorization', `bearer ${token}`)
    .send(newMail)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const mailsAtEnd = await helper.mailsInDb()
  expect(mailsAtEnd).toHaveLength(mailsAtStart.length + 1)

  const mailsText = mailsAtEnd.map(m => m.text)
  expect(mailsText).toContain(newMail.text)


  const usersEnd = await User.find({})
  const personalsEnd = await Personal.find({})

  console.log(' \x1b[44m userId' , mailsAtEnd, '\x1b[0m')

  expect(usersEnd[0].mails[0].toString()).toContain(mailsAtEnd[0].id)
  expect(personalsEnd[0].mails[0].toString()).toContain(mailsAtEnd[0].id)

})


afterAll(() => {
  mongoose.connection.close()
})