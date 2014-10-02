var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl: 'partials/login.html'
      })
    .when('/new',
      {
        templateUrl: 'partials/newroom.html'
      })
    .otherwise({
      redirectTo: '/'
      });
});
