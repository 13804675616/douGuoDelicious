angular.module('BuyGoodsComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('buyGoods',{
                url:'/buyGoods',
                templateUrl:'./components/buyGoods/buyGoods.html',
                controller:'buyGoodsCtrl'
            })
            .state('buyGoods.cart',{
                url:'/cart',
                templateUrl:'./components/cart/cart.html',
                controller:'cartCtrl'  //这里的controller名字是为了依赖后面的
            })
            .state('buyGoods.goods_detail',{
                url:'/goods_detail',
                templateUrl:'./components/goods_detail/goods_detail.html',
                controller:'goods_detailCtrl'
            })
            .state('buyGoods.goods_detail.cart',{
                url:'/cart',
                templateUrl:'./components/cart/cart.html',
                controller:'cartCtrl'
            })
    }])

     .service('getByGoodsData',function($http){
         this.data = function(){
             return $http.get('./serive/gouhaohuoIndexHot.json')
         }

     })
    .controller('buyGoodsCtrl',["IndexgetData","$scope",
    "$css","getByGoodsData",
    function(IndexgetData,$scope,$css,getByGoodsData){
        $css.add('./components/buyGoods/buyGoods.css');
       
       if(parseInt(IndexgetData.myCarStorage().length) == 0){
        	$(".buyGoods_cart span").hide();
        }else{
        	$scope.buyGoodsCartNum = parseInt(IndexgetData.myCarStorage().length);
        $(".buyGoods_cart span").show();
        }
        
        
        
        
        
			$scope.dataNew = [];
        getByGoodsData.data().success(function(res){
             $scope.data = res.data.list;
             for(var n in $scope.data) {
				$scope.dataNew[n] = $scope.data[n];
			}
             $scope.dataMore = res.dataMore.list;
         })
        $scope.flag = false;
        $scope.toggle = function () {
            $scope.flag = !$scope.flag;
        };

        //点击购好货物品的跳转
        $scope.clkBuyGoods = function (e) {
            window.sessionStorage.setItem("goodsId",e);
        }
        //排序部分
		//按销量排序   第一次点击为降序  第二次点击升序
		$scope.countFlag = false;
		$scope.bySaleCount = function() {
			//第一次点击  按升序排序
			$scope.countFlag = !$scope.countFlag;
			$scope.countFlag ?
				$scope.orderCondition = "-all_sale_count" :
				$scope.orderCondition = "all_sale_count";
			$(".goods_nav>ul>li:nth-of-type(2) a").css("color", "red");
			$(".goods_nav>ul>li:nth-of-type(2)").siblings("li").children("a").css("color", "black");
		}

		//按照价格升序排序
		$scope.bySalePriceUp = function() {
				//第一次点击  按升序排序
				$scope.orderCondition = "price";
				//价格变红
				$(".goods_nav>ul>li:nth-of-type(3) a").css("border-color", "black");
				//其它字变黑
				$(".goods_nav>ul>li:nth-of-type(3)").siblings("li").children("a").css("color", "black");

				//让上面小三角变红色
				$(".goods_nav>ul>li:nth-of-type(3) span:first-of-type").css("background-image", "url(./images/goods_up1.png)");
				//下面小三角变黑色
				$(".goods_nav>ul>li:nth-of-type(3) span:last-of-type").css("background-image", "url(./images/goods_down.png)");
			}
			//按照价格降序排序
		$scope.bySalePriceDown = function() {
				//第一次点击  按升序排序
				$scope.orderCondition = "-price";
				//价格变红
				$(".goods_nav>ul>li:nth-of-type(3) a").css("border-color", "black");
				//其它字变黑
				$(".goods_nav>ul>li:nth-of-type(3)").siblings("li").children("a").css("color", "black");
				//让下面小三角变红色
				$(".goods_nav>ul>li:nth-of-type(3) span:last-of-type").css("background-image", "url(./images/goods_down1.png)");
				//上面小三角变黑色
				$(".goods_nav>ul>li:nth-of-type(3) span:first-of-type").css("background-image", "url(./images/goods_up.png)");

			}
			//筛选
			//显示筛选的框
		$scope.filterGoods = function() {
			$(".ul_FilterGoods").slideToggle();
		}

		//按照销量搜索
		$scope.filterCount = function() {
				//重置数据
				for(var n in $scope.data) {
					$scope.dataNew[n] = $scope.data[n];
				}
				//取得两个输入框的值
				var startCount = parseInt($(".countRan input:first-of-type").val());
				var endCount = parseInt($(".countRan input:last-of-type").val());

				if(startCount>endCount) {
					alert("区间输入有误~返回重新输入");
				} else {
					for(var i = 0; i < $scope.dataNew.length; i++) {
						//取得价格  如果价格超出范围  从数组弹出
						if(parseInt($scope.dataNew[i].all_sale_count) < startCount || parseInt($scope.dataNew[i].all_sale_count) > endCount) {
							$scope.dataNew.splice(i, 1);
							console.log($scope.dataNew[i]);
							i = i - 1;
						}
					}

				}

			}
			//按照价格搜索
		$scope.filterPrice = function() {
			//重置数据
			for(var n in $scope.data) {
				$scope.dataNew[n] = $scope.data[n];
			}
			//取得两个输入框的值
			var startPrice = parseInt($(".priceRan input:first-of-type").val());
			var endPrice = parseInt($(".priceRan input:last-of-type").val());
			if(startPrice >endPrice) {
				alert("区间输入有误~返回重新输入");
			} else {
				for(var i = 0; i < $scope.dataNew.length; i++) {
					//取得价格  如果价格超出范围  从数组弹出
					if(parseInt($scope.dataNew[i].price) < startPrice ||
						parseInt($scope.dataNew[i].price) > endPrice) {
						$scope.dataNew.splice(i, 1);
						//						console.log($scope.dataNew);
						i = i - 1;
					}
				}
			}

		}
    }])