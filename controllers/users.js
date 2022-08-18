const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {
  userExtractor
} = require('../utils/middleware')
const nodemailer = require('nodemailer')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  // .populate('members', {
  //   username: 1,
  //   avatar: 1,
  //   rating: 1
  // })
  response.json(users)
})

// get my info
usersRouter.get('/me', userExtractor, async (request, response) => {

  const userId = request.user.id
  const user = await User.findById(userId)
  response.json(user)
})

//verify new user
usersRouter.get('/verify', async (request, response) => {
  const hash = request.query.hash
  const decodedToken = await jwt.verify(hash, process.env.SECRET)
  const {
    username,
    email,
    passwordHash
  } = decodedToken
  const user = new User({
    username,
    email,
    passwordHash
  })

  console.log('\x1b[33m user', user, '\x1b[0m')
  const savedUser = await user.save()
  response.status(200).json(savedUser)

})

// get user by id
usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User.findById(id)
  const userResponse = {
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    lastSeen: user.lastSeen,
    name: user.name,
    lastName: user.lastName,
    age: user.age,
    Country: user.Country,
    city: user.city,
    education: user.education,
    gender: user.gender,
    aboutMe: user.aboutMe,
    myFavoriteThem: user.myFavoriteThem,
    Photos: user.Photos,
  }
  response.json(userResponse)
})

//new user
usersRouter.post('/registration', async (request, response) => {
  console.log('1111')

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
  if (!username || username.length < 3) {
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

  const token = jwt.sign({
    username,
    email,
    passwordHash
  },
  process.env.SECRET, {
    expiresIn: '1d'
  }
  )

  const hesh =  `${request.protocol}://${request.get('host')}/verify?hash=${token}`
  console.log('hesh', hesh)

  let transporter = await nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'SaySafeApp@outlook.com', // generated ethereal user
      pass: '190289ale' // generated ethereal password
    },
    tls: {
      ciphers:'SSLv3'
    }
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Alexander Chumachenko" <SaySafeApp@outlook.com>', // sender address
    to: 'ledich19@gmail.com', // list of receivers
    subject: 'hesh', // Subject line
    text: hesh, // plain text body
  })

  //console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  response.status(200).send('check uour email')
})


//delete user
usersRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  await User.findByIdAndRemove(decodedToken.id)
  response.status(204).end()
})


//follof to personal
usersRouter.put('/follow/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  const id = request.params.id

  const isId = user.members.includes(id)
  console.log('\x1b[42misId', isId, '\x1b[0m')
  if (!isId) {
    const userMembers = user.members.concat(id)
    const newUser = {
      members: userMembers
    }
    const updatedUser = await User.findByIdAndUpdate(user.id, newUser, {
      new: true
    })
    response.json(updatedUser.members[updatedUser.members.length - 1])

  } else {
    console.log('\x1b[42m remuve', '', '\x1b[0m')

    const userMembers = user.members.filter(member => {
      return member.toString() !== id
    })
    const newUser = {
      members: userMembers
    }
    const updatedUser = await User.findByIdAndUpdate(user.id, newUser, {
      new: true
    })
    response.json(id)

  }



})
//unfollof to personal
usersRouter.put('/unfollow/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const id = request.params.id

})

module.exports = usersRouter