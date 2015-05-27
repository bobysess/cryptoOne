var express = require('express');
var router = express.Router();
var defaultRequestHandler= require('./default')


router.get('/',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.get('/:id', function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.post('/',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.put('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});
router.delete('/:id',  function(req,res, next ){
	defaultRequestHandler(req, res, next );
});

module.exports = router;
