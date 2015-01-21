describe('Search controller', function() {

  var $scope, $rootScope, search, $httpBackend, mockSearchService;

  beforeEach(module('app.search'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  beforeEach(inject(function(_$rootScope_, _$controller_){

    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    mockSearchService = {
      search : function(query, successFn, errorFn) {
        successFn({
          blah : 'blah'
        });
      }
    };

    search = _$controller_('Search', {
      searchService : mockSearchService
    });
  }));

  it('should be defined', function() {
    expect(search).toBeDefined();
  });

});