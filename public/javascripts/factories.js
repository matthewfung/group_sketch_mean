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
          factory.newRoom = function(callback){
            $http.get('/room/create').success(function(output){
                callback(output);
            });
          }
          return factory;
});

myApp.factory('MyService', function(){
  return {
    name: ''
    ,
    update: function(name) {
      this.name = name;
    }
  };
});