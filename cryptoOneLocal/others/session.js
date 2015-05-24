	var Client = require('node-rest-client').Client;
	var client = new Client();
	var remoteHost= "http://localhost:3000";
	var sessionInfo= {
	            		token : null,
	            		user : null  , 
	           			secretKey  :  null , 
	            		publicKey : null ,
	            		client : client,
	            		remoteHost :remoteHost,
					};
    //add error listener to  client
    client.on('error', function(err){
    	throw new Error(err);
    })

	//module export 
	module.exports = sessionInfo;