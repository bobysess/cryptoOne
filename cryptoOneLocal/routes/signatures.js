var express = require('express');
var router = express.Router();
var defaultRequestHandler= require('./default')
var crypto = require('../others/crypto');
var session= require('../others/session')

router.get('/',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.get('/:id', function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.put('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.delete('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});

//create signature
router.post('/',  function(req,res, next ){
	// decrypt my private key with my passphrase
	// encrypt the user public key with my passphrase 
	// save the encrypted  public Key in the  request object 
	// sign the public key with my private key 
	// save the signature in the request
	//delete passphrase
	var passphrase= req.body.passphrase
	var userPublicKey= req.body.userPublicKey; // the public key of the new trusted user
	req.body.encryptedPublicKey= crypto.RSAencrypt(session.publicKey, userPublicKey );//the public key ist encryptedPublicKey
    req.body.value = crypto.sign(passphrase, session.secretKey,userPublicKey );	  
    delete req.body.passphrase
    passphrase= null; 

	defaultRequestHandler(req, res, next );
});


module.exports = router;
