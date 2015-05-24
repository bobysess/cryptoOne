
var express = require('express');
var router = express.Router();
var jsrp = require('jsrp');
var clientJsrp= new jsrp.client();
// var Client = require('node-rest-client').Client;
// var client = new Client();
// var remoteHost= "http://localhost:3000";
var defaultRequestHandler= require('./default');
var session = require('../others/session');
var remoteHost=session.remoteHost;
var client = session.client
var errorMsgs = require('../others/error')

//index
  router.get('/', function (req, res) {
      res.sendFile('public/index.html');
  });

  router.get('/download/', function (req, res) {
      var file =  'public/test.pdf';
      res.download(file); //
  });
  //login
  router.post('/login', function (req, res) {
        var args={data : {} , headers : {}};
        args.data= req.body; 
        args.headers["Content-Type"]="application/json";
        args.headers["Accept"]=["application/json", "application/json;charset=utf-8", "application/json;charset=UTF-8"];
          // set token   
        var token =req.get("Access-Token");
        if (token){
          args.headers["Access-Token"]=token; 
        } 
        var url=remoteHost+req.originalUrl //login url // .replace('/remote','');
        console.log(req.method + '   ' + req.originalUrl);
        console.log("Token  :"+ req.get("Access-Token"));
        client.registerMethod("doRequest", url , req.method); //login url
        /* */// do request
        client.methods.doRequest(args, function(data, response){
      	  console.log(response.headers['set-cookies']);
      	  if(response.statusCode==200){
	          session.token=data.token ;
	          session.user=data.user;
	          session.publicKey=data.user.publicKey;
	          // add token authentification to header
	          if(session.token){ args.headers["Access-Token"]= session.token }
	          // request secret key
	          var secretkeyUrl= remoteHost+'/secret_keys/'+data.user.secretKeyId;
	          client.get(secretkeyUrl, args, function (data, reponse ){
	                session.secretKey= data.secretKey;
	          });
      	    }
      	  res.status(response.statusCode).json(data); // copy data and status
        }).on('error', function(error){
		 	console.log("from error handler")
            res.status(500).json({error : errorMsgs.noConnectionToRemote})
		  });;
      	    
      	   /*
                 LOGIN WITH REMOTE SECURE PROTOCOL
      	   */
   //    	    clientJsrp.init({ username: args.data.email , password: args.data.password, length : 1024 }, function() {
   //  			// Client instance is ready to be used here. 
   //  			//compute A and sent email and A to remote
   //    	    	// receive B and salt from remote 
   //    	    	// compute M  and send to remote 
   //    	    	// receive  user und token from remote  and gebe it weiter to browser
   //  			var A = clientJsrp.getPublicKey();
   //  			var B; 
   //  			var salt; 
   //  			var M; 
   //  			var email= args.data.email // username 
   //  			args.data.A=A; // send A 
   //  			client.methods.doRequest(args, function(data, response){
   //  				salt= data.salt
   //  				B= data.B; 
   //  				clientJsrp.setSalt(salt);
   //  				clientJsrp.setServerPublicKey(B);
   //  				M=clientJsrp.getProof();
   //  				args.data={M : M , email : email }// M und email 
   //  				client.methods.doRequest(args, function(data, response2){
   //  					 console.log(data);
   //  					 console.log("A  :"+ A);
   //  					 console.log("B  :"+ B);
   //  					// console.log('client')
   //  					 //console.log(clientJsrp.getSharedKey());

   //  					 res.status(response2.statusCode).json(data);

   //  				})
   //  			});
			// });

      	     

          //
  })
  //logout
  router.get('/logout', function (req, res, next) {
      //res.sendFile('public/index.html');
      console.log("Logout ");
      defaultRequestHandler(req,res,next, {});
      res.json({error : "logout"});
  });

  module.exports = router;
