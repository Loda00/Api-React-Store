const express = require('express')
const { _config } = require('./config/_config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', 
    require('./routes/product.router'),
    require('./routes/user.router'),
    require('./routes/login.router')
    )

app.listen(_config.PORT.port , () => {
    console.log(`server listening on port ${_config.PORT.port}`)
})
