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
      factory.getUsers = function(id, callback){
        console.log("get users");
        console.log("Factories", id);
        $http.get('/users/get/'+id).success(function(users){
          console.log("Successfully got users ",users );
          callback(users);
        })
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