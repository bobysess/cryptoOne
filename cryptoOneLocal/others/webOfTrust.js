var n= 1;
var session =require('./session');
var crypto= require('./crypto');
var remote = require('./remote');
module.exports= {
        
        /*
			this  Meothod check if the first user trusts the second user
			IMPORTANT: the first user most be a friend of the current logged usert
			the callback function is called with the parameter public Key .
			if public Key is null, then the trust verification was false
			else it was true 
			Example:result : { publicKey : "dsdfadf"}
         */
	    trustsAB : function(userId, otherUserId, callback ){
	    	var result = {}
			remote.getSignature( session.user.id,  userId, function(signature){ // check first if the user public key is correct
				//if(signature && crypto.validSignature(session.publicKey, signature,passphrase, session.secretKey )){
				if(signature){
					userPublicKey= signature.user.publicKey // the public key of the first user
					remote.getSignature(userId, otherUserId, function(otherSignature){
						//if(otherSiganture && crypto.validSignature(userPublicKey, otherSignature)){ // all correct
					 	if(otherSignature){
							result.publicKey= otherSignature.user.publicKey; 
					 	}
						callback(result);
					})
				}else{
					callback(result);
				}
			})

	    },
	    /*
			this Method  check if the current logged user trusts the user als parameter
			he callback function is called with the parameter public Key .
			if public Key is null, then the trust verification was false
			else it was true 
			Example:{result : { publicKey : "dsdfadf"}}
	    */ 
	    trust :function(userId,passphrase, callback){
	    	this.trustsAB(session.user.id, userId, callback);// 

	    },
	    /*
			this Method validate the public key of a user
			he callback function is called with the parameter public Key .
			if public Key is null, then the validation is failed was false
			else it was true 
			Example:{result : { publicKey : "dsdfadf"}}
	    */
	    validate : function(userId, callback){

	    }
	  
}