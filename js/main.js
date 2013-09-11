angular.module('main', []).
config(function($routeProvider) {
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
      when('/controls', {
        templateUrl: 'views/controls.html',
        controller: 'ControlsCtrl'
      }).
      otherwise({redirectTo: '/'});
}).
run(function($rootScope, $document, notificationService) {
  $rootScope.$on('$routeChangeStart', function(event, current, next) {
    notificationService.show('Loading...');
  });
  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
    notificationService.hide();
  });
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    var message = 'Error loading route';
    if (rejection) {
      var message = 'Error: ' + rejection;
    }
    notificationService.show(message, {error: true});
  });
  // $document.bind('click', function(event) {
  //   $rootScope.$apply(function() {
  //     $rootScope.$emit('globalCloseAll');
  //   });
  // });
});
