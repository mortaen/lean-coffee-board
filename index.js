const express = require('express')
const errorHandler = require('./errorHandler')
const { use } = require('./routes/cards')
const connectDatabase = require('./setupMongo')

require('dotenv').config()

const app = express()

const { PORT, MONGODB_URI } = process.env

connectDatabase(MONGODB_URI)

app.use(express.json())

app.use('/api/cards', require('./routes/cards'))

app.use(errorHandler)

app.listen(PORT, () => {
  {
    console.log(`Server listening at http://localhost:${PORT}`)
  }
})
