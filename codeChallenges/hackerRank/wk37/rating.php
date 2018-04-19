<?php

// Complete the averageOfTopEmployees function below.
function averageOfTopEmployees(array $ratings) : float {
  $top = array_filter($ratings, function(int $rating) : int {
    return $rating >= 90;
  });
  $sum = array_reduce($top, function(int $total, int $rating) : int {
    return $total + $rating;
  }, 0);
  $average = $sum / count($top);
  return round($average, 2);
}

$n = 5;
$ratings = [84, 92, 61, 50, 95];
$expected = 93.50;
$result = averageOfTopEmployees($ratings);

echo $expected . "\n";
echo $result . "\n";
var_dump($result);
echo sprintf("%.2f", $result);
printf("%.2f", $result);
