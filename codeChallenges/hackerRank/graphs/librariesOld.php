<?php

  /*
  input
2
3 3 2 1
1 2
3 1
2 3
6 6 2 5
1 3
3 4
2 4
1 2
2 3
5 6
*/

  /*
  output
  4
12
*/
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
    // echo "BEFORE UNION \n";
    // var_dump($this);
    // var_dump($b);
    $s = new Set();
    $arr = array_merge(array_keys($this->arr), array_keys($b->arr));
    foreach ($arr as $key) {
      $s->arr[$key] = true;
    }
    // echo "AFTER \n";
    // var_dump($s);
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
//
// function makeMap(array $edges) : Map
// {
//   $map = new Map();
//   array_walk($edges, function(array $edge) use($map) : void {
//     $city1 = $edge[0];
//     $city2 = $edge[1];
//     $cSet = $map->get($city1, new Set());
//     $c2Set = $map->get($city2, new Set());
//     $cSet->add($city2);
//     $c2Set->add($city1);
//   });
//   return $map;
// }

class GraphCollection
{
  /** @var Graph[] **/
  public $graphs;

  public function __construct()
  {
    $this->graphs = [];
  }

  public function addEdge(Edge $edge) : void
  {
    $v1 = $edge->city1;
    $v2 = $edge->city2;
    //find
    // $g1 = $this->findGraph($v1);
    // $g2 = $this->findGraph($v2);
    [$g1, $g2] = $this->findGraphs($v1, $v2);
    if($g1 === $g2 && !empty($g1) && !empty($g2)) {
        $g1->addEdge($edge);
    } else if (!empty($g1) && !empty($g2) && $g1 !== $g2) {
        $merged = $this->mergeGraphs($g1, $g2);
        $this->removeGraphs([$g1, $g2]);
        $this->addGraph($merged);
        $merged->addEdge($edge);
    } else if (empty($g1) && !empty($g2)) {
      $g2->addEdge($edge);
    } else if (empty($g2) && !empty($g1)) {
      $g1->addEdge($edge);
    } else if (empty($g1) && empty($g2)) {
      $graph = new Graph([$edge]);
      $this->addGraph($graph);
    }
  }

  public function removeEdge(Edge $edge) : void
  {

  }

  public function addGraph(Graph $g) : void
  {
    $this->graphs[] = $g;
  }

  public function removeGraphs(array $graphs) : void
  {
    $tmp = array_filter($this->graphs, function(Graph $graph) use($graphs): bool {
      foreach ($graphs as $g) {
        if($graph === $g) {
          return false;
        }
      }
      return true;
    });
    $this->graphs = array_values($tmp);
  }

  public function mergeGraphs(Graph $a, Graph $b) : Graph
  {
    //$cities = array_merge($a->cities, $b->cities);
    $cities = $a->cities->union($b->cities);
    return new Graph([], $cities);
  }

  private function findGraphs(int $v1, int $v2) : array
  {
    $g1 = null;
    $g2 = null;
    foreach ($this->graphs as $graph) {
      if(!$g1 && $graph->has($v1)) {
        $g1 = $graph;
      }
      if(!$g2 && $graph->has($v2)) {
        $g2 = $graph;
      }
      if(!empty($g1) && !empty($g2)) {
        return [$g1, $g2];
      }
    }
    return [$g1, $g2];
  }

  /**
  *
  */
  public function findGraph(int $v) : ?Graph
  {
    /** @var Graph $graph */
    foreach ($this->graphs as $graph) {
      if($graph->has($v)) {
        return $graph;
      }
    }
    return null;
  }
}

class Graph
{
  /** @var Set **/
  public $cities;

  public function __construct(array $edges, Set $cities = null)
  {
    $this->cities = new Set();
    foreach ($edges as $edge) {
      $this->addEdge($edge);
    }
    if(!empty($cities)) {
      $this->cities = $cities;
    }
  }

  public function has(int $city) : bool
  {
    return $this->cities->has($city);
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
  // echo count($graphs) . " graphs " . "\n";
  $total = 0;
  $connectedCities = 0;
  /** @var Graph $graph **/
  foreach ($coll->graphs as $graph) {
    // var_dump($graph);
    //build lib
    $total += $costOfLibraries;
    $n = $graph->getCityCount();
    // echo "n = $n \n";
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
  // echo "# iso = $isolatedCities\n";
  $total += $costOfLibraries * $isolatedCities;
  return $total;
}

$handle = fopen ("php://stdin", "r");
//get queries
fscanf($handle, "%i", $q);

for($a0 = 0; $a0 < $q; $a0++){
  //get basic info for queries
    fscanf($handle, "%i %i %li %li", $numCities, $roads, $c_lib, $c_road);
    $graphs = new GraphCollection();
    for($a1 = 0; $a1 < $roads; $a1++){
        fscanf($handle, "%i %i", $city_1, $city_2);
        $edge = new Edge($city_1, $city_2);
        //find a graph that has the cities
        $foundGraph = $graphs->addEdge($edge);
    }
    // var_dump($graphs);
    //compute answer from graphs
    $cost = computeAnswerFromGraphs($graphs, $c_road, $c_lib, $numCities, $roads);
    //print answer
    echo $cost . "\n";
}
