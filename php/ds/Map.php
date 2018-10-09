<?php

class Map
{
    private $arr = [];
    
    public function __construct()
    {
    }
    public function __clone()
    {
      //TODO::
    }
    public function set($key, $val)
    {
      $this->arr[$key] = $val;
    }

    public function get($key, $default = null)
    {
      return $this->arr[$key] ?? $default;
    }
}