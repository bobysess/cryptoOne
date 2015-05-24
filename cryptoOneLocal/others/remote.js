var session = require('./session')
var client =session.client;
var remoteHost= session.remoteHost
var querystring =require('querystring')

var args={data : {} , headers : {}};
args.headers["Content-Type"]="application/json";
args.headers["Accept"]=["application/json", "application/json;charset=utf-8", "application/json;charset=UTF-8"];
args.headers["Access-Token"]=session.token; 



module.exports={
	    getPublicKey : function (userId, callback ){
       //set url 
			var url=remoteHost+'/users/'+userId; 
			args.headers["Access-Token"]=session.token; //set token
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct 
     			callback(data.publicKey) // the data are a user object

			});
	    },
	    getMenbership : function( groupId, userId , callback){
       //set url 
			var url=remoteHost+'/menberships?'+querystring.stringify({ user_id : userId , group_id : groupId }); 
			args.headers["Access-Token"]=session.token; //set token
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct
     			menbership=data[0] 
     			callback(menbership) // the data are a user object

			})
	    },
	    getSignature : function( signorityId, userId , callback){
       //set url 
			var url=remoteHost+'/signatures?'+querystring.stringify({ user_id : userId , signority_id : signorityId }); 
			args.headers["Access-Token"]=session.token; //set token
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct 
     			signature=data[0]
     			console.log(data);
     			callback(signature) // the data are a user object

			})
	    },
	    getSharedDocument : function( groupId, docId , callback){	
       //set url 
			var url=remoteHost+'/shared_documents?'+querystring.stringify({ group_id : groupId , document_id : docId });
			args.headers["Access-Token"]=session.token; //set token 
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct 
     			sharedDoc=data[0]
     			callback(sharedDoc) // the data are a user object

			})
	    },
	    getSignatures : function(userId, callback){
	    	args.headers["Access-Token"]=session.token; //set token
	    	var url = remoteHost+'/users/'+userId+'/signatures';
	    	client.get(url, args, function(data, response){
	    		callback(data);
	    	})
	    }

	    // get user signatures
	    // get listall users



}