<?php

//something is wrong
//TODO: WRITE SOME UNIT TESTS

// $handle = fopen ("php://stdin", "r");
//TODO: DO THIS RECURSIVELY NEXT TIME
function passwordCracker(array $pass, string $attempt) :string {
  $passHash = [];
  array_walk($pass, function(string $password, int $idx) use(&$passHash):void {
    $passHash[$password] = true;
  });
  // var_dump($passHash);
  // die();
  $str = "";
  $found = [];
  for($i = 0; $i < strlen($attempt); $i++){
    $char = $attempt[$i];
    $str = $str . $char;
    if( isset($passHash[$str]) ){
      // echo "$str\n";
      $found[] = $str;
      $str = "";
    }
  }
  // die();
  if(strlen($str) === 0){
    return implode(" ", $found);
  }else {
    return "WRONG PASSWORD";
  }
}
$pass = ["ozkxyhkcst", "xvglh", "hpdnb", "zfzahm"];
$attempt = "zfzahm";
$expected = "zfzahm";
$result = passwordCracker($pass, $attempt);
echo "result $result\n";
echo "expected : $expected\n";

$pass = ["because", "can", "do", "must", "we", "what"];
$attempt = "wedowhatwemustbecausewecan";
$expected = "we do what we must because we can";
$result = passwordCracker($pass, $attempt);
echo "result: $result\n";
echo "expected : $expected\n";
//
//
// fscanf($handle, "%i",$t);
// for($a0 = 0; $a0 < $t; $a0++){
//     fscanf($handle, "%i",$n);
//     $pass_temp = fgets($handle);
//     $pass = explode(" ",$pass_temp);
//     fscanf($handle, "%s",$attempt);
//     $result = passwordCracker($pass, $attempt);
//     echo $result . "\n";
// }
