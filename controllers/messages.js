const { userExtractor }= require('../utils/middleware')
const messagesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Dialog = require('../models/dialog')
const Massage = require('../models/massage')
const Message = require('../models/massage')

//post messages to dialog id
messagesRouter.post('/',userExtractor, async (request, response) => {
  const io = request.app.get('socketio')
  const ovner = request.user.id

  const {
    dialogId,
    text,
    atachments,
    type
  } = request.body

  const updateDialog = await Dialog.findById(dialogId)

  const newMassege = new Message ({
    ovner,
    dialog: dialogId,
    text,
    wasRead: false,
    type,
    recipient: updateDialog.personal,
    atachments
  })
  const savedMassage = await  newMassege.save()

  const newDialogInfo =  {
    messages: updateDialog.messages.concat(savedMassage.id),
    lastMessage: text,
  }
  await Dialog.findByIdAndUpdate(dialogId ,newDialogInfo )


  response.json(savedMassage)
  io.emit('SERVER:NEW_MESSAGE', savedMassage)
})

//delete message
messagesRouter.delete('/:id',userExtractor, async (request, response) => {
  const id = request.params.id
  const message = await Message.findById(id)
  const dialog = await Dialog.findById(message.dialog)

  console.log(dialog.id)
  console.log(dialog.messages)

  const removedMessage = await Message.findByIdAndRemove(id)

  const newMessages = dialog.messages.filter( id => id.toString() !== removedMessage.id.toString())

  await Dialog.findByIdAndUpdate(dialog.id ,{ messages: newMessages })

  response.status(204).send('message is removed').end()
})

module.exports = messagesRouter

//set readed ( не сделано )
messagesRouter.put('/read/:id', async (request, response) => {
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