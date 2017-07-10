(function(angular){
    var app=angular.module('move_list',['ngRoute','myJsonpService']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/:move_list/:page?',{
            templateUrl:'move_list/move_list.html',
            controller:'move_listCtr'
        })
    }])
    app.controller('move_listCtr',['$scope','$http','$routeParams','$route','$window','myService',function($scope,$http,$routeParams,$route,$window,myService){
        $scope.loading=true;
        $scope.pageSize=5;
        $scope.page=($routeParams.page||'1')-0;
        var start=($scope.page*$scope.pageSize)-5;
        // $scope.query='';
        // $scope.search=function(){
        //     cons.log(111)
        //     if(!$scope.query){
        //         alert('请输入关键字');
        //         return;
        //     }
        //     $window.location.href='#/search?q='+$scope.query
        // }
        // console.log($routeParams);
        //调用服务模块方法
        myService.myJsonp('http://api.douban.com/v2/movie/'+$routeParams.move_list,{start:start,count:$scope.pageSize,q:$routeParams.q},function(data){
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
        // $http.get('in_theaters/data.json')
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