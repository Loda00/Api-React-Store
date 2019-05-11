const express = require('express')
const { _config } = require('./config/_config')
const compresion = require('compression')
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(compresion())


app.use((req, res, next ) => {
    console.log(new Date().toLocaleDateString())
    next()
})

app.use('/api',
    require('./routes/product.router'),
    require('./routes/user.router'),
    require('./routes/login.router'),
    require('./routes/help.router')
    )

app.listen(_config.PORT.port , () => {
    console.log(`server listening on port ${_config.PORT.port}`)
})
