    var nodemailer = require('nodemailer');
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cryptoonelocal@gmail.com',
            pass: 'webOfTrust'
        }
    });

    module.exports={
    // send a email  to all users
                 sendAEmailToAllUsers : function(users, msg , title){
                },
    // send the new user email with his init password
                    sendNewUserConfirmationEmail : function (userMail,password){
                    var email = userMail ; 
                    var msg   = "willkommen <br> Password : "+ password;
                    var title = "Willkommen in  CryptoOne";
                    this.sendEmail(email , msg, title);
                },
                // Utils
                sendEmail : function ( email, msg, title){
                // email options
                   var mailOptions = {
                             from: 'CryptoOne <cryptoonelocal@gmail.com>', // sender address
                             to: email, // list of receivers
                             subject: title, // Subject line
                             text: msg, // plaintext body
                             html: msg // html body
                   };
                   // send  email
                   transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                    console.log(error);
                            }else{
                                    console.log('Message sent: ' + info.response);
                             };
                   });
                }
        }