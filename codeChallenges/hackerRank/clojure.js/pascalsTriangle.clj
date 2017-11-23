;; GIVEN THE N THE HEIGHT OF THE TRIANGLE
;; PRINT OUT PASCALS TRIANGLE UP TO THE NTH ROW
(def factorial
  (fn [n]
    (loop [cnt n acc 1]
       (if (zero? cnt)
            acc
          (recur (dec cnt) (* acc cnt))))))

;; n! / r!  * (n - r )!
;; where n = row and r = col
(defn calc [row col]
  (/ (factorial row) (* (factorial col) (factorial (- row col)))))
(calc 3 0)
(calc 3 1)
(calc 3 2)
(calc 3 3)
(defn pascal [n]
  (->>
    (range 1 (+ n 1))
    ;;(println)
    (map #(range %))
    ()
    (println)
    ))

(pascal 3)
