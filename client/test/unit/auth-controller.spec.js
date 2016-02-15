'use strict';

describe('Controller: AuthController', function() {

  var $scope;
  var AuthService;
  var $rootScope;
  var $controller;
  var AuthController;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    AuthService = $injector.get('AuthService');

    AuthController = $controller('AuthController', {
      $scope: $scope,
      AuthService: AuthService
    });

  }));

  afterEach(function () {
    //any after each goes here
  });

  describe('vm.email', function () {
    it('should expose action route to the view', function() {
      expect(AuthController.email).toBeDefined();
      expect(AuthController.action).toBeDefined();

    });
  });
});
