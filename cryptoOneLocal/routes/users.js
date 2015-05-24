var express = require('express');
var router = express.Router();
var defaultRequestHandler= require('./default');
var crypto = require('../others/crypto');
var mailer = require('../others/mailer');
var jsrp = require('jsrp');
var clientJsrp = new jsrp.client();
var remote= require('../others/remote')
var errorMgs= require('../others/error')
// var Client = require('node-rest-client').Client;
// var client = new Client();
// var remoteHost= "http://localhost:3000";
var session =require('../others/session')
var client= session.client; 
var remoteHost =session.remoteHost;

router.get('/', function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:id', function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:signorityId/signatures', function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:userId/menberships',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:userId/documents',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:userId/groups',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
// delete also 
router.delete('/:id', function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});

//  
router.post('/', function(req, res , next){
    req.body.password= crypto.generatePassword();  	 //generate password  and add to user
    var userEmail=req.body.email;  	 // set the user object to the server
  	console.log(req.body);  	 //add the password to the user object
	defaultRequestHandler(req, res, next, mailer.sendNewUserConfirmationEmail(userEmail,  req.body.password));
});

// verify siganture 
router.post('/:userId/validatesignatures', function(req, res , next){
	var passphrase= req.body.passphrase
	remote.getSignatures(req.params.userId, function(signatures){
		if(signatures.length>0){// dont have signature
			if(crypto.validSignatures(session.publicKey, signatures, passphrase, session.secretKey)){
				res.status(200).json({data : true})
			}else{
				//res.status(200).json({data : false})
				res.status(500).json({error : errorMsgs.wrongSignature})
			}
	       passphrase=null
	       delete req.body.passphrase;
	   }else{
	   		res.status(200).json({data : true})
	   }
	})


});
// check if trust
router.post('/:userId/trust/:otherUserId', function(req, res, next){ 
	// download the user signature(included public key) and check if it is corret
	//download the others signature(included public) and check if it is correct with public key of the first user
    var passphrase =req.body.passphrase
    var userId = req.params.userId
    var otherUserId= req.params.otherUserId
	remote.getSignature( session.user.id,  userId, function(signature){ // check first if the user public key is correct
		if(signature && crypto.validSignature(session.publicKey, signature,passphrase, session.secretKey )){
			userPublicKey= siganture.user.publicKey // the public key of the first user
			remote.getSignature(userId, otherUserId, function(otherSignature){
				if(otherSiganture && crypto.validSignature(userPublicKey, otherSignature)){
					res.status(200).json({data : true})
				}else{
					res.status(200).json({data : false})
				};
			})
		}else{
			res.status(500).json({error : errorMsgs.wrongSignature});
		}
	})
});


