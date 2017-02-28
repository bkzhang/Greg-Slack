'use strict'

module.exports = (req, res, next) => { 
  return res.status(200).json({ text: "This frog's giving me the run around!" }) 
}
