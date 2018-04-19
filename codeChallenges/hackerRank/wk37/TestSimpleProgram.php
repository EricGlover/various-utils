<?php

  declare(strict_types=1);

  use PHPUnit\Framework\TestCase;
  require "./SimpleProgram.php";

  final class SimpleProgramTest extends TestCase
  {
    public function setUp()
    {
      $this->testFile = null;
    }
    public function tearDown()
    {
      fclose($this->testFile);
    }
    public function xtest0()
    {
      $file = "./programs/0.txt";
      $this->testFile = fopen($file, "r");
      fscanf($this->testFile, "%d\n", $n);
      $result = maximumProgramValue($n);
      $expected = 2;
      $this->assertEquals($expected, $result);
    }
  }
