
	//var ursa = require('ursa');
	var rsa = require('node-rsa');
	var clearEncoding ='utf8';
	var cipherEncoding ='base64'
	var privatekeyCipher= 'aes';
	var signatureAlgorithm= 'RSA-MD5'
	var crypto = require('crypto')
	var errorMsgs= require('./error')


	module.exports= {

	generateKeypair : function (passphrase){

	    var   keypair = new  rsa({b : 1024})
	    return {
	    	  secretKey : this.AESencrypt(passphrase , keypair.exportKey('pkcs1-private-pem')),
	    	  publicKey : keypair.exportKey('pkcs1-public-pem')
	    	}
	},

	RSAencrypt : function (  public_key , text){

	     var publicKey = new rsa(public_key);
	     var encrypted=publicKey.encrypt(text,'base64','utf8');
	     return encrypted ;
	},

	RSAdecrypt : function(passphrase, secret_Key , text){
		try{// fire a fehler by wrong passphrase
		 		var privateKey= this.AESdecrypt(passphrase, secret_Key);
			 }catch(err){
		 		throw new Error(errorMsgs.wrongPassphrase);
		  	}
		 	//
		 privateKey= new rsa(privateKey)
	     var  decrypted = privateKey.decrypt(text, 'utf8', 'base64');
	     return decrypted;
	},

	sign : function ( passphrase, secretKey, text ){
		try{ // fire a fehler by wrong passphrase
				var  privateKey=this.AESdecrypt(passphrase, secretKey)
			 }catch(err){
		  		throw new Error(errorMsgs.wrongPassphrase)
		 	}
		 	//
		 privateKey =new rsa(privateKey);
	     var signature =privateKey.sign(text, 'base64', 'utf8');
	     return signature;
	},

	verify : function ( publickey, text, signature){
	     var publicKey = new rsa(publickey);
	     var result = publicKey.verify(text , signature ,'utf8','base64');
	     return result ;
	},


	generateKGV : function (){
	     return crypto.randomBytes(43).toString ('base64');
	},
	generateSymKey : function (){
	     return crypto.randomBytes(43).toString ('base64');
	},
	generatePassword : function (){
	     return crypto.randomBytes(6).toString ('base64');
	},

	AESencrypt : function( key , plaintext){
	    var cipher = crypto.createCipher('aes-256-cbc', key)  
		var encryptedText=cipher.update(plaintext, 'utf8', 'base64');
		encryptedText += cipher.final('base64')
		return encryptedText;
	 
	},

	AESdecrypt : function( key , text){
	    var decipher = crypto.createDecipher('aes-256-cbc', key); 
		var decryptedText=decipher.update(text, 'base64', 'utf8');
		decryptedText += decipher.final('utf8');
		return decryptedText;
	},
	validSignature : function( publicKey, signature , passphrase, secretKey){ // here is signature a signature  object
        var userPublicKey= signature.user.publicKey;
        if(secretKey && passphrase){
          if(userPublicKey != this.RSAdecrypt(passphrase, secretKey, signature.encryptedPublicKey)){
          	return false
          }
        }
        
        return this.verify(publicKey, userPublicKey, signature.value);
	},
	validSignatures : function(publicKey, signatures,passphrase, secretKey){
        for(var i=0; i<signatures.length ; i++){
        	if(!this.validSignature( publicKey,signatures[i], passphrase, secretKey )){
        		return false ;
        		break ;
        	}
        }
        return true ;
	},
	validPublicKey : function(signature, passphrase){ //the  public key is contained in the signature object
		 validSignature(session.publicKey, signature, session.secretKey, passphrase)

	}

	}