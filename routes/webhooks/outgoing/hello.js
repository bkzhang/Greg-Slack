'use strict'

module.exports = (req, res, next) => {
  let userName = req.body.user_name
  if (userName == 'slackbot') {
    return res.status(200).end
  }
  let botPayload = {
    text: 'Hello, ' + userName + '!'
  }
  return res.status(200).json(botPayload) 
}
