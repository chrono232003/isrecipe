(function() {
	var app = angular.module('home', ['ngCookies', 'ngSanitize']);

	//directives
	// app.directive('header', function() {
	// 	return {
	// 		restrict:"E",
	// 		templateUrl:"directives/header.html"
	// 	}
	// });
	//
	// app.directive('footer', function() {
	// 	return {
	// 		restrict:"E",
	// 		templateUrl:"directives/footer.html"
	// 	}
	// });

 app.controller('GetRecipeController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {

	 function conditionRecipeUrl(data) {
			for (var i = 0; i < data.length; i++) {
				data[i].image = "https://spoonacular.com/recipeImages/" + data[i].image;
				data[i].url = "recipe.html?id=" + data[i].id + "&title=" + data[i].title;
			}
			return data;
		}

		function conditionSingleRecipeUrl(data) {
 			for (var i = 0; i < data.length; i++) {
 				data[i].url = "recipe.html?id=" + data[i].id + "&title=" + data[i].title;
 			}
 			return data;
 		}

	 $scope.getRecipes = () => {
		 var request = $http({
			 method: "post",
			 url: "php/getRecipes.php",
			 data: {
				 search: $scope.search
			 },
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		 })

		 request.then(function(response) {
			 	var stuff = response.data["raw_body"];
				 $scope.recipeList = conditionRecipeUrl(JSON.parse(stuff)["results"]);
				 console.log("recipes:" + $scope.recipeList);
		 }).catch(function(e) {
				 console.log("Error: " + e);
		 });
	 };

	 var requestRand = $http({
		 method: "get",
		 url: "php/getRandomRecipes.php",
		 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	 })

	 requestRand.then(function(response) {
			var randData = response.data["raw_body"];
			if (randData) {
			 var randObj = conditionSingleRecipeUrl(JSON.parse(randData)["recipes"]);
			 $scope.randRecipeData = randObj;
			 console.log("Rand recipe data:" + randData);
		 }
	 }).catch(function(e) {
			 console.log("Error: " + e);
	 });

 }]);

 app.controller('GetSingleRecipeController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {

	 function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
	 function getRecipeId() {
			return getParameterByName('id')
		}

		 var request = $http({
			 method: "post",
			 url: "php/getSingleRecipe.php",
			 data: {
				 id: getRecipeId()
			 },
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		 })

		 request.then(function(response) {
			 	var data = response.data["raw_body"];
				if (data) {
				 var obj = JSON.parse(data);
				 $scope.recipeData = obj;
				 console.log("recipe data:" + data);
			 }
		 }).catch(function(e) {
				 console.log("Error: " + e);
		 });

 }]);

})();
