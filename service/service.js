(function(angular){
    var app = angular.module('myJsonpService',[]);
    app.service('myService',['$window',function($window){
         this.myJsonp=function(url,arg,fn){
            var script=$window.document.createElement('script');

            var fnName='jsonp'+Date.now();
            $window[fnName]=function(data){
                fn(data);
            }
            url+='?callback='+fnName;
            for(var k in arg){
                url+='&'+k+'='+arg[k];
            }

            script.src=url;
            $window.document.body.appendChild(script);
        }  
    }])
})(angular)