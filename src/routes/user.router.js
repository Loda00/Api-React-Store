const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

const { User } = require('../models/user')

const user = new User()

app.get('/user', async (req, res) => {
  const { id_email } = req.query
  console.log('params', req.query)
  const data = await user.getUser(id_email)

  if (!data) {
    return res.status(403).json({
      ok: false,
      error: data
    })
  }
  const token = req.headers

  delete data.rows[0].password

  res.status(200).json({
    ok: true,
    data
  })
})

app.post('/user', async (req, res) => {

  const {
    id_email,
    name,
    lastName,
    userId,
    photo,
    auth,
    roll,
  } = req.body;

  // emailExistence.check(id_email, (err, response) => {
  //   if (err) {
  //     return res.status(401).json({
  //       ok: false,
  //       message: `Dirección de corre electrónico no existe ${err}`
  //     })
  //   }
  //   console.log('response', response)
  // })

  // console.log('is', isEmail)

  res.json({
    ok: 200
  })

  // const password = bcrypt.hashSync('password', 10)
  
  // const data = await user.addUser(id_email, name, lastName, userId, 'photo', 'password', true, 1)

  // if (!data) {
  //   return res.status(404).json({
  //     ok: false,
  //     data
  //   })
  // }

  // res.status(200).json({
  //   ok: true,
  //   data
  // })
})

// router.post ('/ login', function (req, res) {
//   User.findOne({email: req.body.email}, function (err, usuario) { 
//     if (err) {
//       return res.status (500) .send ('Error en el servidor.'); 
//     }
//     if ((usuario)) {
//       return res.status (404) .send ('No se encontró ningún usuario.');
//     }

//     var passwordIsValid = bcrypt.compareSync (req.body.password, user.password); 

//     if (!passwordIsValid)
//     return res.status (401) .send ({auth: false, token: null});
//     var token = jwt.sign ({id: user._id}, config.secret, { 
//       expiresIn: 86400 // caduca en 24 horas 
//     });
//     res.status (200) .send ({auth: true, token: token}); 
//   })
// })

// router.post ('/ register', function (req, res) { 
  
//   var hashedPassword = bcrypt.hashSync (req.body.password, 8); 
  
//   User.create ({ 
//     name: req.body.name, 
//     correoElectrónico: req.body.email, 
//     contraseña: hashedPassword 
//   }, 

//   function (err, user) { 
//     if (err) return res.status (500) .send ("Hubo un problema al registrar el usuario.")
//     // crear un token 
//     var token = jwt.sign ({id: user._id}, config.secret, { 
//       expiresIn: 86400 // caduca en 24 horas 
//     });
//     res.status (200) .send ({auth: true, token: token}); 
//   }); 
// });

// router.get ('/ me', function (req, res) {
//   var token = req.headers ['x-access-token']; 
//   if (! token) devuelve 
//   res.status (401) .send ({auth: false, mensaje: 'No se proporcionó el token'}); 
  
//   jwt.verify (token, config.secret, function (err, decoded) { 
//     if (err) return res.status (500) .send ({auth: false, mensaje: 'No se pudo autenticar el token.'}); 
    
//     res. status (200) .send (decoded); 
//   }); 
// });


module.exports = app