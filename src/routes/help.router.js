const express = require('express')
const app = express()

app.get('/help', async (req, res) => {
    res.json({
        ok: true,
        information: {
            help: true,
            hour: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            user: 'You Sure',
        },
        sentHelp: 'Help notice sent',
        mail: 'teamInnovacion@gmail.com',
        connectedAlexa: false,
        sentEmail: false,
    })
})

module.exports = app