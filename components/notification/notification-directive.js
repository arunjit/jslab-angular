/**
 * Notification service and directive.
 *
 * This is currently meant for a single notification bar only. Multiple use of
 * the directive would show the same message in multiple places.
 */

'use strict';

angular.module('jslab.notification').
directive('notificationBar', function(
    $rootScope, $timeout, showNotification, hideNotification) {
  var template =
      '<div class="notification-bar" ng-hide="hide" ng-init="hide=true">' +
      '  <div class="content" ng-class="{error:error}">' +
      '    <div class="message" ng-bind="message"></div>' +
      '    <div class="close" ng-show="dismissable" ng-click="close()"></div>' +
      '  </div>' +
      '</div>';

  var lastTimeout = null;
  var cancelTimeout = function() {
    if (lastTimeout) {
      $timeout.cancel(lastTimeout);
      lastTimeout = null;
    }
  };

  var hide = function(scope) {
    return function() {
      cancelTimeout();
      scope.message = '';
      scope.hide = true;
      scope.error = false;
      scope.dismissable = false;
    };
  };

  return {
    scope: {},
    restrict: 'AE',
    template: template,
    replace: true,
    // transclude: true,
    link: function(scope, element, attrs) {
      $rootScope.$on(showNotification, function(event, message, options) {
        scope.message = message;
        scope.hide = false;
        scope.error = !!options.error;
        scope.dismissable = !!options.dismissable;
        cancelTimeout();
        if (options.timeout) {
          lastTimeout = $timeout(hide(scope), options.timeout * 1000);
        }
      });
      $rootScope.$on(hideNotification, hide(scope));
      $rootScope.$on('$routeChangeSuccess', hide(scope));
      scope.close = hide(scope);
    }
  };
});
