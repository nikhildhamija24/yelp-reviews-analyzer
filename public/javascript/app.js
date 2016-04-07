/**
 * Created by Chinmay on 08-04-2016.
 */


var app =  angular.module('main',[]);
app.controller('homeController',function($scope,$http){
    var searchText = $scope.search;
    $scope.click = function(){

        $http({

            method : "POST",
            data :{
                "searchText" : searchText
            },
            url : "http://localhost:3000/yelp/restaurants"
        }).success(function(data){
            alert(data);
            $scope.data = data;
        });
    }
});