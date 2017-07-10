(function (angular) {
    // "use strict";

    // start your ride
    var app = angular.module('main', [
      'home',
      'in_theaters',
      'coming_soon',
      'top250',
      'auto-active'//路由规则先引用 先匹配
      ])
})(angular);