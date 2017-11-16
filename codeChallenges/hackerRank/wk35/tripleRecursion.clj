()

(def arr (make-array Integer/TYPE 3))
(def arr2 [1 2 3])
(def arr_2d (make-array Integer/TYPE 3 3))

;; need to print a 2d array out
;; one space between each element
;; \n at the end of every row
(defn print2d [arr]
  (let [p #(print (str % " "))]
    (mapv #(mapv p %) arr)
  )
)


(print2d arr_2d)
(defn p [el] (print (str el " ")))
(mapv p arr2)

(pprint arr)
