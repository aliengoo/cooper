describe('Login controller', function () {

  var $rootScope, login, mockAuthServiceSpy, mockLogSpy, $controller, $q, $log;

  beforeEach(module('app.login'));

  beforeEach(module(function ($provide) {

    mockAuthServiceSpy = jasmine.createSpyObj('mockAuthService', ["login"]);
    mockLogSpy = jasmine.createSpyObj('mockLog', ['error']);

    $provide.value('authService', mockAuthServiceSpy);
    $provide.value('$log', mockLogSpy);
  }));


  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $q = _$q_;
    login = $controller('Login');

  }));

  it('when vm.login called, login should be called', function () {
    mockAuthServiceSpy.login.and.returnValue($q.when({
      stuff : 'happened'
    }));

    login.login('username', 'password');

    $rootScope.$apply();

    expect(mockAuthServiceSpy.login).toHaveBeenCalledWith('username', 'password');
  });

  it('when credentials are incorrect, $log the error to the console', function () {
    var errorResponse = {
      error : 'error'
    };

    mockAuthServiceSpy.login.and.returnValue($q.reject(errorResponse));

    login.login('username', 'password');

    mockLogSpy.error.and.callFake(function() {
    });

    $rootScope.$apply();

    expect(mockLogSpy.error).toHaveBeenCalled();
    expect(login.loginError).toEqual(errorResponse);
  });

});