;; found this in the clojure docs
(def factorial
  (fn [n]
    (loop [cnt n acc 1]
       (if (zero? cnt)
            acc
          (recur (dec cnt) (* acc cnt))))))


;; investigation

;; found this in the clojure docs
(def factorial
  (fn [n]
    (loop [cnt n acc 1]
       (do
         (println cnt acc)
         (if (zero? cnt)
            acc
          (recur (dec cnt) (* acc cnt)))
         ))))

(defn t [n]
  (loop [i 0]
    (
        (println i)
        (if (= i n)
        nil
        (recur (inc i))))))

;; functional loops sux
(defn t [n]
  (loop [i 0]
    (if (= i n)
      i
      (recur (inc i)))))
