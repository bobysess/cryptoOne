var express = require('express');
var router = express.Router();
var defaultRequestHandler= require('./default')
var crypto = require('../others/crypto');
var session= require('../others/session')
var remote = require ('../others/remote')


router.get('/',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.get('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.get('/:id/shared_documents',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});

router.put('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.delete('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
// create a document
router.post('/',  function(req,res, next ){
	// generate symkey
	// encrypt symkey with the user public key
	// save symkey in data 
	var symKey=crypto.generateSymKey();
	var encryptedSymKey=crypto.RSAencrypt(session.publicKey, symKey);
	req.body.symKey=encryptedSymKey;

	defaultRequestHandler(req, res, next );
});















module.exports = router;
