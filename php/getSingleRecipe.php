<?php

require_once 'unirest-php/src/Unirest.php';

$postData = file_get_contents("php://input");
$request = json_decode($postData);

$recipeId = $request->id;

$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/". $recipeId . "/information",
  array(
    "X-RapidAPI-Key" => "509300173dmshf1116c74bcb1dacp18512cjsnf62c5c6f7014"
  )
);
      echo json_encode($response);
  ?>
