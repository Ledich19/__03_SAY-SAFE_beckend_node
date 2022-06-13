const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('members',{ username: 1, photo: 1, rating: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {
    username,
    email,
    password
  } = request.body
  const existingUser = await User.findOne({
    username
  })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    email,
    passwordHash
  })
  console.log('\x1b[33m user', user ,'\x1b[0m')
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

usersRouter.put('/follov/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const id = request.params.id
  const userMembers = user.members.concat(id)
  const newUser = {
    members: userMembers
  }
  const updatedUser =  await User.findByIdAndUpdate(user.id, newUser, { new: true })
  response.json(updatedUser)
})

usersRouter.put('/unfollov/:id', async (request, response) => {
  const user = await User.findById(request.body.userId)
  const id = request.params.id
  const userMembers = user.members.filter(member => {
    return member.toString() !== id})
  const newUser = {
    members: userMembers
  }
  const updatedUser =  await User.findByIdAndUpdate(user.id, newUser, { new: true })
  response.json(updatedUser)
})

module.exports = usersRouter