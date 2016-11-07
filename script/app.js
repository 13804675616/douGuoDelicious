/**

 */

angular.module('myApp', ['ui.router', 'angularCSS',
	'HomeComp',
	'CircleComp',
	'MyComp',
	'BuyGoodsComp',
	'Home_allKindComp',
	'CartComp',
	'CollectionComp',
	'Goods_detailComp',
	'Home_commentComp',
	'Home_menuComp',
	'MenuComp',
	'TodayComp',
	'TodayNewComp',
	'Search_indexComp',
	'Search_resultComp',
	'CommentsComp'
])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
})

.service('IndexgetData', function($http) {

	 /*this.tabBarFlag = function(param){
			return this.toRealse = param;
		}
		this.gettabBarFlag = function(){
			return this.toRealse = 'show' ;
		}*/

		this.changeToShow = function(param){
			return this.toShow = param;
		};

		this.allArr = new Array();
		this.allCarArr = new Array();

		//用于返回全局的评论数组
		this.myStorage = function(){
			return this.allArr;
		};

		//实时改变全局评论数组
		this.changeMyStorage = function(obj){
			return this.allArr.push(obj);
		};

		//用于返回全局的购物车数组
		this.myCarStorage = function(){
			return this.allCarArr;
		};

		//实时改变全局购物车数组
		this.changeMyCarStorage = function(obj){
			return this.allCarArr.push(obj);
		};

		//实时删除全局购物车数组
		this.changeMyCarStorageTODes = function(obj){

			for(var n = 0; n < this.allCarArr.length;n++){
				if(this.allCarArr[n].goodId == obj.goodId){
					this.allCarArr.splice(n,1);
				}
			}

			return this.allCarArr;
		};

		//实时删除一部分全局购物车数组
		this.changeMyCarStorageTODesOne = function(id){

			for(var n = 0; n < this.allCarArr.length;n++){
				if(this.allCarArr[n].goodId == id){
					this.allCarArr.splice(n,1);
					return this.allCarArr;
				}
			}
		};

		this.carNum = new Array();
		this.newNum;
		//获取数据

		this.getNum = function(){
			return this.carNum;
		};

		this.refreshNum = function(id){
			return this.newNum;
		};

		this.setRefreshNum = function(id){
			for(var n = 0;n < this.carNum.length;n++) {
				if (this.carNum[n].goodId == id) {
					return this.newNum = this.carNum[n].num;
				}
			}

		};

		this.getByNum = function(id){
			for(var n = 0;n < this.carNum.length;n++) {
				if (this.carNum[n].goodId == id) {
					return this.carNum[n].num;
				}
			}
		};

		this.addNum = function(param,num){
			if(this.carNum.length == 0){
				this.carNum.push(param);
			}else{
				for(var n = 0;n < this.carNum.length;n++){
					//如果购物车中 已经有加入的这个种类
					if(this.carNum[n].goodId == param.goodId){
						//把这个种类的数量改变
						this.carNum[n].num = num;
						//返回该种类数量
						return this.carNum;
					}else{
						//如果没有这个种类  就把这个商品加进去
						this.carNum.push(param);
					}
				}
			}

			return this.carNum;
		};

		this.delNum = function(id){

			for(var n = 0;n < this.carNum.length;n++){
				if(this.carNum[n].goodId ==id){
					this.carNum.splice(n,1);
				}
			}
			return this.carNum;
		};

		this.changeNum = function(id,newnum){
			newnum = parseInt(newnum);
			for(var n = 0;n < this.carNum.length;n++){
				if(this.carNum[n].goodId == id){
					this.carNum[n].num += newnum;
					return this.carNum[n].num;
				}
			}

		}

		return this.toShow = true;
	})

.controller("myTabCtrl", ["$scope", "IndexgetData", function($scope, IndexgetData) {

	window.localStorage.clear();

	$scope.$watch(function() {
		$scope.toShow = IndexgetData.toShow;
	});

	$scope.$watch(function() {
		$scope.myStorage = IndexgetData.myStorage;
	});
//加号里的时间 跟随系统
	var Time1 = new Date();
	$scope.dat = Time1.getDate();
	var week = Time1.getDay();
	$scope.year = Time1.getFullYear();
	$scope.month = Time1.getMonth()+1;
	switch(week) {
		case 0:
			$scope.day = '星期日';
			break;
		case 1:
			$scope.day = '星期一';
			break;
		case 2:
			$scope.day = '星期二';
			break;
		case 3:
			$scope.day = '星期三';
			break;
		case 4:
			$scope.day = '星期四';
			break;
		case 5:
			$scope.day = '星期五';
			break;
		case 6:
			$scope.day = '星期六';
			break;

	}


//底部按钮的动画效果
	//console.log("controller");
	$scope.flag1 = "True";
	$scope.flag2 = "False";
	$scope.flag3 = "False";
	$scope.flag4 = "False";
	$scope.flagCenter = false;

	$scope.action1 = function() {
		//				console.log("aa");
		$scope.flag1 = "True";
		$scope.flag2 = "False";
		$scope.flag3 = "False";
		$scope.flag4 = "False";

	}
	$scope.action2 = function() {
		$scope.flag1 = "False";
		$scope.flag2 = "True";
		$scope.flag3 = "False";
		$scope.flag4 = "False";

	}
	$scope.action3 = function() {
		$scope.flag1 = "False";
		$scope.flag2 = "False";
		$scope.flag3 = "True";
		$scope.flag4 = "False";

	}
	$scope.action4 = function() {
		$scope.flag1 = "False";
		$scope.flag2 = "False";
		$scope.flag3 = "False";
		$scope.flag4 = "True";

	}
	$scope.addShow = function(e) {

		var thisNow = $(".barItem");
		//				console.log(thisNow);
		$scope.flagCenter = !$scope.flagCenter;
		if($scope.flagCenter == true) {
			$(".tabBarAdd_box").css("display", "block");
			$("body").css("overflow", "hidden");

			thisNow.siblings().css("visibility", "hidden");

			//					thisNow.addClass("rota");
			thisNow.css("background-color", "#fff");
			thisNow.find("div").css("color", "#ff6b25");
		} else {
			$(".tabBarAdd_box").css("display", "none");
			$("body").css("overflow", "auto");
			thisNow.siblings().css("visibility", "visible");
			//					thisNow.removeClass("rota");
			thisNow.css("background-color", "#ff6b25");
			thisNow.find("div").css("color", "#fff");
		}

	}

}])