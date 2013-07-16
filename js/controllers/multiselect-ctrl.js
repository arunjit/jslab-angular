angular.module('main').controller('MultiSelectCtrl',
    function($scope, $http) {
      var list = $scope.list = [];
      $scope.model = {
        filter: ''
      };

      $http.get('data/products.json').success(function(d) {
        list.push.apply(list, d);
      });

      var isSelected = $scope.isSelected = function(product) {
        return !!product.selected;
      };

      $scope.countSelected = function() {
        return list.filter(isSelected).length;
      };

      $scope.toggle = function(product) {
        product.selected = !product.selected;
      };

      var deselect = $scope.deselect = function(product) {
        product.selected = false;
      };

      $scope.clear = function() {
        list.forEach(deselect);
      };

      $scope.save = function() {
        var selections = list.filter(isSelected);
        console.log("SAVE:", selections);
      };
    }
);
