angular.module('Home_allKindComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home_allKind', {
				url: '/',
				templateUrl: './components/home_allKind/home_allKind.html',
				controller: 'home_allKindCtrl'
			})
	}])
	
	.controller('home_allKindCtrl', [
	"$scope", "$css", "getData",
	function($scope, $css, getData) {
			$css.add('./components/home_allKind/home_allKind.css');

			//点击每一个li   弹出子菜单    再次点击  子菜单收回
			//点击的是外面的ul
			$scope.display_more = function(e) {
				var e = window.event || e;
				//外面的ul 子级的li的点击事件
				if(e.target.nodeName == "LI"){
					//如果点击的是li 元素
					$(e.target).find("ul").toggleClass("showKindMenu");
					$(e.target).find("span>img").toggleClass("arrowRotate");
				}else if(e.target.nodeName == "IMG"){
					$(e.target).toggleClass("arrowRotate").parent("span").siblings("ul").toggleClass("showKindMenu");
					
				}
				
			}     
	}])