describe('authTokenService', function() {

  var localStorageService, authTokenService;

  beforeEach(module('app.services'));


  beforeEach(inject(function (_localStorageService_, _authTokenService_) {
    localStorageService = _localStorageService_;
    authTokenService = _authTokenService_;
  }));


  it('should store a value in local storage', function() {
    var expected = 'poop';
    authTokenService.set(expected);

    var actual = authTokenService.get();

    expect(actual).toEqual(expected);
  });

  afterEach(function () {
    localStorageService.remove('auth-token');
  });

});