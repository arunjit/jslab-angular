'use strict';

angular.module('main').controller('DragDropCtrl',
    function($scope, $http) {
      var list = $scope.list = [];
      $scope.search = '';

      // Type enum
      var DOCUMENT = 'document', ACCESSORY = 'accessory';

      // Product methods

      var isSelected = $scope.isSelected = function(product) {
        return !!product.selected;
      };

      var isDocument = $scope.isDocument = function(product) {
        return product.collection === DOCUMENT;
      };

      var isAccessory = $scope.isAccessory = function(product) {
        return product.collection === ACCESSORY;
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
        return list.filter(isDocument);
      };

      var getAccessories = function() {
        return list.filter(isAccessory);
      };

      $scope.getSelectedDocuments = function() {
        return getDocuments().filter(isSelected);
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
        }
      };

      $scope.onDropAccessory = function(id) {
        var product = get(id);
        if (product) {
          product.collection = ACCESSORY;
          select(product);
        }
      };

      // Buttons

      $scope.clearDocuments = function() {
        getDocuments().forEach(deselect);
      };

      $scope.clearAccessories = function() {
        getAccessories().forEach(deselect);
      };

      $scope.clearAll = function() {
        list.forEach(deselect);
      };

      // Oof! Severly needs to be optimized.

      $scope.hasDocuments = function() {
        return !!$scope.getSelectedDocuments().length;
      };

      $scope.hasAccessories = function() {
        return !!$scope.getSelectedAccessories().length;
      };

      // Load data
      $http.get('data/products.json').success(function(d) {
        list.push.apply(list, d);
      });
    }
);
