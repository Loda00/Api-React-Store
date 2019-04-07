const express = require('express')
const { _config } = require('./config/_config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', require('./routes/product.router'))

app.listen(_config.PORT.port , () => {
    console.log(`server listening on port ${_config.PORT.port}`)
})
