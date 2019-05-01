const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const { _config } = require('../config/_config')
const { Login } = require('../models/login')

const login = new Login()

app.post('/login', async (req, res) => {

  const { id_email, password } = req.body

  const data = await login.getToken(id_email)

  if (!data) {
    return res.status(404).json({
      ok: false,
      result: `Usuario y/o contraseña incorrectos`
    })
  } 
  console.log('data', data)
  const hash = data.rows[0].password
  const resPassword = await bcrypt.compareSync(password, hash);

  if (!resPassword) {
    return res.status(403).json({
      ok: false,
      result: `La contraseña es incorrecta ${e}`
    })
  }

    if (resPassword) {
    const token = jwt.sign({id: data.rows[0].id_email}, _config.keySecretToken, { 
      expiresIn: 86400
    })
    
    return res.status(200).send({
      auth: true, 
      token: token
    })

  }
})

module.exports = app