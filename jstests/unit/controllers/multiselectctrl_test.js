'use strict';

describe('MultiSelectCtrl', function() {

  function getData() {
    return [{id: 1, name: 'One'}, {id: 2, name: 'Two'}, {id: 3, name: 'Three'}];
  }

  beforeEach(module('main'));

  var ctrl, scope;

  beforeEach(inject(function($rootScope, $controller, $http, $httpBackend) {
    $httpBackend.expectGET('data/products.json').respond(getData());

    scope = $rootScope.$new();
    ctrl = $controller('MultiSelectCtrl', {$scope: scope, $http: $http});

    $httpBackend.flush();
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('should load data', function() {
    expect(ctrl.list).toEqual(getData());
  });

  it('should have nothing selected yet', function() {
    expect(ctrl.countSelected()).toBe(0);
  });

  it('should return selection state', function() {
    expect(ctrl.isSelected(ctrl.list[0])).toBe(false);
    ctrl.list[0].selected = true;
    expect(ctrl.isSelected(ctrl.list[0])).toBe(true);

    expect(ctrl.isSelected(undefined)).toBe(false);
  });

  it('should toggle de/selecting a product', function() {
    ctrl.toggle(ctrl.list[0]);
    expect(ctrl.list[0].selected).toBe(true);
    ctrl.toggle(ctrl.list[0]);
    expect(ctrl.list[0].selected).toBe(false);
    ctrl.toggle(ctrl.list[0]);
    ctrl.toggle(ctrl.list[0]);
    ctrl.toggle(ctrl.list[0]);
    expect(ctrl.list[0].selected).toBe(true);
  });

  it('should deselect a product', function() {
    ctrl.deselect(ctrl.list[0]);
    expect(ctrl.list[0].selected).toBe(false);
  });

  it('should ignore toggling/deselecting undefined/null values', function() {
    ctrl.toggle(undefined);
    expect(ctrl.list).toEqual(getData());
    ctrl.toggle(null);
    expect(ctrl.list).toEqual(getData());

    ctrl.deselect(undefined);
    expect(ctrl.list).toEqual(getData());
    ctrl.deselect(null);
    expect(ctrl.list).toEqual(getData());
  });

  it('should clear a list', function() {
    ctrl.list[0].selected = true;
    expect(ctrl.countSelected()).toBe(1);
    ctrl.clear();
    expect(ctrl.countSelected()).toBe(0);
  });
});
