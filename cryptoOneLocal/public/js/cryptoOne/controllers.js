    var controllersModule = angular.module('controllersModule', ['servicesModule','ngFileUpload','filtersModule']);
    
    /*
       Friends Controller
    */

    controllersModule.controller ('FriendsCtrl',[ '$scope','Remote','Session','$location','ROLES',function($scope, Remote ,Session, $location,ROLES){
            $scope.untrustedUsers=[];
            $scope.trustedUsers=[];
            $scope.mySignatures=[];
           // my signatures 
            Remote.listOfUserSignatures(Session.user.id , function(signs, rep){
               $scope.mySignatures =signs;        // the  signatures contains the users informations   
               // do list  of  untrusted users
              Remote.listAllUsers(function(users, rep){
                $scope.untrustedUsers= users.filter(function(user){
                  //remove current user  auhtority and admin 
                  if(user.id == Session.user.id || user.roles == ROLES.AUTHORITY || user.roles == ROLES.ADMIN || !user.isInitialized ){
                    return false 
                  }else{
                    return true 
                  }
                  console.log($scope.untrustedUsers);

                }); // all users
               // filter   users 'from  trusted   users to obtain the untrusted users'
                $scope.mySignatures.forEach(function (signature){
                  $scope.untrustedUsers=$scope.untrustedUsers.filter(function( untrustedUser){
                    return untrustedUser.id != signature.user.id ;
                  });
                })
                $scope.mySignatures= $scope.mySignatures.filter($scope.filterCurrentUserAndAuthoritySignature)
              });                         
            }) ;
           
           //  show user 
            $scope.showUser = function (user ){  //  the signature of the public key from the user to show 
              $location.path('/show-user/'+ user.id);
            };
      }]);

    /*
       User Show Controller
    */

    controllersModule.controller ('ShowUserCtrl',[ '$scope','Remote','Session','$routeParams','$location','Trust',function($scope,Remote, Session,$routeParams,$location,Trust){
          var userId  =$routeParams.id ;
          //var signatureId = $routeParams.signId ;
          $scope.mySignatures=[];
          $scope.otherUserSignatures=[];
          $scope.commonTrustedUsers =[];
          $scope.signatureFromCurrentUser;
          // get showed users 
          Remote.getUser( userId, function(user){
            $scope.showedUser  = user ; 
               //COMMON users between the showed user und the current logged user
              // list my signature
                Remote.listOfUserSignatures(Session.user.id, function(signs, rep){
                  $scope.mySignatures= signs;
                  // search the signature of the current showed user
                  for(var i =0 ;i< $scope.mySignatures.length; i++){
                    if($scope.mySignatures[i].user.id == userId){
                      $scope.signatureFromCurrentUser= $scope.mySignatures[i];
                      break ;
                    }
                  }
                  // list of trusted users
                  $scope.trustedUsers = [];
                  for(var i =0; i < $scope.mySignatures.length ; i++){
                    $scope.trustedUsers.push($scope.mySignatures[i].user);
                  }

                  //common trusted users( my trusted Users, who trust the new users)
                  /*
                    $scope.mySignatures.forEach(function(signature){
                      Trust.trust(signature.user.id, $scope.showedUser.id, function(result){
                        if(result.data.isTrusted && signature.user.id !=$scope.showedUser.id ){// 
                          $scope.commonTrustedUsers.push(signature.user)
                        }
                      });
                    });                
                 //} */
                  
                });
                /// list of trusting users
                $scope.trustingUsers=[];
                Remote.listOfTrustingUsers (userId , function(users, rep ){
                  $scope.trustingUsers=users;
                   // list of my trusted users, who trusts the showed user 
                   $scope.communTrustingUsers=[];
                      for(var i =0 ; i<$scope.trustingUsers.length  ;i++){
                        for (var e =0; e < $scope.mySignatures.length ; e++  ){
                           if ($scope.mySignatures[e].user.id == $scope.trustingUsers[i].id){
                             $scope.communTrustingUsers.push ($scope.trustingUsers[i]);
                           }
                        };
                      }
                   console.log($scope.mySignatures);

                });

          });
        

        // add signature (sign)  
          $scope.sign = function (){ 
            Remote.createSignature(Session.user, $scope.showedUser ,function (signature, rep){
              console.log ("new Signature  Success");
              $location.path('/friends');
            });
          }
        // revoke signature 
          $scope.revoke = function(){
            Remote.deleteSignature($scope.signatureFromCurrentUser , function (rep){
              console.log ("the signature was successfull deleted !");
              $location.path('/friends');
            });
          };
    }]);

    /*
      list all users  in admin panel 

    */

    controllersModule.controller ('UsersCtrl',[ '$scope', 'Remote',function($scope, Remote){
          Remote.listAllUsers(function(users, rep){
            $scope.users= users; // all users
          });
         // delete user
          $scope.deleteUser= function(user){
            Remote.deleteUser(user.id, function(rep){
              console.log("user deleted");
              $scope.removeFromView($scope.users, user);
            })
          };
    }]);

    /*
         New user   controller : to  create a new user in the Admin Panel
    */

    controllersModule.controller ('NewUserCtrl',[ '$scope','Remote','ROLES','$location',function($scope, Remote,ROLES,$location){
          $scope.user = {};
          // create new user 
          $scope.isAuthority=false;
          $scope.roles=ROLES
          $scope.create = function(user){
            // check if authority and set isinitialized on true
            if($scope.isAuthority){// the Authority  dont need any initialisation anymore
              $scope.user.isInitialized=true;
              $scope.user.isActiv=true ; 
              $scope.user.roles=ROLES.AUTHORITY;
            }
            // do request to create a new user 
            Remote.createUser(user,function (u, rep){
              console.log(" the new users was successfull created");
              $location.path('/users');
            });
          }
          // reset user formt
          $scope.reset= function(){
          	$scope.user= new  Api.User();
          } 

        }
    ]);

    /*

         List of groups
    */

    controllersModule.controller ('GroupsCtrl',[ '$scope','Remote', 'Session', '$location',function($scope, Remote,Session,$location){
          // list my groups
          $scope.myMenberships=[];
          $scope.myGroups=[]; 
          // list get list from users 
          Remote.listOfUserGroups(Session.user.id,function(groups){
              $scope.myGroups=groups;

          });
          //add a new  group
          $scope.groupName ;
            $scope.create= function(){
              Remote.createGroup( $scope.groupName,Session.user, function (group, rep){
                // create the admin menbership
                Remote.createMenbership(group,Session.user, function( menbership, rep2){
                  if (!menbership.group){ menbership.group= group}
                  if(!menbership.user){ menbership.user = Session.user}
                  // add group to my group 
                  $scope.myGroups.push(group);
                  // show  alert by successful  group creating
                  console.log("the new group  was successfull added !");
                  // reset group Name 
                  $scope.groupName=null 
                });
              });
            }
            // delete a group
            $scope.delete  = function(group){
              Remote.deleteGroup(group,function(rep ){ //delete the group 
                console.log (" group was successfull deleted");
                // remove from  view 
                $scope.removeFromView($scope.myGroups, group );
              });   
            }
            //show  group 
            $scope.showGroup= function (group){
              $location.path("/show-group/"+ group.id);
            }
    }]);

    /*
      Show Group    

    */

    controllersModule.controller ('ShowGroupCtrl', [ '$scope', 'Remote', '$routeParams', 'Session','Trust',function($scope, Remote, $routeParams, Session,Trust ){
          	//$scope.group = { name : "mygroup "};
            var groupId = $routeParams.id ;
            $scope.myMenbership;// here will be save the KGV to share document in this group
            // load group
            $scope.group; 
            Remote.getGroup(groupId , function(group, rep){
              $scope.group= group ;
            });
        // list menbers of the groups
          	$scope.menberships=[] ;
            $scope.trustedUsers= [] ;
            $scope.mySignatures=[];
          	Remote.listOfGroupMenberships( groupId , function ( menberships, rep){
                $scope.menberships = menberships; //  the  users  informations are located in   menberships 4
                //search my menbership  for the currengroup
                for(var i =0; $scope.menberships.length; i++){
                   if($scope.menberships[i].user.id == Session.user.id){
                     $scope.myMenbership = $scope.menberships[i]; 
                     break ;
                   }
                }
                // list of all trusted users for option select to add new Menber
        // get List of trusted user
              Remote.listOfUserSignatures(Session.user.id , function( signatures){
                $scope.mySignatures = signatures;
                  signatures.forEach(function(signature){
                    $scope.trustedUsers.push(signature.user);
                  });
          //remove trusted users, who are already  menber in the group 
                $scope.menberships.forEach(function(menbership){
                  for(var i=0; i< $scope.trustedUsers.length ; i++){
                    if(menbership.user.id == $scope.trustedUsers[i].id){
                      $scope.trustedUsers.splice(i, 1);
                    }
                  };
                });
                 
              });
            });
        // list shared file of the group 
          	$scope.sharedDocuments=[];
             $scope.docs=[]; // list of documents to share
          	Remote.listOfGroupSharedDocuments(groupId,function (sharedDocuments, rep){
          		$scope.sharedDocuments= sharedDocuments; // the shared documents are located in shared documents
                // list meine documents to shared 
              Remote.listOfUserDocuments(Session.user.id , function( docs){
                $scope.docs= docs;
                //remove the docs, which are already  shared  in this group 
                $scope.sharedDocuments.forEach(function(sharedDoc){
                  for(var i=0; i< $scope.docs.length ; i++){
                    if(sharedDoc.document.id  == $scope.docs[i].id){
                      $scope.docs.splice(i, 1);
                    }
                  };
                });
              });
          	}) 
     
       // add new menber
            $scope.menber ; // menber is a user Object
            $scope.addMenber= function(){
              //var user= $scope.findDataByIdInDataset($scope.trustedUsers, $scope.MenberId);
              // check if all users in this group  trusts the  new menberS 
              var numberOfTrustingsMenbers=0 //  number of menbers, who trusts the new user
              //var passphrase; 
              for(var i =0;i < $scope.menberships.length ; i++){
                  Trust.trust($scope.menberships[i].user.id, $scope.menber.id,function(result){ // result content true or false
                      if(result.data.isTrusted ){// if trusts 
                         numberOfTrustingsMenbers ++; 
                       }else{
                         console.log("there is some users, who dont trusts the new Menber");
                         //break;  // a  user dont trust the new user
                       }
                       // check if the number of users, who trusts the new user equals the number of menbers in this group
                       if(numberOfTrustingsMenbers== $scope.menberships.length){
                           // add the new  menbers 
                           Remote.createMenbership($scope.group,$scope.menber , function(menbership, reponse){
                              // menber is a user object 
                              // alert successful adding of newmwnber7
                              console.log("new Menber successfull added !");
                              $scope.menberships.push(menbership);
                              $scope.removeFromView($scope.trustedUsers, $scope.menber );
                              // reset the  new menber object 
                              $scope.menber=null;
                            });
                       }
                       

                  }); 
                  
              };
              
            }
            /// list of  my trusted users, who trusts the new Menber candidat in group
                $scope.trustingUsers=[];
                $scope.updateTrustingUser= function(){
                  if ($scope.menber.id){
                    Remote.listOfTrustingUsers ($scope.menber.id , function(users, rep ){
                      $scope.trustingUsers=users;
                       // list of my trusted users, who trusts the showed user 
                       $scope.communTrustingUsers=[];
                          for(var i =0 ; i<$scope.trustingUsers.length  ;i++){
                            for (var e =0; e < $scope.mySignatures.length ; e++  ){
                               if ($scope.mySignatures[e].user.id == $scope.trustingUsers[i].id){
                                 $scope.communTrustingUsers.push ($scope.trustingUsers[i]);
                               }
                            };
                          }
                       console.log($scope.mySignatures);

                    });
                  }
                }
    	  // delete menber 
    	      $scope.removeMenber = function (menbership){
              Remote.deleteMenbership(menbership, function(){
                console.log("the menber was successfull removed")
                $scope.removeFromView($scope.menberships , menbership);// remove from the list of menber in group
                $scope.trustedUsers.push(menbership.user);//add the option in  select option
              });
            };

    	  // delete shared File 
    	      $scope.removeSharedDoc = function(sharedDoc){
              Remote.deleteSharedDocument(sharedDoc, function(rep){
                // remove from list of shared document 
                // add in list of select option for shared document 
                console.log("sharedDoc  war successfull deleted ")
                $scope.removeFromView($scope.sharedDocuments, sharedDoc);
                $scope.docs.push(sharedDoc.document);
              });
            }
       //add shared Document 
            $scope.doc , 
            $scope.addSharedDoc= function(){
              Remote.createSharedDocument( $scope.doc , $scope.myMenbership,function(sharedDoc, reponse){
              // alert successful adding of newmwnber7
                console.log("new shared successfull added !");
                $scope.sharedDocuments.push(sharedDoc);
                $scope.removeFromView($scope.docs, $scope.doc );
              // reset the  new document object 
                $scope.doc = null;
              })
            }
    	// link to download shared document
    	      $scope.download = function (shared){

    	      }

    }]);


    /*
               Documents Controller
    */

    controllersModule.controller ('DocumentsCtrl',[ '$scope','Remote','Session','Upload','$location',function($scope, Remote, Session, Upload,$location){
    	   // list of  document 
          	$scope.documents; 
            $scope.myDocuments=[];
            Remote.listOfUserDocuments( Session.user.id, function ( documents, rep){
              $scope.myDocuments=documents;
            });
    	   // new document
          	$scope.deleteDoc = function (doc){
              Remote.deleteDocument(doc, function( rep ){
                // remove of list from doc
                $scope.removeFromView($scope.myDocuments, doc);
                console.log("successfull deleted!");
              });
            }
          // show Document
          	$scope.showDoc = function( doc){
              $location.path ('/show-document/'+ doc.id);
            }
          // download document
          	$scope.download  = function(doc){
              Api.Download.then(function (){
              });
            }
    	// upload new doc 
          	$scope.files ; // is a file object from the library  ng file upload 
          	$scope.upload =function(){
              Remote.createDocument($scope.files[0], Session.user  , function(doc, rep){
                //add document to list of doc 
                $scope.myDocuments.push(doc);
                console.log("alert successfull document"); 
                //$scope.files[0]=null; 
              });
            }

    }]);

    /*
       Show Document Controller 
    */

    controllersModule.controller ('ShowDocumentCtrl',[ '$scope','Remote','Session','$routeParams',function($scope, Remote ,Session, $routeParams){
          	// list of shared document
            var documentId = $routeParams.id ;
            $scope.sharedDocuments=[];
            // current document
            Remote.getDocument(documentId, function(doc , rep){
              $scope.currendDocument = doc; 
            });
            // list shared 'documents
            Remote.listOfDocumentSharedDocuments(documentId , function(sharedDocs, rep){
              $scope.sharedDocuments =sharedDocs;
            });
            // list of group , where to share the document
            $scope.myMenberships=[]; 
            Remote.listOfUserMenberships(Session.user.id ,function(menberships, rep){
              $scope.myMenberships=menberships; // group infos are in  menberships
            });
      // delete  shared document 
            $scope.removeSharedDoc = function (sharedDoc){
              Remote.deleteSharedDocument(sharedDoc, function(rep){
                // remove from list 
                // add in list from doc to shared 
                console.log ("delete successfull sharedDocument"); 
                $scope.removeFromView($scope.sharedDocuments, sharedDoc); // remove from view
                console.log($scope.allMenberships);
              })
            }
      //add shared Document 
            $scope.menbership ; 
            $scope.addSharedDoc= function(){
              if(! $scope.isShared($scope.menbership)){
                Remote.createSharedDocument($scope.currendDocument,$scope.menbership , function(sharedDoc, rep){
                  console.log ("shared docuement successfull uploaded");
                  console.log ( sharedDoc );
                  $scope.sharedDocuments.push(sharedDoc); // add in view
                  //$scope.removeFromView($scope.myMenberships, $scope.menbership)// remove from options select
                  $scope.menbership=null ; 
                });
              }else{
                console.log("the document is already shared in this group");
              }
            };
        // check if  the document is already in a  group  shared
            $scope.isShared=function(menbership){ // the group are already in menbership contained
              for(var i=0; i<$scope.sharedDocuments.length;i++ ){
                if ($scope.sharedDocuments[i].group.id == menbership.group.id ){
                  return true ;
                  break;
                }
              }
              return false ;
            } 
    }]);

    /*
        My Account Controller 
    */

    controllersModule.controller('MyAccountCtrl', ['$scope','Session','Remote','$location',function($scope,Session,Remote,$location){
            $scope.user = Session.user ;
           
            $scope.updateUser=function (user){
               //remove passphrase and password confirmation 
              delete $scope.user.passphraseConfirmation
              delete $scope.user.passwordConfirmation
              Remote.updateUser($scope.user, function(rep){
                console.log(" It was successfull uploaded!") ;
                $location.path("/friends")
              });
            };
    }])

    /*
        init user Account by the first  loging
    */


    controllersModule.controller('AccountInitializationCtrl',['$scope','Session','Remote','$location','$rootScope', function($scope,Session, Remote,$location,$rootScope){
            $scope.user=Session.user;
            $scope.initAccount= function(user){
              //delete passphrase confiramtion and password confirmation
              delete user.passphraseConfirmation
              delete user.passwordConfirmation
              // send the user object  update with PUT
              var passphrase= user.passphrase
              Remote.updateUser( user, function(response){
                //set the public key and the secret key id
                console.log(response) 
                Session.user.publicKey= response.publicKey
                Session.user.secretKeyId= response.secretKeyId;
                //sign own publicKey
                Remote.createSignature(Session.user, Session.user, function(signature){
                   // sign Auhtoriy publicKey
                    console.log(" the own  public was  successfull  signed! ");
                  Remote.authority(function(data){
                    var authority= data.data;
                    console.log(authority);
                    Remote.createSignature(Session.user, authority,function(signatureAuthority){
                      console.log("The authority public key  was  successfull  signed! ");
                      console.log("initialization was successfull !");
                      $rootScope.logout();
                      $location.path("/login");
                    },passphrase)
                  })
                },passphrase)
              },passphrase);   
            }
       }]);
    /*
       login  
    */
    controllersModule.controller ('LoginCtrl',[ '$scope','$rootScope','Session','Remote','$location','$http','Trust','ROLES',function($scope,$rootScope, Session, Remote,$location,$http, Trust,ROLES){
            $scope.credentials ={};
            $scope.login= function(credentials){
              Remote.login(credentials,function( rep, headers){
                Session.token= rep.data.token ;
                Session.user = rep.data.user ;
                $rootScope.currentUser=Session.user;
                // set token in headers for the future request 
                $http.defaults.headers.common['Access-Token'] =Session.token ;
                // validate the user signature
                  if(Session.user.roles == ROLES.ADMIN){
                      $location.path('/users');
                  }else{// the admin has neither keypair nor singatures
                      
                    //check if user is initialized
                      if (!Session.user.isInitialized){
                        $location.path('/accountinit');
                      }else{
                        Trust.validateSignatures(Session.user.id, function(res){
                            if(res.data){// no problem
                              console.log("signatures correct public key ")
                            }else{
                              console.log(res)
                            }
                        })

                        $scope.addAlert("successful logged !");
                        $location.path('/friends');
                      }
                  } 
              });
            }
    }]);
    /*
            // get

    */
    controllersModule.controller('GlobalCtrl' ,['$scope','$rootScope','Session','ROLES','$location', function($scope,$rootScope ,Session, ROLES,$location){
          // helper
          // logout 
            $rootScope.logout =function(){
                Session.user=null
                Session.token=null
                $rootScope.currentUser=null
                $location.path('/login')
            }


            //helper
            $rootScope.currentUser = Session.user;
            $rootScope.roles = ROLES;
            $scope.removeFromView  = function (dataset , data){
              for( var i =0 ;i< dataset.length ; i++){
                if ( dataset[i].id == data.id){
                  dataset.splice(i, 1);
                  break ;
                }
              }
            }       
          //
          $scope.findDataByIdInDataset =  function (dataset, id ){//dataset has to be a Array
              for (var i =0 ; dataset.length;i++ ){
                if(dataset[i].id == id){
                  return  dataset[i]; 
                  break ; 
                }
               return null; 
              }
          }
          // filters  
          $scope.filterCurrentUserAndAuthoritySignature= function(signature){
              if(signature.user.id == Session.user.id || signature.user.roles == ROLES.AUTHORITY  ||  signature.user.roles == ROLES.ADMIN){
                return false 
              }else{
                return true ;
              }
          }
          //
          //alert Message
          $scope.alerts = [];
          $scope.addAlert = function(msg, type ) {
            $scope.alerts.push({msg: msg , type : 'danger'});
          };
          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };
          

    }]); 
    // constants
    controllersModule.constant('ROLES', {
          ADMIN : "Admin",
          AUTHORITY : "Authority",
          USER: "User"
    });

