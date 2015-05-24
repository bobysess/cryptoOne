var routesModule = angular.module('routesModule', ['ngRoute','controllersModule', 'servicesModule']);
routesModule.config(['$routeProvider',  function($routeProvider){
       $routeProvider
       //friends
       .when('/friends', {
       		templateUrl : 'partials/friends.html',
       		controller  : 'FriendsCtrl'
       })
       // users 
       .when('/show-user/:id', {
       		templateUrl : 'partials/users/show.html',
       		controller  : 'ShowUserCtrl'
       })
       .when('/users', {
       		templateUrl : 'partials/users/list.html',
       		controller  : 'UsersCtrl'
       })
       .when('/new-user', {
       		templateUrl : 'partials/users/new.html',
       		controller  : 'NewUserCtrl'
       })
       //documents
       .when('/documents', {
       		templateUrl : 'partials/documents/list.html',
       		controller  : 'DocumentsCtrl'
       })
       .when('/show-document/:id', {
       		templateUrl : 'partials/documents/show.html',
       		controller  : 'ShowDocumentCtrl'
       })
       //groups
       .when('/groups', {
       		templateUrl : 'partials/groups/list.html',
       		controller  : 'GroupsCtrl'
       })
       .when('/show-group/:id', {
       		templateUrl : '/partials/groups/show.html',
       		controller  : 'ShowGroupCtrl'
       })
       //session
       .when('/login', {
                     templateUrl : '/partials/login.html',
                     controller  : 'LoginCtrl'
       })
       .when('/account', {
                     templateUrl : '/partials/users/account.html',
                     controller  : 'MyAccountCtrl'
       })
       .when('/accountinit', {
                     templateUrl : '/partials/users/accountInit.html',
                     controller  : 'AccountInitializationCtrl'
       })
       .otherwise( { redirectTo: "/login" })

}])
// unlogged users have to be redirected  to the login page
.run(function(Session, $location, $rootScope) { 
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
       console.log(current);
       console.log(next);
       console.log(event); 
       console.log("route starts to change!")
      if (Session.user == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "partials/login.html") {
        } else {
          $location.path("/login");
        }
      }
    });
  });