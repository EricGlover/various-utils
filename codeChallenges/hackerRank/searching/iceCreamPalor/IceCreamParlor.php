<?php

  // namespace IceCreamParlor;
  //status: fuck I'm bad at php,
  //I can write a double for loop solution in 2 seconds
  //but in 3 hours I can't write a solution using array functions

  /**
   *
   */
  class IceCreamParlor
  {
    /** @var int */
    public $sum;
    /** @var int[] */
    private $prices;
    /** @var int[] */
    private $sorted;

    /**
    * @param int[] $prices
    **/
    public function setPrices(array $prices) : void
    {
      $this->prices = $prices;
      //also set sorted
      $this->setSorted($this->prices);
    }
    /**
    * @param int[] $prices
    */
    private function setSorted(array $prices) : void
    {
      sort($prices);
      $this->sorted = $prices;
    }

    public function getPrices() : array
    {
      return $this->prices;
    }
    public function getSorted() : array
    {
      return $this->sorted;
    }

    public function __construct(int $sum = null, array $prices = [])
    {
      if($sum){
        $this->sum = $sum;
      }
      if(count($prices) > 0){
        $this->setPrices($prices);
      }
    }
    //this, sadly enough, solves the challenge....
    private function doubleForLoop(): array
    {
      for($i = 0; $i < count($this->prices); $i++){
        $price = $this->prices[$i];
        $findAmount = $this->sum - $price;
        for($j = 0; $j < count($this->prices); $j++){
          if($i === $j) continue;
          if($this->prices[$j] + $price === $this->sum){
            $answer = [$i + 1, $j + 1];
            sort($answer);
            return $answer;
          }
        }
      }
      return [];
    }

    //returns a sorted array of indices from the price array (1 based indices)
    //that sum to the sum
    public function trip(): array
    {
      return $this->doubleForLoop();

      // $sum = $this->sum;
      // $found = false;
      echo "sorted\n";
      var_dump($this->sorted);
      for($i = 0; $i < count($this->prices); $i++) {
        $price = $this->prices[$i];
        $needle = $this->find($price, $this->sum, $this->prices);
        var_dump($price);
        if($needle) {
          $answer = [$i + 1, $needle + 1];
          var_dump($i);
          var_dump($needle);
          var_dump($this->prices);
          $price1 = $this->prices[$i];
          $price2 = $this->prices[$needle];
          $sum = $this->prices[$i] + $this->prices[$needle];
          echo "sum = $sum";
          //look them up in the original
          $a = array_search($price1, $this->prices);
          $b = array_search($price2, $this->prices);
          $answer = [$a + 1, $b + 1];
          sort($answer);
          return $answer;
        }
      }
      return [];
      //TODO: try this using fp
      // array_walk($this->prices, function(int $price) use ($sum): void {
      //   $needle = $this->find($price);
      //   if($needle){
      //
      //   }
      // })
    }

    //given an int, find a price that totals to the sum
    //TODO::: uses binary search
    //returns the index of the price from the array
    public function find(int $num) : ?int
    {
      $n = $this->sum - $num;
      array_search($this->sum - $num, $this->prices);
      $idx = array_search($n, $this->sorted);
      $idx = null;
      for($i = 0; $i < count($this->sorted); $i++){
        if($this->sorted[$i] === $n){
          // $idx = $i;
          for($j = 0; $j < count($this->prices); $j++){
            if($this->prices[$j] === $i){
              return $j;
            }
          }
        }
      }
      return null;
      // $priceIdx = null;
      // if($idx) {
      //   $price = $this->sorted[$idx];
      //   $priceIdx = array_search($price, $this->prices);
      // }
      // return $priceIdx;
    }
  }
