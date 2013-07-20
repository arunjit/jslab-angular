'use strict';

angular.module('main').controller('MultiSelectCtrl',
    function($scope, $http) {
      this.list = [];
      this.search = '';

      this.isSelected = function(product) {
        return !!product && !!product.selected;
      };

      this.countSelected = function() {
        return this.list.filter(this.isSelected).length;
      };

      this.toggle = function(product) {
        if (!product) return;
        product.selected = !product.selected;
      };

      this.deselect = function(product) {
        if (!product) return;
        product.selected = false;
      };

      this.clear = function() {
        this.list.forEach(this.deselect);
      };

      this.save = function() {
        var selections = this.list.filter(this.isSelected);
        console.log("SAVE:", selections);
      };

      // Till controllerAs syntax is stable.
      $scope.ctrl = this;

      // Load data
      var self = this;
      $http.get('data/products.json').success(function(d) {
        self.list.push.apply(self.list, d);
      });
    }
);
