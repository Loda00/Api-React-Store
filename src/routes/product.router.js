const express = require('express')
const app = express()
const { verifyToken } = require('../middleware/autenticacion')

const { Product } = require('../models/products')

const product = new Product()

app.get('/products', verifyToken, async (req, res) => {
  
  const data = await  product.getProducts()

  if (!data) {
    return res.status(404).json({
      ok: false,
      data
    })
  }
  
  res.status(200).json({
    ok: true,
    data
  })
})

module.exports = app