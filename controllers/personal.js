
const personalsRouter = require('express').Router()
const Personal= require('../models/personal')

personalsRouter.get('/', async (request, response) => {
  const users = await Personal.find({})
  response.json(users)
})


module.exports = personalsRouter