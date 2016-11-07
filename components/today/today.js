
angular.module('TodayComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('today',{
                url:'/',
                templateUrl:'./components/today/today.html',
                controller:'todayCtrl'
            })
            .state('today.home_menu',{
                url: '/home_menu',
                templateUrl: './components/home_menu/home_menu.html',
                controller: 'home_menuCtrl'
            })

    }])
    .controller('todayCtrl',["$scope","$css","HomegetData",function($scope,$css,HomegetData){
         $css.add('./components/todayNew/todayNew.css');
        $css.add('./components/today/today.css');
        

 $scope.isShowMenu =false;
        $scope.releaseMenu = function(){
        	console.log(111);
        	$scope.isShowMenu = !$scope.isShowMenu
        }
        $scope.data = HomegetData.targetFood;

        //这是为了跳回到home_menu新建的
        $scope.data1 = HomegetData.todayFood;
        console.log(HomegetData.todayFood);
        //click事件
        $scope.toInfo = function(){
            var foodId = HomegetData.goInfo(arguments[0]);
            HomegetData.targetFood = $scope.data1;

            for(var n = 0;n < HomegetData.targetFood.length;n++){
                if($scope.data1[n].id == foodId){
                    HomegetData.targetFood = HomegetData.targetFood[n];
                    break;
                }
            }
        };
    }])


