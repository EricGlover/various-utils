<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

require ("./DynamicLineIntersection.php");

final class DynamicLineIntersectionTest extends TestCase
{
  public function testReadCommand()
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
  public function testLineIntersection1()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 2];
    //returns a point [x,y]
    $expected = [2,2];
    $result = lineIntersection($line1, $line2);
    $this->assertEquals($expected, $result);
  }
  public function testLineIntersection2()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 1];
    //returns a point [x,y]
    $expected = [1,1];
    $result = lineIntersection($line1, $line2);
    $this->assertEquals($expected, $result);
  }
  public function testLineIntersectionAtIntX1()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 2];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertTrue($result);
  }
  public function testLineIntersectionAtIntX2()
  {
    // y = mx + b
    $line1 = [1, 0];
    $line2 = [0, 1];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertTrue($result);
  }
  public function testLineIntersectionAtIntXFindsFloats()
  {
    // y = mx + b
    $line1 = [2, 0];
    $line2 = [0, 1];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertFalse($result);
  }
  public function testLineIntersectionAtIntXFindsFloats2()
  {
    // y = mx + b
    $line1 = [2, 0];
    $line2 = [0, 2];
    //returns a bool
    $result = lineIntersectionAtIntX($line1, $line2);
    $this->assertTrue($result);
  }



}
