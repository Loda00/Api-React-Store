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
  console.log('datsa', data.rows, password)

  if (!data) {
    return res.status(404).json({
      ok: false,
      result: `Usuario y/o contraseña incorrectos`
    })
  }

  const hash = data.rows[0].password
  const resPassword = await bcrypt.compareSync(password, hash);

  if (!resPassword) {
    return res.status(403).json({
      ok: false,
      result: `La contraseña es incorrecta`
    })
  }
  const payload = {
    id_email: data.rows[0].id_email,
    name: data.rows[0].name,
    userid: data.rows[0].userid,
  }

  if (resPassword) {
    const token = jwt.sign(payload, _config.keySecretToken, {
      expiresIn: 60 * 60 * 24
    })

    return res.status(200).send({
      auth: true,
      token: token
    })

  }
})

module.exports = app