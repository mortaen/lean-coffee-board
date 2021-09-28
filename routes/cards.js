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
  res.set('Content-type', 'text/html; charset=utf-8')
  res.send(req.body)
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
