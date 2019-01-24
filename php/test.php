<?php

$xml=simplexml_load_file("../sitemap.xml") or die("Error: Cannot create object");

print_r($xml->url[1]);
