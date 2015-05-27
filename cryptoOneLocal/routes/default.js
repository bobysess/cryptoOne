var express = require('express');
// var Client = require('node-rest-client').Client;
// var client = new Client();
// var remoteHost= "http://localhost:3000";
var session = require('../others/session');
var client= session.client ;
var remoteHost=session.remoteHost;
var errorMsgs = require('../others/error');
var errorDomain = require('domain').create();

/*
	This function heads the Request of the Browser to the  Remote Server
 */

	var defaultRequestHandler =  function (req,res, next, callback){ 
 		var args={data : {} , headers : {}};
		args.data= req.body; 
        args.headers["Content-Type"]="application/json";
        args.headers["Accept"]=["application/json", "application/json;charset=utf-8", "application/json;charset=UTF-8"];
        // set token 
        var token =req.get("Access-Token");
        if (token){
        	args.headers["Access-Token"]=token; 
        } 
        //set url 
		var url=remoteHost+req.originalUrl
		args.url= url; 
     	console.log(req.method + '   ' + req.originalUrl);
     	// do request
     	//var doRequest = function(){
     		//IMPORT delete passphares
	    delete  req.body.passphrase
	    delete  args.data.passphrase
		client.registerMethod("doRequest", args.url , req.method);
		console.log('data');
		console.log(args.data);
		client.methods.doRequest(args, function(data, response){
			// call the after request callback
			console.log("response data : status  " +response.statusCode)
			console.log(data);
			if( callback){
				callback(data, response); // most   
			}else{
			    res.status(response.statusCode).json(data); // copy data and status
			}

		}).on('error', function(error){
			res.status(500).json({error : error.noConnectionToRemote})
		});
		
    }
    module.exports = defaultRequestHandler;
