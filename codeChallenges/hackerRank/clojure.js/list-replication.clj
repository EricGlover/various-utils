(defn replic [num lst] (apply println lst))

(defn replic [num lst] (map #(repeat num %) lst) )
(map #(conj %) '(1 2 3) '(4 5 6))
(replic 2 '(1 2 3))
; ((1 1) (2 2) (3 3))
 (defn rep [num lst] (dotimes [i num] ()))

 (rep 1 '(1 2 3))


(defn replic [num lst] (map #(repeat num %) lst) )
(replic 2 '(1 2 3))

(defn t [num lst]
  (->>
    (map #(repeat num %) lst)
    (flatten)
  )
)
;; answer
(fn [num lst]
  (flatten (map #(repeat num %) lst) )
)
;; answer 
(t 2 '(1 2 3))
(defn replic [num lst]
  ())

(replic 2 '(1 2 3))
 ;(fn[num lst]___________________________)
 (defn replic )
