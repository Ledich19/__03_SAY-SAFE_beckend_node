const chatsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Personal = require('../models/personal')
const Chat = require('../models/chat')

const Mail = require('../models/mail')
const Massage = require('../models/massage')
//get Chat

//add mail
chatsRouter.post('/:id', async (request, response) => {
  console.log('\x1b[42m fffffffffffffffff \x1b[0m')

  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const {
    text,
    chatId,
    recipient
  } = request.body
  console.log('\x1b[42m chatId', chatId, '\x1b[0m')
  console.log('\x1b[42mchatId', chatId, '\x1b[0m')
  const id = request.params.id

  if (!chatId) {
    const chat = new Chat({
      user: decodedToken.id,
      personal: id,
      massages: [],
    })
    const savedChat = await chat.save()

    const ownerUser = await User.findById(decodedToken.id)
    ownerUser.chats = ownerUser.chats.concat(savedChat._id)
    await ownerUser.save()

    const recipientUser = await Personal.findById(id)
    recipientUser.chats = recipientUser.chats.concat(savedChat._id)
    await recipientUser.save()

    const newChat = await Chat.findById(savedChat._id)

    const newMassege = new Massage({
      ovner: decodedToken.id,
      chat: newChat._id,
      text: text,
      data: new Date(),
      isReaded: false,
    })
    const savedMassage = await newMassege.save()

    newChat.massages = newChat.massages.concat(savedMassage._id)
    await newChat.save()

    return response.json(savedMassage)
  } else {
    console.log('\x1b[42m satrt \x1b[0m')

    const chat = await Chat.findById(chatId)

    const newMassege = new Massage({
      ovner: decodedToken.id,
      recipient: id,
      chat: chat._id,
      text: text,
      data: new Date(),
      isReaded: false,
    })
    const savedMassage = await newMassege.save()
    console.log('\x1b[42m savedMassage', savedMassage, '\x1b[0m')
    chat.massages = chat.massages.concat(savedMassage._id)
    await chat.save()

    return response.json(savedMassage)
  }

})

//set readed
chatsRouter.put('/read/:id', async (request, response) => {
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const id = request.params.id
  const massage = Massage.findById(id)
  const newMsssage = {
    isReaded: true
  }
  if (massage.recipient !== decodedToken.id) {
    return response.status(401).json({
      error: 'wrong user'
    })
  }
  const massageReadeded = await Massage.findByIdAndUpdate(id, newMsssage, {
    new: true
  })
  response.json(massageReadeded)
})

module.exports = chatsRouter