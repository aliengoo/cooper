describe('Login controller', function() {

  var $scope, $rootScope, login, $httpBackend, mockAuthService;

  beforeEach(module('app.login'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  beforeEach(inject(function(_$rootScope_, _$controller_){

    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    mockAuthService = {
      login : function(query) {}
    };

    login = _$controller_('Login', {
      authService : mockAuthService
    });
  }));

  it('should be defined', function() {
    expect(login).toBeDefined();
  });

  it('when vm.login called, login should be called', function () {


  });

});