angular.module('Home_menuComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home_menu', {
				url: '/',
				templateUrl: './components/home_menu/home_menu.html',
				controller: 'home_menuCtrl'
			})
			.state('home_menu.home_comment', {
				url: '/home_comment',
				templateUrl: './components/home_comment/home_comment.html',
				controller: 'home_commentCtrl'
			})
	}])

	.controller('home_menuCtrl', ["$scope", "$timeout", "$css", "HomegetData","IndexgetData",function($scope, $timeout, $css, HomegetData,IndexgetData) {
		$css.add('./components/home_menu/home_menu.css');
		//选择购买的div先隐藏   并且 一键购买的按钮向上移动
		$scope.isGoodsShow = 'GoodsHide';
		//点击一键购买  显示
		$scope.GoodsShowChange = function() {
				$scope.isBtnMoveUp = 'BtnMoveUp';
				$timeout(function() {
					$scope.isGoodsShow = 'GoodsShow';
					$scope.isGoodsShowBoxAni = 'GoodsShowBoxAni';
				}, 400);
			}
			//点击灰色部分 隐藏
		$scope.GoodsCancel = function() {
				$scope.isGoodsShow = 'GoodsHide';
			}
			//点击收藏  把白色星星和收藏换成 橙色星星和已收藏
			//点击收藏 把橙色星星和已收藏换成 白色星星和收藏
			var flag = false;
		$scope.menu_collect = function() {
			flag = !flag;
			var colle_white = $(".home_menu_action0>span"),
			colle_orange = $(".home_menu_action");
			colle_orange.toggleClass("anim1");
			//如果点击了偶数次  弹出框
			if(flag == false){
				$(".home_menu_cancelCollection").slideToggle();
			}
			
			//星星转动动画
			$(".home_menu_actionPic").toggleClass("changeStar");
		}
		//消息弹出框提示
		//点击取消收藏    把橙色星星和已收藏换成白色星星和收藏
		$scope.cancel_collect = function(){
			var star = $(".home_menu_cancelCollection").children("div").children("div:first-of-type");
			$(".home_menu_cancelCollection").slideToggle();
		}
		//点击取消本次操作   是白色星星和收藏不变
		$scope.cancel_operate = function(){
			//点击第二个选项
			$(".home_menu_cancelCollection").slideToggle();
			$(".home_menu_action").addClass("anim1");
			flag = true;
	
		};
		

		//获取数据
		$scope.data = HomegetData.targetFood;

		//添加到购物车
		$scope.addToMyCar = function(){
			
		};

		//分别添加到购物车
		$scope.thisTocar = function(e){
			console.log($scope.data.food_plan);

			for(var n = 0;n < $scope.data.food_plan.length;n++){
				if($scope.data.food_plan[n].more_id == e){
					var carObj = {
						shopName:$scope.data.food_plan[n].more_name,
						shopImage:$scope.data.food_plan[n].more_img,
						shopIntro:" ",
						goodPrice:$scope.data.food_plan[n].price,
						goodOriPrice:$scope.data.food_plan[n].ori_price,
						goodId:e
					};

					console.log(carObj);
					IndexgetData.changeMyCarStorage(carObj);

					window.localStorage.setItem(e,JSON.stringify({data:carObj}));
					break;
				}
			}

		};
		//收藏
			//获取数据
		$scope.data = HomegetData.targetFood;
	
		//初始化为未收藏状态
		$scope.flag = false;

		//先判断是否已收藏，如果已经收藏则刚进入就显示已收藏，否则正常显示

		for(var n in window.localStorage) {

			//如果该targetFood存在localStorage中
			if(n == $scope.data.id) {
				$scope.flag = true;
			}
		}

		$scope.menu_collect = function() {
				$scope.flag = !$scope.flag;
				var colle_white = $(".home_menu_action0>span"),
					colle_orange = $(".home_menu_action");
				if($scope.flag == true) {
					colle_orange.addClass("anim1");
				} else {
					colle_orange.removeClass("anim1");
				}

				if(colle_orange.hasClass("anim1")) {
					window.localStorage.setItem($scope.data.id, JSON.stringify($scope.data));

				}

				//如果点击了偶数次  弹出框
				if($scope.flag == false) {
					$(".home_menu_cancelCollection").slideToggle();
				}

				//星星转动动画
				$(".home_menu_actionPic").toggleClass("changeStar");
			}
			//消息弹出框提示
			//点击取消收藏    把橙色星星和已收藏换成白色星星和收藏
		$scope.cancel_collect = function() {
				var star = $(".home_menu_cancelCollection").children("div").children("div:first-of-type");
				$(".home_menu_cancelCollection").slideToggle();
				window.localStorage.removeItem($scope.data.id);
				$scope.flag = false;
				
			}
			//点击取消本次操作   是白色星星和收藏不变
		$scope.cancel_operate = function() {
			//点击第二个选项
			$(".home_menu_cancelCollection").slideToggle();
			$(".home_menu_action").addClass("anim1");
			$scope.flag = true;

		}


	}])
