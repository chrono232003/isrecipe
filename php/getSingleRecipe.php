<?php

require_once 'unirest-php/src/Unirest.php';

$postData = file_get_contents("php://input");
$request = json_decode($postData);

$recipeId = $request->id;
$recipeTitle = $request->title;


//check for duplicates
$siteString = file_get_contents("../sitemap.xml");
if (strpos($siteString, $recipeId) == false) {
  //store link to sitemap.xml
  $sitemap = simplexml_load_file('../sitemap.xml');
  $myNewUri = $sitemap->addChild("url");
  $url = "https://isrecipe.com/recipe.html?id=" . $recipeId ."&title=" . $recipeTitle;
  $myNewUri->addChild("loc", htmlspecialchars($url));
  $myNewUri->addChild("lastmod", date('c',time()));
  $myNewUri->addChild("changefreq", "daily");
  $myNewUri->addChild("priority", "1.00");

  //$sitemap->asXml("../sitemap.xml");
  $dom = new DOMDocument('1.0');
  $dom->loadXML($sitemap->asXML());
  $dom->formatOutput = true;
  $dom->save("../sitemap.xml");
}
$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/". $recipeId . "/information",
  array(
    "X-RapidAPI-Key" => "509300173dmshf1116c74bcb1dacp18512cjsnf62c5c6f7014"
  )
);
      echo json_encode($response);
  ?>
