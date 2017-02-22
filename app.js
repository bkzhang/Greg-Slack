const app = require('express')()
const bodyParser = require('body-parser')

const bot = require('./bot')
const roll = require('./roll')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.status(200).send('Ain\'t that just the way?')
})

app.post('/greg', bot)

app.post('/roll', roll)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(400).send(err.message)
})

app.listen(port, () => {
  console.log('listening on http://localhost:3000')
})
