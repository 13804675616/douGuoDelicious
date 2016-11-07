angular.module('Search_indexComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('search_index', {
				url: '/search_index',
				templateUrl: './components/search_index/search_index.html',
				controller: 'search_indexCtrl'
			})
			.state('search_index.search_result', {
				url: '/search_result',
				templateUrl: './components/search_result/search_result.html',
				controller: 'search_resultCtrl'
			})
	}])
	.service('getCirclData', ['$http', function($http) {
		this.data = function() {
			return $http.get('./serive/circle.json');
		}

	}])
	.controller('search_indexCtrl', ["$scope", "$css", "getCirclData", function($scope, $css, getData) {
		$css.add('./components/search_index/search_index.css');
		$scope.clk = function() {
				window.history.back();
		}
		$scope.his_list = [];
		$scope.searchStart  = function(){
			$scope.searchName = $(".back_searchIndex input").val();
			if($scope.searchName==""){
				return;
			}
			//取得搜索的名称 将其放入历史搜索中
				$scope.his_list.push($scope.searchName);

			
		}
		$scope.clearhis = function(){
			$scope.his_list = [];
		}

	}])