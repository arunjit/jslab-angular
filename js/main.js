angular.module('main', []).config(
    function($routeProvider) {
      $routeProvider.
          when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
          }).
          when('/multiselect', {
            templateUrl: 'views/multiselect.html',
            controller: 'MultiSelectCtrl'
          }).
          when('/dragdrop', {
            templateUrl: 'views/dragdrop.html',
            controller: 'DragDropCtrl'
          }).
          otherwise({redirectTo: '/'});
    }
);
