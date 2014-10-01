 myApp.factory('UserFactory', function($http){
          var Users = [];
          var factory = {};
          factory.loginUser = function(info, callback){
            $http.post('/users/login', info).success(function(output){
              callback(output);
            });
          }
          factory.addNewUser = function(info, callback){
            $http.post('/users/new', info).success(function(output){
                callback(output);
            });
          }
          return factory;
        });