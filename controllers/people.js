const peopleRouter = require('express').Router()
const Person = require('../models/person')

peopleRouter.get('/', async (request, response) => {
  const persons = await Person.find({})
  response.json(persons)
})

peopleRouter.get('/:id',async (request, response) => {
  const person = await Person.findById(request.params.id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

peopleRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    photo: body.photo,
    raiting: body.raiting,
    gender: body.gender,
    follow: false,
    isOnline: false,
    chat: []
  })
  const savedPerson = await person.save()
  response.status(201).json(savedPerson)
})

module.exports = peopleRouter