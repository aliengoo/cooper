describe('authInterceptor', function () {

  var mockAuthTokenService, authInterceptorService, fakeToken = 'blah';

  beforeEach(module('app.services'));

  beforeEach(module(function ($provide) {
    mockAuthTokenService = jasmine.createSpyObj('mockAuthTokenService', ['get']);
    $provide.value('authTokenService', mockAuthTokenService);
  }));

  beforeEach(inject(function (_authInterceptorService_) {
    authInterceptorService = _authInterceptorService_;
  }));

  describe('headers', function () {

    var fakeConfig;

    beforeEach(function () {
      mockAuthTokenService.get.and.returnValue(fakeToken);
      fakeConfig = {
        url: '/some-url'
      };
    });

    it('headers should be defined', function () {
      authInterceptorService.request(fakeConfig);
      expect(fakeConfig.headers).toBeDefined();
    });

    it('should set the Authorization header', function () {
      authInterceptorService.request(fakeConfig);
      expect(fakeConfig.headers.Authorization).toBeDefined();
    });

    it('should set the Authorization header value', function () {
      authInterceptorService.request(fakeConfig);
      expect(fakeConfig.headers.Authorization).toBe('Bearer ' + fakeToken);
    });
  });

});
