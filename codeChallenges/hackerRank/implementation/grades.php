<?php

  //grades [0 - 100]
  //fail : grade < 40


  //rounding rules
  //1) if grade is less than 38 then no rounding
  //2) if next multiple of 5 - grade < 3, then round up

function roundGrade(int $grade): int{
  //rule #1
  if ($grade < 38) return $grade;

  //rule #2
  //find the nearest multiple of five > grade
  for ($i = 5; $i <= 100; $i += 5){
    if ($i >= $grade) {
      if ($i - $grade < 3) return $i;
      return $grade;
    }
  }
  //return Error
}

function solve(array $grades){
  foreach ($grades as $i => $_) {
    $grades[$i] = roundGrade($grades[$i]);
  }
  return $grades;
}


//what did I learn...
/*


*/
