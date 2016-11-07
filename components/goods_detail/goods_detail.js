angular.module('Goods_detailComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('goods_detail',{
                url:'/',
                templateUrl:'./components/goods_detail/goods_detail.html',
                controller:'goods_detailCtrl'
            })

    }])

     .service('getGoodsDetailData',function($http){
         this.data = function(){
            return $http.get('./serive/gouhaohuoIndexHotDazhaxie.json')
         }
         return this.goodsInfo;

     })
    .controller('goods_detailCtrl',["$scope","$css",
    "getGoodsDetailData","IndexgetData","$timeout",
    function($scope,$css,getGoodsDetailData,IndexgetData,$timeout){
        $css.add('./components/goods_detail/goods_detail.css');
        
        $scope.storeName = "";
        
        
        getGoodsDetailData.data().success(function(res){
        	
            for(var i=0;i<res.data.shop.length;i++){
            	
                if(window.sessionStorage.getItem('goodsId')==res.data.shop[i].basic.id){
                	
                    $scope.result = res.data.shop[i];
                    getGoodsDetailData.goodsInfo = $scope.result;
                    //console.log( $scope.result);
                    break;
                }
            }
        })
        //将这个的id传过来，然后去那边找
        $scope.goodsAddToCart = function (e) {
            //先查一遍，如果本地存储有这个数据，则将这条数据修改，将其数量加1

            //点击添加到购物车时候  添加的动画
           		
            	$(".shopCar").addClass("anim");
            	$timeout(function(){
            		$(".shopCar").removeClass("anim");
            	},800);
            	//点击添加到购物车时   上面的小圆点数字+1
            $(".goodscount").show();
           $(".goodscount").html(parseInt(IndexgetData.myCarStorage().length)+1);
 
            var carObj = {
                shopName:$scope.result.store.name,
                shopImage:$scope.result.store.image,
                shopIntro:$scope.result.store.intro,
                goodPrice:$scope.result.basic.price,
                goodOriPrice:$scope.result.basic.ori_price,
                goodId:e
            };
                IndexgetData.changeMyCarStorage(carObj);

            window.localStorage.setItem(e,JSON.stringify({data:carObj}));
        }
    }])