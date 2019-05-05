const jwt = require('jsonwebtoken')
const { _config } = require('../config/_config')

const verifyToken = (req, res, next) => {
    var token = req.headers['authorization']
    if (!token) {
      return res.status(401).send({
        ok: false,
        message: '403 Forbidden'
      })
    }
    
    token = token.replace('Bearer ', '')
   
    jwt.verify(token, _config.keySecretToken, function(err, token) {
      if (err) {
        return res.status(401).send({
          ok: false,
          message: 'Toket inválido'
        });
      } else {
        req.token = token
        next()
      }
    });
  }

module.exports = {
    verifyToken
}