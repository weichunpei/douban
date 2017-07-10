(function(angular){
    var app = angular.module('auto-active',[]);
    //创建自定义指令
    app.directive('autoActive',['$location',function($location){
        return {
            link:function($scope,element,attributes){
                // element.on('click',function(){
                //     //让当前元素添加样式,让其兄弟元素失去样式
                //     element.parent().children().removeClass('active');
                //     element.addClass('active')
                // })
                $scope.loca=$location;
                $scope.$watch('loca.url()',function(now,old){
                    var hash= element.find('a').attr('href').substr(1);
                    //startWith 表示以什么开始
                    // now.startWith(hash) now.startWidth()is not a function
                    if(now.indexOf(hash)==0){
                        element.parent().children().removeClass('active');
                        element.addClass('active');
                    }
                })
            }
        }
    }])
})(angular)