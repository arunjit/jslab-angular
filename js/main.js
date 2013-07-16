angular.module('main', []).config(
    function($routeProvider) {
      $routeProvider.
          when('/', {templateUrl: 'views/home.html'}).
          when('/multiselect', {
            templateUrl: 'views/multiselect.html',
            controller: 'MultiSelectCtrl'
          }).
          otherwise({redirectTo: '/'});
    }
);
