<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
// use IceCreamParlor;
require "./IceCreamParlor.php";
/**
*
*/
final class IceCreamParlorTest extends TestCase
{
  // public function setUpBeforeClass()
  // {
  //   //
  // }
  public function setUp()
  {
    //FIGURE THIS SETUP STUFF OUT
    // $a = new IceCreamParlor(10, []);
    $this->parlor = new IceCreamParlor();
  }
  public function tearDown()
  {
    $this->parlor = null;
  }
  public function testSorted()
  {
    $arr = [2,1];
    $this->parlor->setPrices($arr);
    $this->assertEquals([1,2], $this->parlor->getSorted());
  }
  /**
  * @depends testSorted
  *
  */
  public function xtestFind1()
  {
    $sum = 4;
    $prices = [2, 2, 3, 4];
    $num = 2;
    $outcome = $this->parlor->find($num, $sum, $prices);
    $this->assertEquals(0, $outcome);
  }
  public function testTrip1()
  {
    $input = [
      "sum" => 4,
      "prices" => [1,4,5,3,2],
    ];
    $expected = [1,4];
    // $a = new IceCreamParlor($input["sum"], $input["prices"]);
    $this->parlor->setPrices($input["prices"]);
    $this->parlor->sum = $input["sum"];
    $result = $this->parlor->trip();
    $this->assertEquals($expected, $result);

  }
  public function testTrip2()
  {
    $input = [
      "sum" => 4,
      "prices" => [2,2,4,3],
    ];
    $expected = [1,2];
    $this->parlor->setPrices($input["prices"]);
    $this->parlor->sum = $input["sum"];
    $result = $this->parlor->trip();
    var_dump($this->parlor);
    $this->assertEquals($expected, $result);
  }
  // public function testCanHandleSmallInputs()
  // {
  //   $cases = [
  //     [
  //       "input" => [
  //         "sum" => 4,
  //         "prices" => [1,4,5,3,2],
  //       ],
  //       "output" => [1,4],
  //     ],
  //     [
  //       "input" => [
  //         "sum" => 4,
  //         "prices" => [2, 2, 4, 3],
  //       ],
  //       "output" => [1,2],
  //     ],
  //   ];
  //   for($i = 0; $i < count($cases); $i++){
  //     $input = $cases[$i]["input"];
  //     $a = new IceCreamParlor($input["sum"], $input["prices"]);
  //     $result = $a->trip();
  //     $expected = $cases[$i]["output"];
  //     $this->assertEquals($result, $expected);
  //   }
  // }
}
