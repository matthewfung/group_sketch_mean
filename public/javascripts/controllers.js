myApp.controller('MenuController', function($scope, $window, UserFactory){
            $scope.addUser = function() {
                UserFactory.addNewUser($scope.new_user, function(output){
                  console.log(output);
                });
            }
            $scope.loginUser = function(){
              UserFactory.loginUser($scope.login, function(output){
                  output = output.substring(1,output.length-2);
                  $window.location.href = '/room/'+ output + '/';
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