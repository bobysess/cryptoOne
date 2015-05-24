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
	callbacks can countains  two callbacks
    beforeRequestCallback  will be  called , bevor the request is sent to the Remote server.Here will be called  the most crypto methods
        Signature : function(args, req){}
           req : is the request object from the  Browser 
           args : is the object to do the request to the remote  server. It contains the headers and the body data.
    AfterRequestCallback  will be  called after the Reponse  from the  Remote Server
        Signature : function(res, data , reponse) 
         res  is the  reponse object to the Browser 
         data is the body of the reponse from the  remote server 
         reponse is the complet  reponse from the remote server
         N.B when this callback is null the data from the remote server  will be copied to the Browser, and when this
         is customised  the developper have to customised the reponse to the server 


 */

    var defaultRequestHandler =  function (req,res, next, callbacks){ 
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
		var url=remoteHost+req.originalUrl // .replace('/remote','');
		args.url= url; 
     	console.log(req.method + '   ' + req.originalUrl);
     	console.log("Token  :"+ req.get("Access-Token"));
     	
     	// do request
     	var doRequest = function(){
     		//IMPORT delete passphares
	     	delete  req.body.passphrase
	     	delete  args.data.passphrase
			client.registerMethod("doRequest", args.url , req.method);
			client.methods.doRequest(args, function(data, response){
				//client.get(url, args, function(data, response){
				// call the after request callback
				if( callbacks.afterRequestCallback){
				 	callbacks.afterRequestCallback(res, data, reponse); // most   
				}else{
			        res.status(response.statusCode).json(data); // copy data and status
			    }
			    //console.log(data);
			     //callback;
			}).on('error', function(error){
				console.log("from error handler")
			    res.status(500).json({error : error.noConnectionToRemote})
			});
		}
		//  to catch all the throwed errors
		errorDomain.on('error', function(error){
			res.status(500).json({error : error})
		})
		// domain
		errorDomain.run(function(){
			if ( callbacks.beforeRequestCallback){  
	       		callbacks.beforeRequestCallback(req, args)
	    	}
	    	// do the request
	    	doRequest();
		})
		
    }
 // the same function but without callbacks
    module.exports = defaultRequestHandler;
