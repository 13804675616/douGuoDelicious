/**
 * Created by My on 2016/10/10.
 */
angular.module('MyComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('my',{
                url:'/my',
                templateUrl:'./components/my/my.html',
                controller:'myCtrl'
            })
            .state('my.collection',{
                url:'/collection',
                templateUrl:'./components/collection/collection.html',
                controller:'collectionCtrl'
            })
    }])
    .controller('myCtrl',["$scope","$css","getData",function($scope,$css,getData){
        $css.add('./components/my/my.css');
      
    }])
