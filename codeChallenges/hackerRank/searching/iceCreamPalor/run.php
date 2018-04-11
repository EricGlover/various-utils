<?php

  // use IceCreamParlor;
  require './IceCreamParlor.php';


  $sum = 4;
  $prices = [2,2,4,3];
  // $input = [
  //   "sum" => 4,
  //   "prices" => [2,2,4,3],
  // ];
  $expected = [1,2];
  $a = new IceCreamParlor($sum, $prices);
  $res = $a->trip();
  var_dump($res);
  die();
