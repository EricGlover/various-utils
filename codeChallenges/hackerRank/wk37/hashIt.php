<?php
declare(strict_types=1);

function main($stdin, $n){
  $lines = [];
  $output = "";
  $input = [];
  for($i = 0; $i < $n; $i++){
    $strFromStdin = fgets($stdin);
    $strFromStdin = trim($strFromStdin);
    $input[] = $strFromStdin;
  }

  for($i = 0; $i < $n; $i++){
    $strFromStdin = $input[$i];

    //read the cammand
    $arr = explode(" ", $strFromStdin);
    $command = $arr[0];
    //execute command
    switch($command) {
        case "?":
          $q = $arr[1];
          $line2 = [0, $q];
          $total = 0;
          foreach ($lines as $m => $bArr) {
            foreach ($bArr as $b => $numberOfLines) {
              if($numberOfLines <= 0){
                continue;
              }
              //intersecting lines check
              $x = ((int) $q - (int) $b) / (int) $m;
              if(is_int($x)) {
                $total += $numberOfLines;
              }
            }
          }
          $intersectingLines = $total;
          $output = $output . $intersectingLines . "\n";
          break;
        case "+":
          $m =  $arr[1];
          $b = $arr[2];
          //a
          // $lines[$m][$b] = 0;
          // //b
          if(!isset($lines[$m])){
            $lines[$m] = [];
          }
          //overlapping lines
          if(!isset($lines[$m][$b])){
            $lines[$m][$b] = 0;
          }
          $lines[$m][$b]++;
          break;
        case "-":
          $m = $arr[1];
          $b = $arr[2];
          $lines[$m][$b]--;
          break;
        default:
          echo "ERROR";
          return [];
    }
  }
  echo $output;
}
$stdin = fopen("php://stdin", "r");

fscanf($stdin, "%d\n", $n);

main($stdin, $n);

fclose($stdin);

// function lineIntersectionAtIntX($m1, $b1, $m2, $b2): bool
// {
//   $x = ($b2 - $b1) / $m1;
//   return is_int($x);
// }
// function lineIntersectionAtIntX($line1, $line2): bool
// {
//   list($m1, $b1) = $line1;
//   list($m2, $b2) = $line2;
//   $x = ($b2 - $b1) / $m1;
//   return is_int($x);
// }

// function getLine($resource): string {
//   if(! feof($resource) ){
//     $line = fgets($resource);
//     $line = trim($line);
//     return $line;
//   }
//   return "";
// }

// function readCommand(string $str): array
// {
//   $str = trim($str);
//   $arr = explode(" ", $str);
//   $command = $arr[0];
//   switch($command) {
//       case "?":
//         $command = "query";
//         $q = (int) $arr[1];
//         return [$command, $q];
//       case "+":
//         $command = "add";
//         $m = (int) $arr[1];
//         $b = (int) $arr[2];
//         return [$command, $m, $b];
//       case "-":
//         $command = "subtract";
//         $m = (int) $arr[1];
//         $b = (int) $arr[2];
//         return [$command, $m, $b];
//       default:
//         echo "ERROR";
//         return [];
//   }
// }
// $stdin = fopen("php://stdin", "r");
//
// fscanf($stdin, "%d\n", $n);
//
// main($stdin, $n);
//
// fclose($stdin);
