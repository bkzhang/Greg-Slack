'use strict'

const app = require('express')()
const bodyParser = require('body-parser')
require('dotenv').config()

const hello = require('./routes/webhooks/outgoing/hello')
const kitty = require('./routes/webhooks/outgoing/kitty')
const roll = require('./routes/webhooks/incoming/roll')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.status(200).send('Ain\'t that just the way?')
})

app.post('/hello', hello)
app.post('/kitty', kitty)
app.post('/roll', roll)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(400).send(err.message)
})

app.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})
