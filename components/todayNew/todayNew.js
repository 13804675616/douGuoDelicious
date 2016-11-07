
angular.module('TodayNewComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('todayNew',{
                url:'/',
                templateUrl:'./components/todayNew/todayNew.html',
                controller:'todayNewCtrl'
            })
            .state('todayNew.home_menu',{
                url: '/home_menu',
                templateUrl: './components/home_menu/home_menu.html',
                controller: 'home_menuCtrl'
            })
    }])

    .service('getData',function($http){
        this.data = function(){
            return $http.get('./serive/t.json')
        }

    })
    .controller('todayNewCtrl',["$scope","$css","HomegetData",function($scope,$css,HomegetData){
        $css.add('./components/todayNew/todayNew.css');
        $css.add('./components/home_menu/home_menu.css');
        
        
        $scope.isShowMenu =false;
        $scope.releaseMenu = function(){
        	console.log(111);
        	$scope.isShowMenu = !$scope.isShowMenu
        }
        
        
        
        for(var n in HomegetData.todayFood){
            if(HomegetData.todayFood[n].id = "0111"){
                $scope.dataTodayHot = HomegetData.todayFood[n].good_hot;
                break;
            }
        }
        //这是为了跳回到home_menu新建的
        $scope.data1 = HomegetData.todayFood;
        $scope.toInfo = function(){
            var foodId = HomegetData.goInfo(arguments[0]);
            console.log(foodId);
            HomegetData.targetFood = $scope.data1;
            for(var n = 0;n < $scope.data1.length;n++){
                if($scope.data1[n].id == foodId){
                    //console.log($scope.data[n]);
                    HomegetData.targetFood = HomegetData.targetFood[n];
                    break;
                }
            }
        };
    }])


