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
            document.getElementById("div").style.display="block";
            $scope.data = data;
        });
    }

    $scope.getReviews = function(id){
    //alert(id);
        $http({

            method : "POST",
            data : {
                "restaurantId" : id
            },
            url : "/yelp/restaurantinfo"
        }).success(function(result) {
            var temp_review_var = ((result.reviews[0].excerpt).concat(result.reviews[0].excerpt)).concat(((result.reviews[0].excerpt).concat(result.reviews[0].excerpt)));
            //alert(temp_review_var);
            $scope.result = result;




        });
    }
});




