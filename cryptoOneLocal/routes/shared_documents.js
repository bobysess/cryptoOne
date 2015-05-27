var express = require('express');
var router = express.Router();
var defaultRequestHandler= require('./default')
var crypto = require('../others/crypto');
var session= require('../others/session')
var remote = require('../others/remote')

router.get('/',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.get('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.put('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.delete('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
// create shared document
router.post('/',  function(req,res, next ){ 
	//decrypt the secret key with the passphrase
	//decrypt the symkey with the user private key
	// decrypt the KGV(from my Menbership) With  my private key
	// encrypt the decrypted symkey with the the KGV
	// save the new  encrypted KGV in re request object
	//delete passphrase
	  var passphrase = req.body.passphrase;
	  var decryptedSymKey= crypto.RSAdecrypt(passphrase, session.secretKey, req.body.docEncryptedSymKey)
	  var decryptedKGV= crypto.RSAdecrypt(passphrase, session.secretKey, req.body.menberEncryptedKGV)
	  req.body.encryptedSymKey = crypto.AESencrypt(decryptedKGV, decryptedSymKey);
	 // delete data.passphrase
	  //delete args.data.symKey
	  delete req.body.docEncryptedSymKey
	  delete req.body.menberEncryptedKGV
	  //delete rgs.data.KGV

	  passphrase=null

	defaultRequestHandler(req, res, next );
});

module.exports = router;
