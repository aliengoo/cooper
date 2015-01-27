(function () {
  'use strict';

  angular.module('app.member').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('members', {
      url : '/members',
      controller : 'Members as vm',
      templateUrl : 'members/members.html'
    }).state('member/:id', {
      url : '/member',
      controller : 'Member as vm',
      templateUrl : 'members/member.html',
      resolve : {
        member : ['$stateParams', 'memberService', function($stateParams, memberService) {
          return memberService.get({
            id : $stateParams.id
          }).$promise;
        }]

      }
    }).state('member', {
      url : '/member',
      controller : 'Member as vm',
      templateUrl : 'members/member.html'
    });
  }

}());
