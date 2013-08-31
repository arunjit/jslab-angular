'use strict';

angular.module('main').controller('HomeCtrl',
    function($scope, notificationService) {

      this.notification = 'Something must\'ve happened..';
      this.options = {
        timeout: 0,
        error: false,
        dismissable: true
      };

      this.showNotification = function(message, options) {
        notificationService.show(message, options);
      };

      this.hideNotification = function() {
        notificationService.hide();
      };

      // Till controllerAs syntax is stable.
      $scope.ctrl = this;
    }
);
