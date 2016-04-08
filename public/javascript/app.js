/**
 * Created by Chinmay on 08-04-2016.
 */


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
            $scope.data = data;
        });
    }

    $scope.getReviews = function(id){
    alert(id);
        $http({

            method : "POST",
            data : {
                "restaurantId" : id
            },
            url : "/yelp/restaurantinfo"
        }).success(function(result) {
            alert(result);
            $scope.result = result;
        });
    }
});