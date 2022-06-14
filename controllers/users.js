const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('members',{ username: 1, photo: 1, rating: 1 })
  response.json(users)
})
//new user
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
  console.log('2222',username.length, password)
  if (!username || username.length < 3 ) {
    return response.status(400).json({
      error: 'username must be 3 or more'
    })
  }
  if (!password || password.length < 6) {
    return response.status(400).json({
      error: 'password must be 6 or more'
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
//delete user
usersRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await User.findByIdAndRemove(decodedToken.id)
  response.status(204).end()
})


//follof to personal
usersRouter.put('/follov/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
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
//unfollof to personal
usersRouter.put('/unfollov/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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