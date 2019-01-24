<?php

$sitemap = simplexml_load_file('sitemap.xml');

$myNewUri = $sitemap->addChild("url");
$myNewUri->addChild("loc", "http://www.google.com/");
$myNewUri->addChild("lastmod", "2015-01-07T20:50:10+00:00");
$myNewUri->addChild("changefreq", "daily");
$myNewUri->addChild("priority", "2.0");

print_r($sitemap);

?>
