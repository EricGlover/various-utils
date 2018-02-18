<?php


//only encrypt a-z, A-Z
//rotate by K
//functional style
function caesarCipher($s, $k) {
  //our cipher
  $cipher = function($char) use ($k){
    // echo preg_match("/[a-z]|[A-Z]/", $char);
    return chr(ord($char) + $k);
  };
  $tmp = array_map($cipher, str_split($s));
  return implode("", $tmp);
}
$str = "dank";
// $str[0] = "d";
// echo chr(ord($str[0]) + 3);
// echo $str . "\n";
echo caesarCipher($str, 3);
