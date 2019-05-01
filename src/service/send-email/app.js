const nodemailer = require('nodemailer');
const { _config } = require('../../config/_config')

var cod = Math.random().toString()

nodemailer.createTestAccount((err, account) => {
    console.log('Procesando ...');
 
    let transporter = nodemailer.createTransport({
        service:"Gmail", 
        auth: {
            user: 'jneirachise@gmail.com', 
            pass: 'password'
        }
    })
    let x = cod.substring(2,7)

    let mailOptions = {
        from:'jneirachise@gmail.com',
        to:'mailToSend',
        subject: 'Prueba Hoy 1:32 ✔', 
   //   text: 'Hello world?', 
        html: '<h1 style="color:white; background:black; width:auto">Su código de verificación es '+x+' </h1>'  
    }

    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }

        console.log('Message sent: %s', info.messageId)
        console.log('Proceso completado ...')
        console.log('Código de verificación -> ' + x)
        console.log('Enviado !')
       
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
})

let message = {
    from: 'Nodemailer <example@nodemailer.com>',
    to: 'Nodemailer <example@nodemailer.com>',
    subject: 'AMP4EMAIL message',
    text: 'For clients with plaintext support only',
    html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`
}

const main = async () =>{

    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: 'Gmail',
      auth: {
        user: _config.authNodeMailer.user,
        pass: _config.authNodeMailer.pass
      }
    });
  
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);