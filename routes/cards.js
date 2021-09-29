const express = require('express')
const Card = require('../models/Card')
const { nanoid } = require('nanoid')

const router = express.Router()

let cards = [
  {
    text: 'What is MongoDB?',
    author: 'John Doe',
    id: '12345abc',
  },
  {
    text: 'What is Node.js?',
    author: 'Jane Doe',
    id: '1234abcd',
  },
]

router.get('/', (req, res) => {
  Card.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json(error))
})

router.get('/:id', (req, res) => {
  const searchedId = req.params.id
  Card.findById(searchedId)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json(error))
})

router.post('/', (req, res) => {
  const { text, author } = req.body

  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return res.status(400).json(error)
  }

  Card.create({
    author: author,
    text: text,
  })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json(error))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { text, author } = req.body

  if (!text || !author) {
    const error = { message: 'Information missing.' }
    return res.status(400).json(error)
  }

  const card = cards.find(card => card.id === id)

  if (!card) {
    const createdCard = {
      text: text ? text : '',
      author: author ? author : '',
      id: id,
    }
    cards = [...cards, createdCard]

    return res.status(200).json(createdCard)
  }

  const updatedCard = {
    text: text ? text : card.text,
    author: author ? author : card.author,
    id: card.id,
  }

  const index = cards.findIndex(card => card.id === id)

  cards = [...cards.slice(0, index), updatedCard, ...cards.slice(index + 1)]

  res.status(200).json(updatedCard)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { text, author } = req.body

  if (!text && !author) {
    const error = { message: 'Information missing.' }
    return res.status(400).json(error)
  }

  const card = cards.find(card => card.id === id)

  if (!card) {
    const error = { message: 'Could not find object with that id.' }
    return res.status(404).json(error)
  }

  const newCard = {
    text: text ? text : card.text,
    author: author ? author : card.author,
    id: card.id,
  }

  const index = cards.findIndex(card => card.id === id)

  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]

  res.status(200).json(newCard)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const card = cards.find(card => card.id === id)
  if (!card) {
    const error = { message: 'ID not found.' }
    return res.status(404).json(error)
  }
  cards = cards.filter(card => card.id !== id)
  const success = { message: 'Object was deleted.' }
  res.status(200).json(success)
})

module.exports = router