// update user info
router.put('/:id', function(req, res, next){
   
    //check if the user is initialized
    // by uninitalizerd user generate key pair
    if(!req.body.isInitialized){
    	
    	var passphrase= req.body.passphrase;
    	delete req.body.passphrase//delete the passphrase 
    	var keypair = crypto.generateKeypair (passphrase);  // create the secret key  and encrypts the secret key with passphrase 
    	var secretKey= {secretKey : keypair.secretKey };    // add the secret key to the remote server and receive the id as  reponse
    	var urlToCreatSecretkey=remoteHost+'/secret_keys';
    	var urlToUpdateUser = remoteHost+'/users/'+req.body.id;
    	console.log(req.body);
    	// request argument
    	var args={data : {} , headers : {}};
    	//set data
         args.data= secretKey;
    	// set token 
        var token =req.get("Access-Token");
        if (token){
        	 args.headers["Access-Token"]=token; 
        } 
        //content type 
        args.headers["Content-Type"]="application/json";
        args.headers["Accept"]=["application/json", "application/json;charset=utf-8", "application/json;charset=UTF-8"];
        //do request  create secret   key on the remote server
    	client.post(urlToCreatSecretkey, args, function(data, reponse1){
    		console.log("create secret Key reponse: ");
    		console.log(data);
    		args.data=req.body; 
    		args.data.publicKey=keypair.publicKey;
            args.data.secretKeyId= data.id ;   // add the id of the secret key  in the user object and update the user object to the database
            args.data.isInitialized=true ; 
            args.data.roles='User' // set the user object attribute uninitialized on true
            client.init({ username: args.data.email , password: args.data.password }, function () {
    			client.createVerifier(function(err, result) {
        		// result will contain the necessary values the server needs to 
        		// authenticate this user in the future. 
        		    args.data.salt=result.salt;
        		    args.data.verifier=result.verifier;
        		    //delete passphrase,when it exists 
        		    delete args.data.passphrase
        		    //delete args.data.password
        		    //set user data to update
            		client.put(urlToUpdateUser,args, function(data, response){
              			res.status(response.statusCode).json(data); 
            		});
        			
    			});
			});
           
             // defaultRequestHandler(req, res, next);
    	}).on('error', function(error){
		 	console.log("from error handler")
            res.status(500).json({error : errorMsgs.noConnectionToRemote})
		 });
    }else{
    	// if the passphrase is contained in  request dann the user want to change it 
        if(req.body.newPassphrase && req.body.altPassphrase){
        	// decrypt the secretkey with old passphrase 
        	//encrypt the secret key with the new passphrase
        	// update the current secret key here in local server
        	var  decryptedSecretKey = crypto.AESdecrypt(user.oldPassphrase, session.secretKey);
        	var  encryptedSecretKey = crypto.AESencrypt(user.newPassphrase, decryptedSecretKey);
        	var linkToUpdateSecretKey = remoteHost+'/secret_keys/'+session.user.secretKeyId;//this is contained in the user Json 
        	// request argument
    		var args={data : {} , headers : {}};
    		//content type 
		    args.headers["Content-Type"]="application/json";		     
		    args.headers["Accept"]=["application/json", "application/json;charset=utf-8", "application/json;charset=UTF-8"];
        	args.data.secretKey=encryptedSecretKey;
        	var token =req.get("Access-Token");
        	if (token){
        	 	args.headers["Access-Token"]=token; 
        	} 
        	// delete passphrase
        	delete  req.body.oldPassphrasee
	     	delete  args.data.oldPassphrase
	     	delete  req.body.newPassphrase
	     	delete  args.data.newPassphrase
	     	delete  req.body.passphrase
	     	delete  args.data.passphrase
        	// update the secret key 
        	client.put(linkToUpdateSecretKey, args, function(data, reponse){
                console.log('the secret was succefull updated')
                session.secretKey=encryptedSecretKey;
        	});
        }
        if(req.body.password){ // update the verifier 
        	var args={data : {} , headers : {}};
        	var urlToUpdateUser = remoteHost+'/users/'+req.body.id;
    		//content type 
		    args.headers["Content-Type"]="application/json";		     
		    args.headers["Accept"]=["application/json", "application/json;charset=utf-8", "application/json;charset=UTF-8"];
		    args.data=req.body
		    var token =req.get("Access-Token");
        	if (token){
        	 	args.headers["Access-Token"]=token; 
        	} 
		    console.log(args.data);
		    console.log(req.body)
        	clientJsrp.init({ username: args.data.email , password : args.data.password , length : 1024}, function () {
    			clientJsrp.createVerifier(function(err, result) {
        		// result will contain the necessary values the server needs to 
        		// authenticate this user in the future. 
        		    args.data.salt=result.salt;
        		    args.data.verifier=result.verifier;
        		    //delete password
        		    //delete args.data.password
        		    //set user data to update
            		client.put(urlToUpdateUser,args, function(data, response){
              			res.status(response.statusCode).json(data); 
            		});
        			
    			});
			});

        }else{
        	defaultRequestHandler(req, res, next);
        }

       
    }

});





module.exports = router;
