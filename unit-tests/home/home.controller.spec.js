describe('Home controller', function() {

  var $scope, $rootScope, home;

  beforeEach(module('app.home'));

  beforeEach(inject(function(_$rootScope_, _$controller_){

    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    home = _$controller_('Home');
  }));

  it('home should work', function() {

    expect(home.name).toBe('Home');

  });

});