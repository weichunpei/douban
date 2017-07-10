(function(angular){
    var app=angular.module('top250',['ngRoute','myJsonpService']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/top250/:page?',{
            templateUrl:'top250/top250.html',
            controller:'top250Ctr'
        })
    }])
    app.controller('top250Ctr',['$scope','$http','$routeParams','$route','myService',function($scope,$http,$routeParams,$route,myService){
        $scope.loading=true;
        $scope.pageSize=5;
        $scope.page=($routeParams.page||'1')-0;
        var start=($scope.page*$scope.pageSize)-5;
        //调用服务模块方法
        myService.myJsonp('http://api.douban.com/v2/movie/top250',{start:start,count:$scope.pageSize},function(data){
            $scope.loading=false;
            console.log(data)
            $scope.data=data;
            $scope.totalPage=Math.ceil($scope.data.total/$scope.pageSize)
            //异步代码出问题 需要加这句话
            $scope.$apply();
        })
       $scope.getPage=function(nowPage){
           //到达极限不能点击
           if(nowPage<=0 || nowPage>$scope.totalPage){
                return;
           }
            $route.updateParams({page:nowPage});
       }
        //发送请求
        // $http.get('top250/data.json')
        // .then(function(res){
        //     console.log(res);
        //     $scope.itemNum=res.data.total
        //     $scope.pageNow=1;
        //     $scope.pageTotal=Math.ceil(res.data.total/res.data.count)
        //     $scope.data=res.data;
        //     //实现上下页

        // })
    }])
})(angular)