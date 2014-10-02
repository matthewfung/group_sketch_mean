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
              UserFactory.newRoom(function(output){
                $scope.output = output.substring(1,output.length-2);
                $window.location.href = '/room/'+ $scope.output + '/';
              });  
            }
});

myApp.controller('RoomController', function($scope, UserFactory){
     $scope.changeColor = function(r,g,b){
        color.red = r;
        color.green = g;
        color.blue = b;
     }
     $scope.changeSize = function(s){
        size = s;
     }
});


