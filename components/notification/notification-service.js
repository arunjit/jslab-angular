/**
 * Notification service and directive.
 *
 * This is currently meant for a single notification bar only. Multiple use of
 * the directive would show the same message in multiple places.
 */

'use strict';

angular.module('jslab.notification').
service('notificationService', function(
    $rootScope, showNotification, hideNotification) {

  /** @typedef {{timeout: number, error: boolean, dismissable: boolean}} */
  var NotificationOptions;

  /*
   * Default notification options.
   *
   *   timeout: timeout to hide notification(s) (seconds).
   *   error: Show notification as an error.
   *   dismissable: Can be dismissed by a user.
   *
   * @type {NotificationOptions}
   */
  var defaultOptions = {
    timeout: 0,
    error: false,
    dismissable: false
  };

  /**
   * Shows the notification(s).
   *
   * @param {string} message The message to show.
   * @param {NotificationOptions} options Notification options.
   */
  this.show = function(message, options) {
    options = angular.extend({}, defaultOptions, options);
    $rootScope.$emit(showNotification, message, options);
  };

  /** Hides the notification(s). */
  this.hide = function() {
    $rootScope.$emit(hideNotification);
  };
});
