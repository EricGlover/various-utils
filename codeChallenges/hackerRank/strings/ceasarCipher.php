<?php
//status : solved

//only encrypt a-z, A-Z
//rotate by K
//functional style
function caesarCipher($s, $k) {
  //our cipher function
  $cipher = function($char) use ($k){
    if (preg_match("/[a-z]/", $char)){
      $isUpper = false;
      $low = ord("a");
    }else if (preg_match("/[A-Z]/", $char)) {
      $isUpper = true;
      $low = ord("A");
    }else {
      return $char;
    }
    //letters are 0 - 25
    $num = ord($char) - $low;
    //rotate
    $num += $k;
    //wrap it back around if need be
    if ($num > 25) $num = $num % 26;
    return chr($num + $low);
  };
  $tmp = array_map($cipher, str_split($s));
  return implode("", $tmp);
}


//my amazing test suite 
$str = "dank";
echo caesarCipher($str, 3) . "\n";
$str = "ABC";
echo caesarCipher($str, 2) . "\n";
