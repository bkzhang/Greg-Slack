module.exports = function (req, res, next) {
  let userName = req.body.user_name
  if (userName == 'greg') {
    return res.status(200).end
  }
  let botPayload = {
    text: 'Hello, ' + userName + '!'
  }
  return res.status(200).json(botPayload) 
}
