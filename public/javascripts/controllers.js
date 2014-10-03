myApp.controller('MenuController', function($scope, $location, $window, UserFactory, MyService){
    // $scope.name_room = true;
    $scope.regErr = '';
    $scope.logErr = '';
    $scope.logSuccess = '';
    $scope.regSuccess = '';
    $scope.output = '';
    $scope.currentName = MyService.name;
    $scope.logreg = false;
    $scope.addUser = function() {
        UserFactory.addNewUser($scope.new_user, function(output){
          if(output == 'success'){
            $scope.regErr = '';
            $scope.regSuccess = output;
          } else {
            $scope.regSuccess = '';
            console.log(output);
            $scope.regErr = output;
          }
        });
    }
    $scope.loginUser = function(){
      UserFactory.loginUser($scope.login, function(output){
          if(typeof output == 'string'){
            $scope.logSuccess = '';
            $scope.logErr = output;
          } else {
            $scope.logErr = '';
            $scope.logSuccess = 'success';
            $scope.currentName  = output.name;
            MyService.update(output.name);
            $location.path('/new');

          }
      });
    }
    $scope.createRoom = function(){
      UserFactory.roomName = $scope.room.name;
      UserFactory.newRoom($scope.room, function(output){
        $scope.output = output.substring(1,output.length-1);
        $window.location.href = '/room/'+ $scope.output + '/';
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
     $scope.cursorStyle = {};
     $scope.cursorName = "";

    ioo.emit('draw');
    ioo.on('clientDraw', function(options){
      var circle = new Circle(options.x-10, options.y-105, options.size, true, counter);
      counter = circle.createCircle2(options.color.red, options.color.green, options.color.blue);
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
    ioo.on('eraseAll', function(){
      var svg = document.getElementById('svg');
        while(svg.firstChild){
           svg.removeChild(svg.firstChild);
        }
    });
    ioo.on('mouseCursor', function(name, x,y, color){
       $scope.cursorStyle = {"top": (y+5)+'px', "left": (x+5)+'px'}; 
       $scope.cursorName = name;
       // console.log("MouseCursor", $scope.cursorStyle);
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
      $scope.eraseAll = function(){
        ioo.emit("eraseAll");
      }
      $scope.changeSize = function(s){
          size = s;
      }
});


