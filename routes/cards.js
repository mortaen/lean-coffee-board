const express = require('express')
const Card = require('../models/Card')

const router = express.Router()

router.get('/', (req, res, next) => {
  Card.find()
    .then(data => res.status(200).json(data))
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
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
    text,
    author,
  })
    .then(data => res.status(201).json(data))
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

  Card.findByIdAndUpdate(id, {
    text: text,
    author: author,
  })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json(error))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  Card.findByIdAndDelete(id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json(error))
})

module.exports = router
