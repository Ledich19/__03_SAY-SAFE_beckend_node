
const personalsRouter = require('express').Router()
const Personal= require('../models/personal')

personalsRouter.get('/', async (request, response) => {
  const page = request.query.page
  const limit = 9
  const skip = (page - 1) * limit
  console.log('skip' , skip)

  console.log(request.query.raitingFrom)
  console.log(request.query.raitingTo)
  console.log(page)
  if (request.query.gender === 'all') {
    const personals = await Personal.find({}).skip(skip).limit(limit)
    response.json(personals)
  } else {
    const personals = await Personal.find({ gender: request.query.gender }).skip(skip).limit(limit)
    response.json(personals)
  }
  // raiting: { $gte: 0, $lte: 100 },
})


personalsRouter.get('/count', async (request, response) => {

  if (request.query.gender === 'all') {
    const count = await Personal.estimatedDocumentCount({})

    response.json(count)
  } else {
    const count = await Personal.countDocuments({ gender: request.query.gender })
    response.json(count)
  }
})

personalsRouter.get('/:id',async (request, response) => {
  const personal = await Personal.findById(request.params.id)
  if (personal) {
    response.json(personal)
  } else {
    response.status(404).end()
  }
})

module.exports = personalsRouter