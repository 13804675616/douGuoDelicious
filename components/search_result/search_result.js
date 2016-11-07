angular.module('Search_resultComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('search_result', {
				url: '/search_result',
				templateUrl: './components/search_result/search_result.html',
				controller: 'search_resultCtrl'
			})
	}])
	.service('getData', function($http) {
		this.data = function() {
			return $http.get('./serive/t.json')
		}

	})
	.controller('search_resultCtrl', ["$scope", "$css", function($scope, $css) {
		$css.add('./components/search_result/search_result.css');
		$scope.clk = function() {
//			history.go(-1);
			window.history.back();
		}
	}])