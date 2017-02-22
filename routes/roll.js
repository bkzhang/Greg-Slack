const request = require('request')

module.exports = (req, res, next) => {
  let matches
  let times = 2
  let die = 6
  let rolls = []
  let total = 0
  let botPayload = {}

  if (req.body.text) {
    matches = req.body.text.match(/^(\d{1,2})d(\d{1,2})$/)
    
    if (matches && matches[1] && matches[2]) {
      times = matches[1]
      die = matches[2]
    } else {
      return res.status(200).send('<number>d<sides>')
    }
  }

  for (let i = 0; i < times; ++i) {
    let currentRoll = roll(1, die)
    rolls.push(currentRoll)
    total += currentRoll
  }

  botPayload.text = ':game_die: ' + req.body.user_name + ' rolled ' + times + 'd' + die + ':\n' +
                    rolls.join(' + ') + ' = *' + total + '*'

  botPayload.username = 'greg'
  botPayload.channel = req.body.channel_id 

  send(botPayload, (err, status, body) => {
    if (err) {
      return next(err)

    } else if (status !== 200) { 
      return next(new Error('Incoming WebHook: ' + status + ' ' + body))
    } else {
      return res.status(200).end();
    }
  })
}

function roll (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function send (payload, callback) {  
  let uri = 'https://hooks.slack.com/services/' + process.env.ROLL_TOKEN 
  
  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (err, res, body) {
    if (err) {
      return callback(err)
    }
    
    callback(null, res.statusCode, body)
  })
}
