angular.module('main').controller('MultiSelectCtrl',
    function($scope, $http) {
      var list = $scope.list = [];

      $http.get('data/products.json').success(function(d) {
        $scope.list = d;
      });

      $scope.isSelected = function(product) {
        return !!product.selected;
      };

      $scope.toggle = function(product) {
        product.selected = !product.selected;
      };

      $scope.deselect = function(product) {
        product.selected = false;
      };

      $scope.saveSelections = function() {
        var selections = list.filter(isSelected);
        console.log("SAVE:", selections);
      };
    }
);
