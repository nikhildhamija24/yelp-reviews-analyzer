var app =  angular.module('main',[]);
app.controller('homeController',function($scope,$http){

    $scope.searchList = function(){
        var searchText = $scope.search;
        var location = $scope.location;
        $http({
            method : "POST",
            data :{
                "searchTerm" : searchText,
                "location" : location
            },
            url : "/yelp/restaurants"
        }).success(function(data){
            document.getElementById("list").style.display="block";
            $scope.data = data;
        });
    }

    $scope.getReviews = function(id){
        $http({

            method : "POST",
            data : {
                "restaurantId" : id
            },
            url : "/yelp/restaurantinfo"
        }).success(function(result) {
            alert(result);
            document.getElementById("review").style.display="block";
            $scope.result = result;
     });
    }
});




