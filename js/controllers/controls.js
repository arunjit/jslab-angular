'use strict';

angular.module('main').
controller('ControlsCtrl', function($scope) {

  this.values = ['Zero', 'One', 'Two', 'Three'];

  // Till controllerAs syntax is stable.
  $scope.ctrl = this;
});
