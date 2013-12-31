/**
 * Notification service and directive module.
 *
 * This is currently meant for a single notification bar only. Multiple use of
 * the directive would show the same message in multiple places.
 */

'use strict';

angular.module('jslab.notification', []).
constant('showNotification', Math.random().toString(36) + '-showNotification').
constant('hideNotification', Math.random().toString(36) + '-hideNotification');
