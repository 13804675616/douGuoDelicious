angular.module('CommentsComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('comments',{
                url:'/comments',
                templateUrl:'./components/comments/comments.html',
                controller:'commentsCtrl'
            })
    }])

     .service('getCirclData',['$http',function($http){
		   this.data = function(){
		       return $http.get('./serive/circle.json');
		}


     }])
    .controller('commentsCtrl',["$scope","$css","getCirclData",function($scope,$css,getData){
        $css.add('./components/comments/comments.css');


    }])