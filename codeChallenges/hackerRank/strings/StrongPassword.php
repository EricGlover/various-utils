<?php

use PHPUnit\Framework\TestCase;

$numbers = "0123456789";
$numArr = str_split($numbers);
// define("numbers", "0123456789");
$lower_case = "abcdefghijklmnopqrstuvwxyz";
$upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
$special_characters = "!@#$%^&*()-+";

function hasNumber(string $str): bool {
  $numbers = "0123456789";
  $numArr = str_split($numbers);
  $chars = str_split($str);
  for ($i=0; $i < count($chars); $i++) {
    $char = $chars[$i];
    if(in_array($char, $numArr)) {
      return true;
    }
  }
  return false;
};

function has(string $str, string $charSet) : bool {
  $chars = str_split($str);
  $charSetArr = str_split($charSet);
  $union = array_intersect($chars, $charSetArr);
  if(count($union) > 0) {
    return true;
  }
  return false;
}

/** Return the minimum number of characters to make the password strong
* @param int $n
* @param string $password
* @return int
*/
function minimumNumber(int $n, string $password): int {
  $numbers = "0123456789";
  $lower_case = "abcdefghijklmnopqrstuvwxyz";
  $upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $special_characters = "!@#$%^&*()-+";

  $needs = 0;

  $hasNumber = has($password, $numbers);
  if(!$hasNumber) $needs++;

  $hasLowerCase = has($password, $lower_case);
  if(!$hasLowerCase) $needs++;

  $hasUpperCase = has($password, $upper_case);
  if(!$hasUpperCase) $needs++;

  $hasSpecialChar = has($password, $special_characters);
  if(!$hasSpecialChar) $needs++;


  if(strlen($password) < 6){
    $short = 6 - strlen($password);
    if($short > $needs) {
      $needs = $short;
    }
  }

  return $needs;
}

// fscanf($handle, "%i",$n);
// fscanf($handle, "%s",$password);
// $answer = minimumNumber($n, $password);
// echo $answer . "\n";

class PasswordTest extends TestCase
{
    public function testCase1()
    {
        $n = 3;
        $password = "Ab1";
        $expected = 3;
        $result = minimumNumber($n, $password);
        $this->assertEquals($expected, $result);
    }
    public function testCase2()
    {
        $n = 11;
        $password = "#HackerRank";
        $expected = 1;
        $result = minimumNumber($n, $password);
        $this->assertEquals($expected, $result);
    }
}
