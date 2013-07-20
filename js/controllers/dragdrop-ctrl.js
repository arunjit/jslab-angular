'use strict';

angular.module('main').controller('DragDropCtrl',
    function($scope, $http) {
      var list = $scope.list = [];
      var documents = $scope.documents = [];
      var accessories = $scope.accessories = [];
      $scope.model = {
        filter: ''
      };

      $http.get('data/products.json').success(function(d) {
        list.push.apply(list, d);
      });

      $scope.onDropDocument = function(product) {
        documents.push(product);
      };

      $scope.onDropAccessory = function(product) {
        accessories.push(product);
      };

      $scope.clearDocuments = function() {
        documents = $scope.documents = [];
      };

      $scope.clearAccessories = function() {
        accessories = $scope.accessories = [];
      };

      $scope.clearAll = function() {
        documents = $scope.documents = [];
        accessories = $scope.accessories = [];
      };
    }
);
