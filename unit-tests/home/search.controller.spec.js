describe('Search controller', function() {

  var $scope, $rootScope, search, $httpBackend;

  beforeEach(module('app.search'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

  }));

  beforeEach(inject(function(_$rootScope_, _$controller_){

    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    search = _$controller_('Search');
  }));

  it('Search should work', function() {

    expect(search).toBeDefined();
  });


});