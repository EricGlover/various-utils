<?php

declare(strict_types=1);

use PHPUnit\Framework\testCase;

// require ("./DynamicLineIntersection.php");
require ("./hashIt.php");

final class DynamicLineIntersectionTest extends TestCase
{
  public function testCanSubtract()
  {
    $fileName = "./lines/2.txt";
    $stdin = fopen($fileName, "r");
    fscanf($stdin, "%d\n", $n);
    echo "\n";
    ob_start();
    main($stdin, $n);
    $result = ob_get_clean();
    $expected = "0\n1\n";
    $this->assertEquals($expected, $result);
    fclose($stdin);
  }
  public function xtestReadCommand()
  {
    $line = "+ 1 0";
    $expected = ["add", 1, 0];
    $result = readCommand($line);
    $this->assertEquals($expected, $result);

    $line = "+ 2 0";
    $expected = ["add", 2, 0];
    $result = readCommand($line);
    $this->assertEquals($expected, $result);

    $line = "? 1";
    $expected = ["query", 1];
    $result = readCommand($line);
    $this->assertEquals($expected, $result);

    $line = "? 2";
    $expected = ["query", 2];
    $result = readCommand($line);
    $this->assertEquals($expected, $result);

    $line = "- 1 0";
    $expected = ["subtract", 1, 0];
    $result = readCommand($line);
    $this->assertEquals($expected, $result);

    $line = "- 2 2";
    $expected = ["subtract", 2, 2];
    $result = readCommand($line);
    $this->assertEquals($expected, $result);
  }
  public function xtestLineIntersection1()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 2];
    //returns a point [x,y]
    $expected = [2,2];
    $result = lineIntersection($line1, $line2);
    $this->assertEquals($expected, $result);
  }
  public function xxtestLineIntersection2()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 1];
    //returns a point [x,y]
    $expected = [1,1];
    $result = lineIntersection($line1, $line2);
    $this->assertEquals($expected, $result);
  }
  public function xtestLineIntersectionAtIntX1()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 2];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertTrue($result);
  }
  public function xtestLineIntersectionAtIntX2()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 1];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertTrue($result);
  }
  public function xtestLineIntersectionAtIntXFindsFloats()
  {
    // y = mx + b
    $line1 = [2, 0];
    $line2 = [0, 1];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertFalse($result);
  }
  public function xtestLineIntersectionAtIntXFindsFloats2()
  {
    // y = mx + b
    $line1 = [2, 0];
    $line2 = [0, 2];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertTrue($result);
  }



}
