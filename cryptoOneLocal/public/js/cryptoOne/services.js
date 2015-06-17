				var servicesModule =angular.module('servicesModule', ['ngResource']);
				// users 
				/*

                       Api Service
  				
				*/
				servicesModule.factory('Api', ['$resource','$http' ,function($resource, $http){
					return {
						// ussers
						User : $resource('/users/:id', {}, { 'update': { method :'PUT'} }),
						 //signatures
						 Signature : $resource('/signatures/:id'),
						 UserSignature : $resource('/users/:signorityId/signatures/:id'),

				         //groups
				         UserGroup: $resource('/users/:adminId/groups/:id'),
				         Group : $resource('/groups/:id'),
						 //menberships
						 Menbership : $resource('/menberships/:id'),
						 UserMenbership : $resource('/users/:userId/menberships/:id'),
						 GroupMenbership : $resource('/groups/:groupId/menberships/:id'),
						 //secret Keys
						 SecretKey  : $resource('/secret_keys/:id'),
				         // documents                 
				         Document : $resource('/documents/:id', {} ,{ 'update': { method :'PUT'} }),
				         UserDocument : $resource('/users/:ownerId/documents'),
						 // shared documents
						 SharedDocument : $resource('/shared_documents/:id'),
						 DocumentSharedDocument : $resource('/documents/:documentId/shared_documents/:id'),
						 GroupSharedDocument :$resource('/groups/:groupId/shared_documents/:id'),
						 UserSharedDocument : $resource('/users/:ownerId/shared_documents/:id'),
						 // special users 
						 Authority : function (callback) { return  $http.get('/authority/').then(callback)},

						 //Upload : $http.post('documents/:docId/upload/'),
						 Download : function(){ return $http.get('/download')},
						 //login logout
						 login  : function(credentials){  return $http.post('/login',credentials) },
						 logout : function(){ return $http.get('logout')}
						 

						}
					}])
				/*
 					Web of Trust methods Utils

				*/

				servicesModule.factory('Trust',['$http',function($http){
					return{
						// web of trust utils methods
						 validateSignatures : function( userId, callback){ 
						 	var data ={};
						 	//if(data.passphrase= window.prompt("passphrase :")){
						 		var url = '/users/'+userId+'/validatesignatures'
						 		return $http.post(url,data).then(callback);
						 	//}
						 },
						 trust : function(userId, otherUserId ,callback){
						 		var url='/users/'+userId+'/trust/'+otherUserId
						 		//var data ={passphrase : passphrase}
						 		return $http.post(url).then(callback)
						 }

					}
				}])
                /*

						Session service
                */

				servicesModule.factory('Session', ['$location',function( $location){
					return {
							token : null,
					 	    user  : null ,  //{id : 12,  firstname : "Tseumeugne", lastname : "Arsel", email : "t.arsel3@yahoo.de" },
					 	    isloged : function (){
					 	    	if (token){ return true }else{ return false };
					 	    }
					 	}
					 }]);

                /*

					Remote service 
                */
				servicesModule.factory('Remote', ['Api','ROLES',function(Api,ROLES){
					return  {
						 // delete shared document
						 deleteSharedDocument : function(sharedDocument, callback){
						 	if(window.confirm("sicher ?")){
						  		Api.SharedDocument.delete({id : sharedDocument.id}).$promise.then(callback);
						  	}
						 },
						 // list all shared document of this document
						  listOfDocumentSharedDocuments : function(docId, callback){
					     	Api.DocumentSharedDocument.query({documentId : docId}).$promise.then(callback);
					     },
					     // list of user signatures
					     listOfUserSignatures : function(userId, callback){
					     	Api.UserSignature.query({signorityId : userId}).$promise.then(function(signatures){
					     		signatures = signatures.filter(function(signature){
					     										// filter the signature of the user
													              if(signature.user.id == userId || signature.user.roles == ROLES.AUTHORITY  ||  signature.user.roles == ROLES.ADMIN){
													                return false 
													              }else{
													                return true ;
													              }
          														});
					     		callback(signatures)
					     	});
					     },
					     // list all users, who  trusts a user
					     listOfTrustingUsers : function( userId, callback){
					     	Api.Signature.query({user_id : userId}).$promise.then(function(signatures){
					     		var  trustingsUsers =[];
					     		for(var i =0;  i<signatures.length ; i++ ){
					     			if (!(signatures[i].signority.id == userId) ){
					     				trustingsUsers.push(signatures[i].signority);
					     			}
					     		}
					     		callback(trustingsUsers);
					     	}); 
					     },
					     // list all users 
					     listAllUsers : function(callback){
					     	Api.User.query().$promise.then(callback);
					     },
					     //get User  
					     getUser : function(userId, callback){
					     		Api.User.get({id : userId}).$promise.then(callback);
					     },
					     deleteUser :function(userId, callback){
					     	if(window.confirm("Sicher ?")){
					     		Api.User.delete({id : userId}).$promise.then(callback);
					     	}
					     },
					     updateUser : function(user, callback){
					     	if (user.isInitialized){  // request the passphrase
					     	 	if (user.oldPassphrase=window.prompt("passphrase :")){
					     			Api.User.update({id : user.id}, user).$promise.then(callback);
					     	 	}
					     	}else{
					     		Api.User.update({id : user.id}, user).$promise.then(callback);
					     	}
					     	
					     },
					     createUser : function(user, callback){
					     	Api.User.save(user).$promise.then(callback);
					     },
					     // list of User  menberships
					     listOfUserMenberships : function(userId, callback){
					     	Api.UserMenbership.query({userId : userId}).$promise.then(callback);
					     },
					     //get Group
					     getGroup :  function(groupId , callback){
					     	Api.Group.get({id : groupId}).$promise.then(callback);
					     },
					     //get
					     listOfGroupMenberships : function(groupId, callback){
					     	Api.GroupMenbership.query({ groupId : groupId}).$promise.then(callback);
					     },
					     //get
					     listOfGroupSharedDocuments : function(groupId, callback){
					     	Api.GroupSharedDocument.query({groupId : groupId}).$promise.then(callback);
					     },
					     //list of user documents
					     listOfUserDocuments : function(userId, callback){
					     	Api.UserDocument.query({ownerId: userId}).$promise.then(callback);
					     },
					     //
					     getDocument : function(docId, callback){
					     	Api.Document.get({id : docId}).$promise.then(callback);
					     },
					     //
					     listOfUserGroups : function( userId, callback){
					     	Api.UserGroup.query({adminId : userId }).$promise.then(callback)
					     },
					     // create signature 
					     createSignature : function(signority, user, callback, passphrase){
					        //signority and  user are users objects
						    var signature = new Api.Signature();
						    signature.passphrase= passphrase
						    if(!signature.passphrase){ 
						    	signature.passphrase=window.prompt("passphrase :")
						    }   
						    if(signature.passphrase){
						        signature.signorityId =signority.id ; 
						        signature.userId = user.id;
						        //signature.value= user.publicKey;
						        signature.userPublicKey= user.publicKey;
						        var today = new Date();
						        signature.signatureDate = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
						        //signature= {"signature" : signature};
						        signature.$save().then(callback); 
						    }
					    },
					      // delete signature
					    deleteSignature : function(signature, callback){
					    	if(window.confirm("sicher ?")){
					      		Api.Signature.delete({id : signature.id }).$promise.then(callback);
					    	}
					    },
			      // create menbership 
			      		createMenbership : function(group, user ,callback){//admin is a user object
			        // encryptedKGV is the  encrpyted KGV from  administrator
					        var menbership= new Api.Menbership();
					        if(menbership.passphrase=window.prompt("passphrase :")){ 
						        menbership.userId = user.id;
						        menbership.groupId = group.id;
						        menbership.encryptedKGV=group.KGV;
						        menbership.menberPublicKey= user.publicKey;
						        var today = new Date();   
						        menbership.admissionDate = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
						        menbership.$save().then(callback);
						    }
					    },
				       //delete menbership
				       	deleteMenbership : function(menbership, callback){
				       		if(window.confirm("sicher ?")){
				       			Api.Menbership.delete({id : menbership.id }).$promise.then(callback);
				       		}
				       	},
			      //create group
			      		createGroup  : function(groupName, admin, callback){ //the admin is a user object
				      		var group = new Api.Group();
					      	group.name=groupName;
					        group.KGV ="KGV"  // will be set in local server
					        group.adminId=admin.id ;
					        var today = new Date();
					        group.creationDate = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
					        group.$save().then(callback) ;					  
			          	},
					      // delete group
					    deleteGroup  : function(group, callback){
					    	if(window.confirm("sicher ?")){
					      		 Api.Group.delete({id : group.id}).$promise.then(callback);
					      	}
					    },
			      //add document
			      		createDocument : function(file , owner, callback){
						         // file is a  object of the library ng-file_upload
						        //var  uploadedFile =  $scope.files[0]; // files  always  a Array 
						    var  document =  new Api.Document();
							document.path = "/path/"+file.name;
							document.name = file.name; 
							document.ownerId = owner.id ; 
							document.symKey = "symkey"; // wird in local server generate 
							document.hashcode = "hashcode"; // wird in local server generate 
							var today = new Date();
							document.uploadDate = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
							document.$save().then(callback);

			    		} ,
			      //delete deocument
					    deleteDocument : function(document,callback){
					    	if(window.confirm("sicher ?")){
					      		Api.Document.delete({id : document.id}).$promise.then(callback);
					      	}
					    },
			      // create shared document
			      		createSharedDocument :  function(document, menbership, callback){
			            // the user is here the menber , who want to share the document in a group 
			            // all infos about the document are save in menbership
					        var sharedDoc=new Api.SharedDocument(); 
					        if(sharedDoc.passphrase=window.prompt("passphrase :")){ 
						        sharedDoc.documentId = document.id ;
						        sharedDoc.groupId = menbership.group.id ; 
						        //sharedDoc.encryptedSymKey=document.symKey;
						        sharedDoc.ownerId = menbership.user.id  ;
						        sharedDoc.docEncryptedSymKey=document.symKey;
						        sharedDoc.menberEncryptedKGV=menbership.encryptedKGV;
						        //sharedDoc.kGV=menbership.encryptedKGV; // the current user KGV for this group to encrypt the document Symkey
						        var today = new Date();
						        sharedDoc.sharingDate= today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
						        sharedDoc.$save().then(callback);
						    }

			        	},
			        // authrity 
			            authority : function(callback){
			            	return Api.Authority(callback);
			            },
			       // login logout 
				        login : function(credentials, callback){
				        	return Api.login(credentials).then(callback);
				        },
				        logout : function( callback){
				        	return Api.logout.then(callback);
				        },



			    };

			    }]);

				/*
 					Http Error Interceptor
				*/
			    servicesModule.factory('HttpErrorInterceptor',['Session', '$location','$q', function(Session, $location, $q){
			    		return {
			    			'responseError' : function(rejection){
			    			 	if(rejection.status== 401){
			    			 	   Session.user= null; 
			    			 	   Session.token=null; 
			    			 	   $location.path('/login');
			    			 	   console.log('unauthentifiziert')
			    			 	}
			    			 	// show  error 
			    			 	if(rejection.data && rejection.data.error ){
			    			 	   console.log(rejection.data.error)
			    			 	}else{
			    			 	   
			    			 	   console.log('Error')
			    			 	};
			    			 	return $q.reject(rejection);
			    			}
			    		}
			    }]);
			    //add to provider
			    servicesModule.config(['$httpProvider', function($httpProvider) {  
    				$httpProvider.interceptors.push('HttpErrorInterceptor');
				}]);
			    //$httpProvider.interceptors.push('HttpErrorInterceptor');