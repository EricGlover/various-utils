<?php

function naiveSort(array $unsorted) {
  sort($unsorted, SORT_NUMERIC);
  return $unsorted;
}

// simple sorting problem on hacker rank
function oldSort(array $unsorted) {
  $sorted = [];
  for($i = 0; $i < count($unsorted); $i++){
    $number = (float) $unsorted[$i];
    $sorted[] = $number;
  }
  sort($sorted);
  //convert back to strings
  $strs = array_map(function(float $num){
    return (string) $num;
  }, $sorted);
  return $strs;
}
//old conversion sorting ...
function floatSort(array $unsorted) {
  usort($unsorted, function(string $a, string $b){
    $num1 = (float) $a;
    $num2 = (float) $b;
    return $num1 <=> $num2;
  });
  return $unsorted;
}

function bigSorting(array $unsorted): array {
  usort($unsorted, function(string $a, string $b): int {
      //each string is guaranteed to be a positive integer
      //so we don't need to consider decimal places
      if(strlen($a) !== strlen($b)){
        return strlen($a) <=> strlen($b);
      }
      //they're the same length, check each digit
      for($i = 0; $i < strlen($a); $i++){
        if( ($a[$i] <=> $b[$i]) !== 0){
          return $a[$i] <=> $b[$i];
        }
      }
      return 0; //they're the same
  });
  return $unsorted;
}

$str = <<<EOT
6
31415926535897932384626433832795
1
3
10
3
5
EOT;

$t = explode("\n", $str);
$results = bigSorting($t);

function test(string $str) {
  return $str;
}
print_r($results);
die();
