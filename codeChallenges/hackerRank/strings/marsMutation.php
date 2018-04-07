<?php


function marsExploration($s) {
  $changed = 0;
  for($i = 0; $i < strlen($s); $i += 3){
    if ($s[$i] !== "S") $changed++;
    if ($s[$i + 1] !== "O") $changed++;
    if ($s[$i + 2] !== "S") $changed++;
  }
  return $changed;
}
