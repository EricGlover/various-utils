<?php

  //testing tree functions in php
  class Node
  {
    private $data;
    private $children;
    public $id;

    public function &getData()
    {
      return $this->data;
    }
    public function &getChildren()
    {
      return $this->children;
    }

    public function __construct($data = null, array $children = [], int $id, string $s = "")
    {
      $this->id = $id;
      if(strlen($s) > 0) {
        $data = ["sequenceNumber" => $s];
      }
      $this->data = $data;
      $this->children = $children;
    }
  }

  /**
   *
   */
  class Tree
  {
    private $root;

    public function __construct()
    {
      $this->root = new Node(null, [], 0);
    }

    public function findNode(int $id, string $sequence)
    {

    }

    /**
    * @param Nodes[] $nodes
    */
    public function make(array $nodes) : void
    {
      for($i = 0; $i < count($nodes); $i++) {
        $node = $nodes[$i];
        $this->root->getChildren()[$node->getData()["sequenceNumber"]] = $node;
      }
    }
    public function print()
    {
      var_dump($this);
    }
  }
  function generateId(){
    $id = 1;
    while(true) {
      yield $i;
    }
  }
  $i = 1;
  $idMaker = generateId();
  // var_dump($idMaker;
  // die();
  $a = new Node("a", [], $i++, "1");
  $b = new Node("b", [], $i++, "2");
  $c = new Node("c", [], $i++, "3");
  $tree = new Tree();
  $tree->make([$a, $b, $c]);
  $tree->print();
