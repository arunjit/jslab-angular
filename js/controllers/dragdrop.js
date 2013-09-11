'use strict';

angular.module('main').controller('DragDropCtrl',
    function($scope, $http, productList) {
      this.list = [];
      this.search = '';

      // Type enum
      var DOCUMENT = 'document', ACCESSORY = 'accessory';

      // Product methods

      this.isSelected = function(product) {
        return !!product.selected;
      };

      this.isDocument = function(product) {
        return product.collection === DOCUMENT;
      };

      this.isAccessory = function(product) {
        return product.collection === ACCESSORY;
      };

      this.select = function(product) {
        product.selected = true;
      }

      this.deselect = function(product) {
        product.selected = false;
      };

      // Simplified list methods. Need to be optimized for large N.

      this.get = function(id) {
        return this.list.filter(function(p) {return p.id === id})[0];
      }

      this.getDocuments = function() {
        return this.list.filter(this.isDocument);
      };

      this.getAccessories = function() {
        return this.list.filter(this.isAccessory);
      };

      this.getSelectedDocuments = function() {
        return this.getDocuments().filter(this.isSelected);
      };

      this.getSelectedAccessories = function() {
        return this.getAccessories().filter(this.isSelected);
      };

      // Drop handlers

      this.onDropDocument = function(id) {
        var product = this.get(id);
        if (product) {
          product.collection = DOCUMENT;
          this.select(product);
        }
      };

      this.onDropAccessory = function(id) {
        var product = this.get(id);
        if (product) {
          product.collection = ACCESSORY;
          this.select(product);
        }
      };

      // Buttons

      this.clearDocuments = function() {
        this.getDocuments().forEach(this.deselect);
      };

      this.clearAccessories = function() {
        this.getAccessories().forEach(this.deselect);
      };

      this.clearAll = function() {
        this.list.forEach(this.deselect);
      };

      // Oof! Severly needs to be optimized.

      this.hasDocuments = function() {
        return !!this.getSelectedDocuments().length;
      };

      this.hasAccessories = function() {
        return !!this.getSelectedAccessories().length;
      };

      this.hasSelection = function() {
        return this.list.filter(this.isSelected).length;
      };

      // Till controllerAs syntax is stable;
      $scope.ctrl = this;

      // Load data
      this.list.push.apply(this.list, productList);
    }
);
