<?php
declare(strict_types=1);

function main($stdin, $n){
  $lines = [];

  for($i = 0; $i < $n; $i++){
    $str = getLine($stdin);
    $arr = readCommand($str);
    $command = $arr[0];
    switch($command) {
        case "query":
          $q = $arr[1];
          $b = $q;
          $line2 = [0, $b];
          //for loop it
          $total = 0;
          for($j = 0; $j < count($lines); $j++){
            if($lines[$j] === null || $lines[$j][0] === null || $lines[$j][1] === null){
              continue;
            }
            //the order of the lines matters in this function
            $intersects = lineIntersectionAtIntX([$lines[$j][0], $lines[$j][1]], $line2);
            if($intersects) {
              $total++;
            }
          }
          $intersectingLines = $total;
          // //clean ish code
          // $intersectingLines = array_reduce($lines, function(int $total, array &$line1) use (&$line2) : int {
          //   //skip nulls
          //   if($line1 === null || $line1[0] === null || $line1[1] === null){
          //     return $total;
          //   }
          //   //the order of the lines matters in this function
          //   $intersects = lineIntersectionAtIntX($line1, $line2);
          //   if($intersects) {
          //     return $total + 1;
          //   }
          //   return $total;
          // }, 0);
          echo $intersectingLines . "\n";
          // var_dump($lines);
          break;
        case "add":
          list($command, $m, $b) = $arr;
          $lines[] = [$m, $b];
          break;
        case "subtract":
          list($command, $m, $b) = $arr;
          //set to null optimization
          for($i = 0; $i < count($lines); $i++){
            $same = $lines[$i][0] === $m && $lines[$i][1] === $b;
            if($same){
              $lines[$i][0] = null;
              $lines[$i][1] = null;
            }
          }
          //clean code
          // $lines = array_filter($lines, function(array $line) use ($m, $b) : bool {
          //   $same = $line[0] === $m && $line[1] === $b;
          //   return !$same;
          // });
          break;
        default:
          echo "ERROR";
          return [];
    }
  }
}
function lineIntersectionAtIntX($line1, $line2): bool
{
  list($m1, $b1) = $line1;
  list($m2, $b2) = $line2;
  $x = ($b2 - $b1) / $m1;
  return is_int($x);
}

function getLine($resource): string {
  if(! feof($resource) ){
    $line = fgets($resource);
    $line = trim($line);
    return $line;
  }
  return "";
}

function readCommand(string $str): array
{
  $str = trim($str);
  $arr = explode(" ", $str);
  $command = $arr[0];
  switch($command) {
      case "?":
        $command = "query";
        $q = (int) $arr[1];
        return [$command, $q];
      case "+":
        $command = "add";
        $m = (int) $arr[1];
        $b = (int) $arr[2];
        return [$command, $m, $b];
      case "-":
        $command = "subtract";
        $m = (int) $arr[1];
        $b = (int) $arr[2];
        return [$command, $m, $b];
      default:
        echo "ERROR";
        return [];
  }
}
$stdin = fopen("php://stdin", "r");

fscanf($stdin, "%d\n", $n);

main($stdin, $n);

fclose($stdin);
