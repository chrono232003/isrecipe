<?php

require_once 'unirest-php/src/Unirest.php';

$postData = file_get_contents("php://input");
$request = json_decode($postData);

$searchParams = $request->search;

$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&type=main+course&query=" . $searchParams,
array(
  "X-RapidAPI-Key" => "509300173dmshf1116c74bcb1dacp18512cjsnf62c5c6f7014"
)
);
      echo json_encode($response);
  ?>
