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

class AdjList
{
  /** @var array $arr */
  public $arr = [];

  public function __construct()
  {
  }

  public function get(int $key, ?Set $default = null) : Set
  {
    $val = &$this->arr[$key];
    if(empty($default)) {
      $default = new Set();
    }
    if(empty($val)) {
      $val = $default;
      $this->arr[$key] = $default;
    }
    return $val;
  }

  public function set(int $key, Set $val) : void
  {
    $this->arr[$key] = $val;
  }
}

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

class GraphCollection
{
  /** @var Graph[] **/
  public $graphs;

  /** @var AdjList **/
  public $adjList;

  public function __construct()
  {
    $this->adjList = new AdjList();
    $this->graphs = [];
  }

  public function addEdge(Edge $edge) : void
  {
    $s1 = $this->adjList->get($edge->city1);
    $s1->add($edge->city2);
    $s2 = $this->adjList->get($edge->city2);
    $s2->add($edge->city1);
  }

  /**
  * @return Graph[]
  */
  public function makeGraphs() : array
  {
    $visited = new Set();

    //go over the adj list
    //keep track of visited cities
    //each new unvisited city make a graph
    //make a queue to walk through the connected cities
    //add the connected cities to visited and the new graph
    array_walk($this->adjList->arr, function(Set $adjacent, int $city) use($visited) : void {
      if($visited->has($city)) {
        return;
      }
      $g = new Graph();
      $this->graphs[] = $g;
      $connectedCities = new Set();
      $cityStack = [$city];
      while(!empty($cityStack)) {

        $current = array_pop($cityStack);

        //if already in graph then skip
        if($connectedCities->has($current)) {
          continue;
        }

        //add the city
        $visited->add($current);
        $connectedCities->add($current);
        $adjacentToCurrent = $this->adjList->get($current) ?? new Set();

        //add the adjacent cities
        $cityStack = array_merge($cityStack, $adjacentToCurrent->values());
      }
      $g->addCities($connectedCities->values());
    });
    return $this->graphs;
  }
}

class Graph
{
  /** @var Set **/
  public $cities;

  public function __construct()
  {
    $this->cities = new Set();
  }

  public function has(int $city) : bool
  {
    return $this->cities->has($city);
  }

  /**
  * @param int[] $cities
  * @return void
  */
  public function addCities(array $cities) : void
  {
    foreach ($cities as $city) {
      $this->cities->add($city);
    }
  }

  public function addEdge(Edge $edge) : void
  {
    $this->cities->add($edge->city1);
    $this->cities->add($edge->city2);
  }

  public function getEdgeCount() : int
  {

  }
  public function getCityCount() : int
  {
    return count($this->cities->values());
  }
}

class Edge
{
  /** @var int **/
  public $city1;
  /** @var int **/
  public $city2;

  public function __construct(int $city1, int $city2)
  {
    $this->city1 = $city1;
    $this->city2 = $city2;
  }
}


function computeAnswerFromGraphs(GraphCollection $coll, int $costOfRoads, int $costOfLibraries, int $cities, int $roads) : int
{
  $total = 0;
  $connectedCities = 0;
  
  /** @var Graph $graph **/
  foreach ($coll->graphs as $graph) {
    //build lib
    $total += $costOfLibraries;
    $n = $graph->getCityCount();
    $connectedCities += $n;

    if($costOfLibraries <= $costOfRoads) {
      //build n - 1 more libraries
      $total += ($n - 1) * $costOfLibraries;
    } else {
      //build n - 1 more roads
      $total += ($n - 1) * $costOfRoads;
    }
  }

  //add isolated cities
  $isolatedCities = $cities - $connectedCities;
  $total += $costOfLibraries * $isolatedCities;

  return $total;
}

// $handle = fopen ("php://stdin", "r");
$handle = fopen("input.txt", "r");
//get queries
fscanf($handle, "%i", $q);

for($a0 = 0; $a0 < $q; $a0++){
  //get basic info for queries
    fscanf($handle, "%i %i %li %li", $numCities, $roads, $c_lib, $c_road);
    $graphs = new GraphCollection();
    for($a1 = 0; $a1 < $roads; $a1++){
        fscanf($handle, "%i %i", $city_1, $city_2);
        $edge = new Edge($city_1, $city_2);
        $graphs->addEdge($edge);
    }
    $graphs->makeGraphs();
    //compute answer from graphs
    $cost = computeAnswerFromGraphs($graphs, $c_road, $c_lib, $numCities, $roads);
    //print answer
    echo $cost . "\n";
}
