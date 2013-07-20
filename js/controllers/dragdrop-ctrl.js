'use strict';

angular.module('main').controller('DragDropCtrl',
    function($scope, $http) {
      var items = $scope.items = [];
      var selected = $scope.selected = [];
      $scope.dropped = {};

      $http.get('data/products.json').success(function(d) {
        items.push.apply(items, d);
      });

      $scope.onDrop = function(item) {
        selected.push(item);
      };
    }
);
