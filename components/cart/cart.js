angular.module('CartComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('cart', {
				url: '/cart',
				templateUrl: './components/cart/cart.html',
				controller: 'cartCtrl'
			})
	}])
	
	.service('getGoodsData', function($http) {


	})
	.controller('cartCtrl', ["$scope", "$css", "getGoodsDetailData", "getGoodsData", "IndexgetData", function($scope, $css, getGoodsDetailData, getGoodsData, IndexgetData) {
		$css.add('./components/cart/cart.css');
		$scope.clk = function() {
			//getData.toBack();
			window.history.back();

		};

		$scope.allGoods = [];

		var arr = new Array();
		var arrLast = new Array();
		var arrStr = new Array();

		//读取出service中的全局购物车数组

		$scope.carArr = IndexgetData.myCarStorage();
//第一遍循环  把存储过的商品全部加入购物车
		for(var n = 0; n < $scope.carArr.length; n++) {
			var data = JSON.parse(window.localStorage.getItem($scope.carArr[n].goodId));
			arr.push(data);
		}
//第二遍循环  去重  循环次数为总的商品件数  如果在arrStr中找不到这个id 返回-1   则满足判断条件  然后push进数组
//相当于购物车里商品的种类数
		for(var j = 0; j < arr.length; j++) {
			if(arrStr.indexOf(arr[j].data.goodId) < 0) {
				arrStr.push(arr[j].data.goodId);
			}
		}
                            //循环全局的购物车所有商品不管重复与否  
		for(var x = 0; x < $scope.carArr.length; x++) {
			//循环购物车 取出每一个id
			var storeGood = JSON.parse(window.localStorage
				.getItem($scope.carArr[x].goodId));
				
			//商品种类数
			for(var j = 0; j < arrStr.length; j++) {
				//计算每一种商品数量
				var m = 0;
				//如果商品种类中有加入的商品
				if(arrStr[j] == storeGood.data.goodId) {
					//循环购物车数组
					for(var i = 0; i < $scope.carArr.length; i++) {
						
						//取出购物车里这个id的商品 所有数据
						var data1 = JSON.parse(window.localStorage
							.getItem($scope.carArr[i].goodId));
//							如果重复   则数量加1
						if(storeGood.data.goodId == data1.data.goodId) {
							m++;
						}
					}
					//存储购物车里的每件商品的数量
					storeGood.data["allCarNums"] = m;
					var obj = {
						"goodId": storeGood.data.goodId,
						"num": m,
						"data": storeGood
					};

					IndexgetData.addNum(obj, m);
					//在最后的数组中添加该数据
					arrLast.push(storeGood.data);
//					从种类中去掉这一项
					arrStr.splice(j, 1);
				}
			}
		}
		//要给页面显示的数组
		$scope.goodsInfo = arrLast;

		//减号点击事件
		$scope.goodsSub = function(e, event) {
			event = event || window.event;
			console.log("删除", e);

			var newData = IndexgetData.getNum();

			IndexgetData.changeNum(e, -1);
			$(event.target).siblings(".aaaa").text(IndexgetData.getByNum(e));
			$(event.target).parents(".cart_info").find(".money").text("￥"+$(event.target).siblings(".aaaa").text() * $(event.target).parents(".cart_info").find(".myPrice").text());
			IndexgetData.changeMyCarStorageTODesOne(e);

//			当前点击的商品的数量显示为零的时候
			if($(event.target).siblings(".aaaa").text() == 0) {
				console.log("我要删除所有了");
				
				//从本地存储中删除该项
				window.localStorage.removeItem(e);
				for(var n = 0; n < newData.length; n++) {
					if(newData[n].goodId == e) {
						IndexgetData.changeMyCarStorageTODes(newData[n].data.data);
					}
				}
				IndexgetData.delNum(e);

				$(event.target).parents(".cart_info").remove();
			}

			$scope.$watch(function() {
				console.log(222)
				$scope.b = $(event.target).next().html();
				console.log($scope.b);
			});

			$(event.target).parents(".cart_info").find(".money").text("￥"+$(event.target).siblings(".aaaa").text() * $(event.target).parents(".cart_info").find(".myPrice").text());

		};
		$scope.b = 1;

		//加号点击事件
		$scope.goodsAdd = function(e, event) {
			event = event || window.event;
			console.log("添加");

			var newData = IndexgetData.getNum();

			IndexgetData.changeNum(e, 1);
			var obj = {
				shopName: $(".check_no").children("p").html(),
				shopImage: $(".info_img").children("p").html(),
				shopIntro: $(".info_more p:first-of-type span:first-of-type").html(),
				goodPrice: $(".info_more p:first-of-type span:last-of-type").html(),
				goodOriPrice: $(".info_more p:last-of-type").html(),
				goodId: e
			};

			IndexgetData.changeMyCarStorage(obj);

			$(event.target).siblings(".aaaa").text(IndexgetData.getByNum(e));

			//数量改变  价格改变
			$scope.$watch(function() {
				//输入框 b
				$scope.b = $(event.target).prev().html();
				console.log($scope.b);
			});

			$(event.target).parents(".cart_info").find(".money").text("￥"+$(event.target).siblings(".aaaa").html() * $(event.target).parents(".cart_info").find(".myPrice").html());

		};

	}])