describe('Home controller', function() {

  var $scope, $rootScope, home;

  beforeEach(module('app.home'));

  beforeEach(inject(function(_$rootScope_, _$controller_){

    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    home = _$controller_('Home');
  }));

  it('should be defined', function() {

    expect(home).toBeDefined();

  });

});