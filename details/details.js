(function(angular){
    var app=angular.module('details',['ngRoute','myJsonpService']);
    //配置路由
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/details/:id',{
            templateUrl:'details/details.html',
            controller:'detailsCtr'
        })
        
    }])
    //创建控制器
    app.controller('detailsCtr',['$scope','$routeParams','myService',function($scope,$routeParams,myService){
        myService.myJsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,{},function(data){
            console.log(data);
            $scope.data=data;
            $scope.$apply();
        })
    }])
})(angular)