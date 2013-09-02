angular.module('main', []).config(
    function($routeProvider) {
      $routeProvider.
          when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
          }).
          when('/multiselect', {
            templateUrl: 'views/multiselect.html',
            controller: 'MultiSelectCtrl',
            resolve: {
              productList: function(productService) {
                return productService.list();
              }
            }
          }).
          when('/dragdrop', {
            templateUrl: 'views/dragdrop.html',
            controller: 'DragDropCtrl',
            resolve: {
              productList: function(productService) {
                return productService.list();
              }
            }
          }).
          otherwise({redirectTo: '/'});
    }
);
