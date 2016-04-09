var app =  angular.module('main',[]);
app.controller('homeController',function($scope,$http){

    $scope.review_show = false;

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
            //alert(data);
            $scope.review_hide = false;
            document.getElementById("div").style.display="block";
            $scope.data = data;
        });
    }

    $scope.getReviews = function(id){
        $scope.review_hide = true;
        $http({

            method : "POST",
            data : {
                "restaurantId" : id
            },
            url : "/yelp/restaurantinfo"
        }).success(function(result) {
            //alert(result);
            $scope.review_show = true;
            document.getElementById("review").style.display="block";
            $scope.result = _getAllResults(result);
     });
    }
    
    $scope._getAllResults = function (result) {
        var string = "";
        for(var i = 0 ; i < result.reviews.length; i++) {
            string += "\n\n" + result.reviews[i].excerpt;
        }
        return string;
    }
});




