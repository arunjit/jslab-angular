'use strict';

angular.module('main').controller('DragDropCtrl',
    function($scope, $http) {
      var list = $scope.list = [];
      $scope.search = '';
      $scope.hasDocuments = false;
      $scope.hasAccessories = false;

      // Type enum
      var DOCUMENT = 'document', ACCESSORY = 'accessory';

      // Product methods

      var isSelected = $scope.isSelected = function(product) {
        return !!product.selected;
      };

      var select = $scope.select = function(product) {
        product.selected = true;
      }

      var deselect = $scope.deselect = function(product) {
        product.selected = false;
      }

      // Simplified list methods. Need to be optimized for large N.

      var get = function(id) {
        return list.filter(function(p) {return p.id === id})[0];
      }

      var getDocuments = function() {
        return list.filter(function(p) {return p.collection === DOCUMENT});
      };

      $scope.getSelectedDocuments = function() {
        return getDocuments().filter(isSelected);
      };

      var getAccessories = function() {
        return list.filter(function(p) {return p.collection === ACCESSORY});
      };

      $scope.getSelectedAccessories = function() {
        return getAccessories().filter(isSelected);
      };

      // Drop handlers

      $scope.onDropDocument = function(id) {
        var product = get(id);
        if (product) {
          product.collection = DOCUMENT;
          select(product);
          $scope.hasDocuments = true;
        }
      };

      $scope.onDropAccessory = function(id) {
        var product = get(id);
        if (product) {
          product.collection = ACCESSORY;
          select(product);
          $scope.hasAccessories = true;
        }
      };

      // Buttons

      $scope.clearDocuments = function() {
        getDocuments().forEach(deselect);
        $scope.hasDocuments = false;
      };

      $scope.clearAccessories = function() {
        getAccessories().forEach(deselect);
        $scope.hasAccessories = false;
      };

      $scope.clearAll = function() {
        list.forEach(deselect);
        $scope.hasDocuments = false;
        $scope.hasAccessories = false;
      };

      // Init
      $http.get('data/products.json').success(function(d) {
        list.push.apply(list, d);
      });
    }
);
