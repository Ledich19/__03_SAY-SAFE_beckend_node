const mailRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Personal = require('../models/personal')

const Mail = require('../models/mail')

// mailRouter.get('/', async (request, response) => {
//   const persons = await Person.find({})
//   response.json(persons)
// })

// mailRouter.get('/:id', async (request, response) => {
//   const person = await Person.findById(request.params.id)
//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

//add mail
mailRouter.post('/', async (request, response) => {
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const { recipient ,ownerPhotoMin, text, type } = request.body

  const mail = new Mail({
    user: decodedToken.id,
    ownername: decodedToken.username,
    recipient,
    ownerPhotoMin,
    text,
    data:  new Date(),
    type,
    isReaded: false
  })
  const savedMail = await mail.save()

  const userId = decodedToken.id
  console.log(' \x1b[44m userId' , userId, '\x1b[0m')

  const ownerUser = await User.findById( userId )
  ownerUser.mails = ownerUser.mails.concat(savedMail._id)
  await ownerUser.save()

  const recipienId = recipient
  console.log(' \x1b[44m recipienId' , recipienId, '\x1b[0m')

  const recipientUser = await Personal.findById( recipienId )
  recipientUser.mails = recipientUser.mails.concat(savedMail._id)
  await recipientUser.save()

  response.json(savedMail)
})

//delete mail
mailRouter.delete('/:id', async (request, response) => {
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const newMail = {
    ownerWisible: false
  }

  const id = request.params.id
  const mailDeleted = await Mail.findByIdAndUpdate(id, newMail , { new: true })

  if (!mailDeleted.ownerWisible && !mailDeleted.recipientWisible) {
    await Mail.findByIdAndRemove(mailDeleted._id)
  }

  const userId = decodedToken.id
  const ownerUser = await User.findById( userId )
  ownerUser.mails = ownerUser.mails.filter(m => m.toString() !== id)
  await ownerUser.save()

  response.status(204).end()
})

//set readed
mailRouter.put('/read/:id', async (request, response) => {
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const id = request.params.id
  const mail = Mail.findById(id)
  const newMail = { isReaded: true }
  if (mail.recipient !== decodedToken.id) {
    return response.status(401).json({ error: 'wrong user' })
  }
  const mailReadeded = await Mail.findByIdAndUpdate(id, newMail , { new: true })
  response.json(mailReadeded)
})

module.exports = mailRouter