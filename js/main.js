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
              productList: function(productListResolve) {
                return productListResolve();
              }
            }
          }).
          when('/dragdrop', {
            templateUrl: 'views/dragdrop.html',
            controller: 'DragDropCtrl',
            resolve: {
              productList: function(productListResolve) {
                return productListResolve();
              }
            }
          }).
          otherwise({redirectTo: '/'});
    }
);

angular.module('main').factory('productListResolve', function($q, $http) {
  return function() {
    var deferred = $q.defer();
    $http.get('data/products.json').success(function(d) {
      deferred.resolve(d);
    }).error(function() {
      deferred.reject('Error getting products');
    });
    return deferred.promise;
  };
});
