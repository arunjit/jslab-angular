'use strict';

describe('aj-dragdrop', function() {

  beforeEach(module('main'));

  var element, scope;

  describe('aj-drag', function() {
    beforeEach(inject(function($compile, $rootScope) {
      element = angular.element('<div aj-drag="x"></div>');
      scope = $rootScope.$new();
      scope.x = 20;
      element = $compile(element)(scope);
      scope.$digest();
    }));

    it('should have been set up', function() {
      expect(element.attr('draggable')).toEqual('true');
    });

    // Ignore till event on triggerHandler can be fixed.
    xit('should update classes on dragstart', function() {
      element.triggerHandler('dragstart');
      expect(element.hasClass('dragstart')).toBe(true);
    });
  });
});
