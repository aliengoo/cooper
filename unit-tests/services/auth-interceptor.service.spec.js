describe('authInterceptor', function () {

  var mockAuthTokenService, authInterceptorService;

  beforeEach(module('app.services'));

  beforeEach(module(function ($provide) {
    mockAuthTokenService = jasmine.createSpyObj('mockAuthTokenService', ['get']);

    $provide.value('authTokenService', mockAuthTokenService);
  }));

  beforeEach(inject(function (_authInterceptorService_) {
    authInterceptorService = _authInterceptorService_;
  }));

  describe('headers', function () {
    it('headers should be defined', function () {
      var fakeToken = 'yo-i-am-a-token';
      mockAuthTokenService.get.and.returnValue(fakeToken);

      var fakeConfig = {};

      authInterceptorService.request(fakeConfig);

      expect(fakeConfig.headers).toBeDefined();
    });

    it('should set the Authorization header', function () {

      var fakeToken = 'yo-i-am-a-token';
      mockAuthTokenService.get.and.returnValue(fakeToken);

      var fakeConfig = {};

      authInterceptorService.request(fakeConfig);

      expect(fakeConfig.headers.Authorization).toBeDefined();
      expect(fakeConfig.headers.Authorization).toBe('Bearer ' + fakeToken);

    });
  });

});
