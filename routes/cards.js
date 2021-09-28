const express = require('express')
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
  res.status(200).json(cards)
})

router.get('/:id', (req, res) => {
  const exampleCard = cards.find(card => card.id === req.params.id)
  if (exampleCard) {
    res.status(200).json(exampleCard)
  } else {
    const error = { message: 'Could not find object with that id.' }
    res.status(404).json(error)
  }
})

router.post('/', (req, res) => {
  const { text, author } = req.body

  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return res.status(400).json(error)
  }

  const newCard = { text, author, id: nanoid() }

  cards = [...cards, newCard]
  res.status(200).json(newCard)
})

router.put('/:id', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

router.patch('/:id', (req, res) => {
  console.log(req.body)
  res.send(req.body)
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
