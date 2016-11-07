angular.module('CollectionComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('collection',{
                url:'/',
                templateUrl:'./components/collection/collection.html',
                controller:'collectionCtrl'
            })
    }])

    .controller('collectionCtrl',["$scope","$css","getData",function($scope,$css,getData){
        $css.add('./components/collection/collection.css');
       
       
       var arr=[];
        var n = -1;
        console.log(window.localStorage);
		for(var i in window.localStorage) {
			console.log(window.localStorage)
			n++;

			if(n == parseInt(window.localStorage.length)){
				return;
			}else{
				var da = JSON.parse(window.localStorage.getItem(i));
			arr.push(da);
			$scope.items=arr;
			}
			

		}
    }])