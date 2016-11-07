angular.module('Home_commentComp',[])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('home_comment',{
                url:'/',
                templateUrl:'./components/home_comment/home_comment.html',
                controller:'home_commentCtrl'
            })
    }])

    .controller('home_commentCtrl',["$scope","$css","HomegetData",
    "IndexgetData",function($scope,$css,HomegetData,IndexgetData){
        $css.add('./components/home_comment/home_comment.css');


        //获取数据
        $scope.data = HomegetData.targetFood.foods_comment;

        $scope.$watch(function(){
            var newArr = new Array();
            $scope.myArr = IndexgetData.myStorage();
            if($scope.myArr){
                for(var n = 0;n <$scope.myArr.length;n++){
                    if(HomegetData.targetFood.id == $scope.myArr[n].id){
                        newArr.push($scope.myArr[n]);
                    }
                }
                $scope.myArr = newArr;
                
                $scope.arrShow = "show";
            }else {
                return;
            }
        });

        //评论跳转，让tabBar消失
        $scope.toShow = IndexgetData.toShow;

        $scope.$watch(function(){
            $scope.toShow = IndexgetData.changeToShow(false);
        });

        //返回的时候让tabBar出现
        $scope.toShowBar = function(){
            $scope.$watch(function(){
                $scope.toShow = IndexgetData.changeToShow(true);
                //$scope.toShow = true;
            });
        };

        //点击事件，发布评论
        $scope.toRelease = function(){
            var releaseTime1 = (new Date).toLocaleDateString()+' ';
            var releaseTime2 = (new Date).toTimeString().split(' ')[0];
            var releaseTime = releaseTime1.concat(releaseTime2);
            //console.log(releaseTime);
            var releaseObj = {
                "id":HomegetData.targetFood.id,
                "createtime": releaseTime,
                "userimage":"http://tx2.douguo.net/static/img/70.jpg",
                "nickname":"xiejiaxin",
                "content":$scope.newRelease
            };

            //将发布的评论动态加入到全局数组中去，并且在home的HomegetData中

            IndexgetData.changeMyStorage(releaseObj);
            //将原本的数据添加上新添加的数据
            $scope.$watch(function(){
                $scope.myArr =  IndexgetData.myStorage();
                $scope.arrShow = "show";
            });

            window.sessionStorage.setItem(releaseObj.id,JSON.stringify({data:IndexgetData.myStorage()}));
        	$scope.newRelease="";
        };
    }])