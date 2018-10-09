<?php

$dollarBillsYa = 3;

// echo $dollarBillsYa . "\n";

$elephants = 10;
// echo $elephants + $dollarBillsYa . "\n";
$hats = 5;  //int
$str = "hello"; //string
$f = 3.14;  //float
$one = 1.0; //also float

$arr = [1, 2, 3, 5, "a;lksjdf;lakjsdflkja"];
// print_r($arr);

function addAndPrint($a, $b)
{
  return (string) $a + $b . "\n";
}
// echo addAndPrint($elephants, $dollarBillsYa);

if(1 == "1") {
  // echo "true\n";
} else {
  // echo "false\n";
}

function canIBuyBooze(int $age) : string
{
  if($age >= 21){
    return "true";
  } else{
    return "false";
  }
}
echo canIBuyBooze(7);
// function primeFactorDecomposition(int $num) : array
// {
//   $factors = [];
//   $num % $i === 0
//   while($num )
// }
// primeFactorDecomposition(9);

// // Complete the evenForest function below.
// function evenForest($t_nodes, $t_edges, $t_from, $t_to) {
//
//
// }
//
//
// $fptr = fopen(getenv("OUTPUT_PATH"), "w");
// $t_nodes_edges = explode(' ', rtrim(fgets(STDIN)));
// $t_nodes = $t_nodes_edges[0];
// $t_edges = $t_nodes_edges[1];
//
//
// $t_from = array();
// $t_to = array();
//
// for ($i = 0; $i < $t_edges; $i++) {
//     $t_from_to = explode(' ', rtrim(fgets(STDIN)));
//
//     $t_from[] = $t_from_to[0];
//     $t_to[] = $t_from_to[1];
// }
//
// $res = evenForest($t_nodes, $t_edges, $t_from, $t_to);
//
// fwrite($fptr, $res . "\n");
//
// fclose($fptr);
