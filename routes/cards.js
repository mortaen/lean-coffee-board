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
  res.send(req.body.text)
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
  res.send(req.body)
})

module.exports = router
