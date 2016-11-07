angular.module('HomeComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: './components/home/home.html',
				controller: 'homeCtrl'
			})
			.state('home.today', {
				url: '/today',
				templateUrl: './components/today/today.html',
				controller: 'todayCtrl'
			})
			.state('home.today.home_menu',{
				url: '/home_menu',
				templateUrl: './components/home_menu/home_menu.html',
				controller: 'home_menuCtrl'
			})
			.state('home.menu', {
				url: '/menu',
				templateUrl: './components/menu/menu.html',
				controller: 'menuCtrl'
			})
			.state('home.menu.home_menu', {
				url: '/home_menu',
				templateUrl: './components/home_menu/home_menu.html',
				controller: 'home_menuCtrl'
			})
			.state('home.home_allKind', {
				url: '/home_allKind',
				templateUrl: './components/home_allKind/home_allKind.html',
				controller: 'home_allKindCtrl'
			})
			.state('home.home_menu', {
				url: '/home_menu',
				templateUrl: './components/home_menu/home_menu.html',
				controller: 'home_menuCtrl'
			})
			.state('home.buyGoods', {
				url: '/buyGoods',
				templateUrl: './components/buyGoods/buyGoods.html',
				controller: 'buyGoodsCtrl'
			})
			.state('home.my', {
				url: '/my',
				templateUrl: './components/my/my.html',
				controller: 'myCtrl'
			})
			.state('home.message', {
				url: '/message',
				templateUrl: './components/message/message.html',
				controller: 'messageCtrl'
			})
			.state('home.todayNew', {
				url: '/todayNew',
				templateUrl: './components/todayNew/todayNew.html',
				controller: 'todayNewCtrl'
			})
			.state('home.todayNew.home_menu', {
				url: '/home_menu',
				templateUrl: './components/home_menu/home_menu.html',
				controller: 'home_menuCtrl'
			})
			.state('home.search_index', {
				url: '/search_index',
				templateUrl: './components/search_index/search_index.html',
				controller: 'search_indexCtrl'
			})
			.state('home.home_menu.home_comment', {
				url: '/home_comment',
				templateUrl: './components/home_comment/home_comment.html',
				controller: 'home_commentCtrl'
			})
			.state('home.search_index.search_result', {
				url: '/search_result',
				templateUrl: './components/search_result/search_result.html',
				controller: 'search_resultCtrl'
			})
			.state('home.message.comments', {
				url: '/comments',
				templateUrl: './components/comments/comments.html',
				controller: 'commentsCtrl'
			})


	}])

	.service('HomegetData', function($http) {

		this.todayFood;

		this.targetFood;

		this.data = function() {
			return $http.get('./data/home_menu.json');
		};

		this.goInfo = function(param){
			return param;
		};



		//返回查询到当前数据
		return this.targetFood;
		return this.todayFood;


	})

	.controller('homeCtrl', ["$scope", "$css", "HomegetData", function($scope, $css, HomegetData) {
		$css.add('./components/home/home.css');
		$css.add('./css/swiper-3.3.1.min.css');


		
		//获取数据
		HomegetData.data().success(function(res){
		 	$scope.data = res.menu_food;

		 });

		
		//click事件
		$scope.toInfo = function(){
			var foodId = HomegetData.goInfo(arguments[0]);
			HomegetData.todayFood = $scope.data;
			for(var n = 0;n < $scope.data.length;n++){
				if($scope.data[n].id == foodId){

					HomegetData.targetFood = $scope.data[n];
				}
			}
		};
		$scope.toInfo1 = function () {
			HomegetData.todayFood = $scope.data;
		}

		//修改数据
		$scope.$watch(function(){
			$scope.targetFood = HomegetData.targetFood;
		});

	}])

.controller('messageCtrl', ["$scope", "$css", "getData", function($scope, $css, getData) {
	$css.add('./components/message/message.css');

	$scope.clk = function() {
		window.history.back();
	}
}])

