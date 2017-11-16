(defn replic [num lst] (apply println lst))

(defn replic [num lst] (map #(repeat num %) lst) )
(map #(conj %) '(1 2 3) '(4 5 6))
(replic 2 '(1 2 3))
; ((1 1) (2 2) (3 3))
 (defn rep [num lst] (dotimes [i num] ()))

 (rep 1 '(1 2 3))
