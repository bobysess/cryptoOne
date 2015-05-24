var express = require('express');
var router = express.Router();
var defaultRequestHandler= require('./default')
var crypto = require('../others/crypto');
var session= require('../others/session')


router.get('/',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:id/menberships',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.get('/:id/shared_documents',  function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.put('/:id', function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
router.delete('/:id', function(req,res, next ){
	defaultRequestHandler(req, res, next , {});
});
// create a group
router.post('/',  function(req,res, next ){
	// generate KGV
	// encrypt KGV With the public Key
	var beforeRequestCallback= function(req, args){
		var KGV = crypto.generateKGV();
		console.log(" publicKey : " + session.publicKey +" KGV : "+KGV) ;
		args.data.KGV= crypto.RSAencrypt(session.publicKey, KGV);
		console.log("hella from create user:");
	}
	defaultRequestHandler(req, res, next , {beforeRequestCallback : beforeRequestCallback});
});

module.exports = router;
