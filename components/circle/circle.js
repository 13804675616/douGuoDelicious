angular.module('CircleComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('circle',{
                url:'/circle',
                templateUrl:'./components/circle/circle.html',
                controller:'circleCtrl'
            })
    }])

     .service('getCirclData',['$http',function($http){
		   this.data = function(){
		       return $http.get('./serive/circle.json');
		}


     }])
    .controller('circleCtrl',["$scope","$css","getCirclData",function($scope,$css,getData){
        $css.add('./components/circle/circle.css');
        $css.add('./css/swiper-3.3.1.min.css');
		getData.data().success(function(res){
		    //console.log(res);
		    $scope.data = res.data;
		});

    }])