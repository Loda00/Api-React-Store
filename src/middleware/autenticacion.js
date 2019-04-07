const jwt = require('jsonwebtoken')

let virificaToken = (req, res, next) => {
    let token = req.get('token')
    console.log(token);

    jwt.verify(token,'seed' , (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        
    })
    next()    
    // res.json({
    //     token
    // })
}

module.exports = {
    virificaToken
}