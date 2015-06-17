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
     			var publicKey = data.publicKey // the data are a user object
     			if (publicKey){
     				callback(publicKey) // the data are a user object
     			}else{
     				callback(null) // the data are a user object
     			}

			}).on('error', function(error){
				res.status(500).json({error : error.noConnectionToRemote})
			});
	    },
	    getMenbership : function( groupId, userId , callback){
       //set url 
			var url=remoteHost+'/menberships?'+querystring.stringify({ user_id : userId , group_id : groupId }); 
			args.headers["Access-Token"]=session.token; //set token
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct
     			if(Array.isArray(data)){
     				menbership=data[0] 
     			}else{
     				menbership = data;
     			}
     			// check if it is existing
     			if (menbership){
     				callback(menbership) // the data are a user object
     			}else{
     				callback(null) // the data are a user object
     			}
     			//callback(menbership) // the data are a user object
			}).on('error', function(error){
				res.status(500).json({error : error.noConnectionToRemote})
			});
	    },
	    getSignature : function( signorityId, userId , callback){
       //set url 
			var url=remoteHost+'/signatures?'+querystring.stringify({ user_id : userId , signority_id : signorityId }); 
			args.headers["Access-Token"]=session.token; //set token
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct 
     			if(Array.isArray(data)){
     				signature=data[0];
     			}else{
     				signature = data;
     			}
     			//  exist
     			if (signature){
     				callback(signature) // the data are a user object
     			}else{
     				callback(null) // the data are a user object
     			}
     			//callback(signature) // the data are a user object

			}).on('error', function(error){
				res.status(500).json({error : error.noConnectionToRemote})
			});
	    },
	    getSharedDocument : function( groupId, docId , callback){	
       //set url 
			var url=remoteHost+'/shared_documents?'+querystring.stringify({ group_id : groupId , document_id : docId });
			args.headers["Access-Token"]=session.token; //set token 
     		client.get(url, args, function(data, response){
     			// check if the user the reponse is correct 
     			
     			if(Array.isArray(data)){
     				sharedDoc=data[0];
     			}else{
     				sharedDoc=data;
     			}
     			// check if it is existing
     			if (sharedDoc){
     				callback(sharedDoc) // the data are a user object
     			}else{
     				callback(null) // the data are a user object
     			}
			}).on('error', function(error){
				res.status(500).json({error : error.noConnectionToRemote})
			});
	    },
	    getSignatures : function(userId, callback){
	    	args.headers["Access-Token"]=session.token; //set token
	    	var url = remoteHost+'/users/'+userId+'/signatures';
	    	client.get(url, args, function(data, response){
	    		if (data){
     				callback(data) // the data are a user object
     			}else{
     				callback(null) // the data are a user object
     			}
	    		
	    	}).on('error', function(error){
				res.status(500).json({error : error.noConnectionToRemote})
			});
	    }

	    // get user signatures
	    // get listall users



}