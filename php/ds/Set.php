<?php

class Set
{
  private $arr;
  public function __construct()
  {
    $this->arr = [];
  }
  public function add($val) : void
  {
    $this->arr[$val] = true;
  }
  public function has($val) : bool
  {
    return (bool) @$this->arr[$val];
  }
  public function values() : array
  {
    return array_keys($this->arr);
  }
  public function union(Set $b) : Set
  {
    $s = new Set();
    $arr = array_merge(array_keys($this->arr), array_keys($b->arr));
    foreach ($arr as $key) {
      $s->arr[$key] = true;
    }
    return $s;
  }
  public function isEmpty() : bool
  {
    return count(array_keys($this->arr)) === 0;
  }
  public function pop()
  {
    ////
  }
}