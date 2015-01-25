describe('stateAuthService', function () {

  var stateAuthService, apiUrl, $httpBackend, $location, $rootScope, checkStateAuthorizationHandler, expectedUrl;

  beforeEach(module('app.services'));

  beforeEach(inject(function ($injector, _stateAuthService_, _apiUrl_) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    apiUrl = _apiUrl_;
    stateAuthService = _stateAuthService_;
    expectedUrl = apiUrl + 'check-authorization';
    checkStateAuthorizationHandler = $httpBackend.when('GET', expectedUrl);
  }));

  it('when the user is not authenticated, send to /login', inject(function () {

    $httpBackend.expectGET(expectedUrl);
    checkStateAuthorizationHandler.respond(401, '');
    spyOn($location, 'url');

    stateAuthService.checkAuthorization('any');

    $httpBackend.flush();

    expect($location.url).toHaveBeenCalledWith("/login");
  }));

  it('when the user is authenticated, resolve the promise', function () {
    $httpBackend.expectGET(expectedUrl);
    checkStateAuthorizationHandler.respond(200, '');

    var success = jasmine.createSpy();

    stateAuthService.checkAuthorization('any').then(success);

    $httpBackend.flush();

    expect(success).toHaveBeenCalled();

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});
