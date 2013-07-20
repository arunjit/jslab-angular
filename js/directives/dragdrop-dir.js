'use strict';

angular.module('main').directive('ajDrag',
    function($parse) {
      var dragstart = 'aj-dragstart';
      var dragend = 'aj-dragend';
      var classes = [dragstart, dragend].join(' ');

      function setupDrag(element) {
        element.attr('draggable', 'true');
        element.css({
          'cursor': 'move',
          'user-select': 'none',
          '-moz-user-select': 'none',
          '-webkit-user-select': 'none'
        });
      }

      function handleDragStart(e) {
        angular.element(e.target).removeClass(classes).addClass(dragstart);
        e.dataTransfer.effectAllowed = 'copy';
      }

      function handleDragEnd(e) {
        angular.element(e.target).removeClass(classes).addClass(dragend);
      }

      // Directive:
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var data = scope.$eval(attrs.ajDrag || attrs.ngModel);
          var dragFn = $parse(attrs.ajDragFn);

          setupDrag(element);

          // Start dragging
          element.bind('dragstart', function(e) {
            handleDragStart(e);

            e.dataTransfer.setData('text/json', angular.toJson(data));
            scope.$apply(function() {
              $parse('$data').assign(scope, data);
              $parse('$event').assign(scope, e);
              dragFn && dragFn(scope);
            });
          });

          // Stop dragging
          element.bind('dragend', handleDragEnd);
        }
      };
    }
).directive('ajDrop',
    function($parse) {
      var dragover = 'aj-dragover';
      var drop = 'aj-drop';
      var classes = [dragover, drop].join(' ');

      function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        angular.element(e.target).removeClass(classes).addClass(dragover);
      }

      function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        angular.element(e.target).removeClass(classes).addClass(drop);
        e.dataTransfer.dropEffect = 'copy';
      }

      // Directive:
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var dropModel = attrs.ajDrop || attrs.ngModel;
          var dropFn = $parse(attrs.ajDropFn);

          element.bind('dragover', handleDragOver);

          element.bind('drop', function(e) {
            handleDrop(e);
            var data = angular.fromJson(e.dataTransfer.getData('text/json'));
            scope.$apply(function() {
              dropModel && $parse(dropModel).assign(scope, data);
              $parse('$data').assign(scope, data);
              $parse('$event').assign(scope, e);
              dropFn && dropFn(scope);
            });
            return false;
          });
        }
      };
    }
);
