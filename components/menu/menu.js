/**
 * Created by My on 2016/10/10.
 */
angular.module('MenuComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('menu',{
                url:'/',
                templateUrl:'./components/menu/menu.html',
                controller:'menuCtrl'
            })
            .state('menu.home_menu',{
                url: '/home_menu',
                templateUrl: './components/home_menu/home_menu.html',
                controller: 'home_menuCtrl'
            })
    }])

    .controller('menuCtrl',["$scope","$css","HomegetData",function($scope,$css,HomegetData){
        $css.add('./components/menu/menu.css');
        for(var n in HomegetData.todayFood){
            if(HomegetData.todayFood[n].id = "0111"){
                $scope.dataTodayNew = HomegetData.todayFood[n].foods_gather;
                break;
            }
        }
        console.log( $scope.dataTodayNew);
        //这是为了跳回到home_menu新建的
        $scope.data1 = HomegetData.todayFood;
        $scope.toInfo = function(){
            var foodId = HomegetData.goInfo(arguments[0]);
            console.log(foodId);
            HomegetData.targetFood = $scope.data1;
            console.log($scope.data1);
            for(var n = 0;n < $scope.data1.length;n++){
                if($scope.data1[n].id == foodId){
                    HomegetData.targetFood = HomegetData.targetFood[n];
                    break;
                }
            }
            console.log(HomegetData.targetFood);
        };
    }])