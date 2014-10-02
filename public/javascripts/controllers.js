myApp.controller('MenuController', function($scope, $window, UserFactory){
      $scope.addUser = function() {
          UserFactory.addNewUser($scope.new_user, function(output){
              console.log(output);
          });
      }
      $scope.loginUser = function(){
          UserFactory.loginUser($scope.login, function(output){
              output = output.substring(1,output.length-1);
                $window.location.href = '/room/'+ output + '/';
            });
        }
});
myApp.controller('RoomController', function($scope, UserFactory, $window){
     $scope.userName = $window.name;
     $scope.messages = [];
     ioo.on("user_joined", function(data){
       console.log("Got a new user", data.name);
       UserFactory.getUsers($window.room_id, function(users){
        console.log("Controller", users);
         $scope.clients = users;
      });

     });

    ioo.emit('draw');
    ioo.on('clientDraw', function(options){
      var circle = new Circle(options.x-10, options.y-105, options.size, true, counter);
      counter = circle.createCircle2(options.color.red, options.color.green, options.color.blue);
      circle.updateCircle();
    });
    ioo.on('delete_user', function(name){
      console.log("Splicing", name, $scope.clients);
       var i = $scope.clients.indexOf(name);
       $scope.clients.splice(i, 1);
       $scope.$apply();
    });
    ioo.on('newMessage', function(msg){
      console.log(msg);
       $scope.messages.push(msg);
       $scope.$apply();
    });

     $scope.sendMessage = function(){
       ioo.emit("message", $scope.typed, $window.name);
     }
     $scope.changeColor = function(r,g,b){
          color.red = r;
          color.green = g;
          color.blue = b;
      }
      $scope.changeSize = function(s){
          size = s;
      }
});