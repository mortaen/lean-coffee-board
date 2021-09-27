const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.set('Content-type', 'text/html; charset=utf-8')
  res.send('Hello World!')
})

app.post('/api/cards', (req, res) => {
  console.log(req.body)
  res.send('This was a POST request')
})

app.put('/api/cards', (req, res) => {
  res.send('This was a PUT request')
})

app.patch('/api/cards', (req, res) => {
  res.send('This was a PATCH request')
})

app.delete('/api/cards', (req, res) => {
  res.send('This was a DELETE request')
})

app.listen(port, () => {
  {
    console.log(`Server listening at http://localhost:${port}`)
  }
})
