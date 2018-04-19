<?php
  declare(strict_types=1);
/*
 * Complete the maximumProgramValue function below.
 */
function maximumProgramValue(array &$lines): int {
  //set initial value
  $x = 0;
  $next = $x;
  $ignoredCommands = 0;
  for($i = 0; $i < count($lines); $i++){
    $line = $lines[$i];
    list($command, $arg) = sscanf($line, "%s %d");
    // var_dump($command);
    // var_dump($arg);
    switch ($command) {
      case 'add':
        $next = $x + $arg;
        break;
      case "set":
        $next = $arg;
        break;
      default:
        error_log("strange command = " . $command);
        break;
    }
    if($next < $x) {
      //ignore the command
      $ignoredCommands++;
    } else {
      //execute the command
      $x = $next;
    }
  }
  return $x;
}

/** reads stdin, tokenizes into an array of commands
*
*
*/
function readLines($fptr) : array {
  $lines = [];
  while(! feof($fptr) ) {
      $line = fgets($fptr);
      //if it's a bool then we're done
      if(is_bool($line)) {
        break;
      }
      $line = trim($line);
      if(!empty($line)){
        $lines[] = $line;
      }
  }
  return $lines;
}
// $lines = readLines($stdin);
$file = fopen("./programs/0.txt", "r");
fscanf($file, "%d\n", $n);
$lines = readLines($file);

$result = maximumProgramValue($lines);
echo $result . "\n";
fclose($file);
// var_dump($n);
// var_dump($lines);

// $fptr = fopen(getenv("OUTPUT_PATH"), "w");
//
// $stdin = fopen("php://stdin", "r");
//
// fscanf($stdin, "%d\n", $n);
//
// $result = maximumProgramValue($n);
//
// fwrite($fptr, $result . "\n");
//
// fclose($stdin);
// fclose($fptr);
