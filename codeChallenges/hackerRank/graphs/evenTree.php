<?php

    /**
     * 
//sample input 
10 9
2 1
3 1
4 3
5 2
6 1
7 2
8 6
9 8
10 8
//sample output
2
     */

class Tree {
    /** @var Node $root */
    public $root;

    /** @var Map $nodes */
    public $nodes;

    public function __construct() 
    {
        $this->nodes = new Map();
    }

    public function makeFromEdges(array $edges) : Tree
    {
        //find root 
    }    
}     

class Node {

    /** @var int $id */
    public $id;

    /** @var Node[] $children */
    public $children;

    public function __construct(int $id, ?array $children = []) 
    {
        $this->id = $id;
        $this->children = $children;
    }
}


// Complete the evenForest function below.
// no removing edges between leaves and branches 
// dfs 
// build a tree 
function evenForest(int $t_nodes, int $t_edges,array $t_from, array $t_to) : int ///????
{
    //

}

$fptr = fopen(getenv("OUTPUT_PATH"), "w");

$t_nodes_edges = explode(' ', rtrim(fgets(STDIN)));


$t_nodes = $t_nodes_edges[0];
$t_edges = $t_nodes_edges[1];

$t_from = array();
$t_to = array();

for ($i = 0; $i < $t_edges; $i++) {
    $t_from_to = explode(' ', rtrim(fgets(STDIN)));

    $t_from[] = $t_from_to[0];
    $t_to[] = $t_from_to[1];
}
$res = evenForest($t_nodes, $t_edges, $t_from, $t_to);


fwrite($fptr, $res . "\n");

fclose($fptr);
