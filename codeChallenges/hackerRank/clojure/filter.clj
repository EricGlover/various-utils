;; write a custom filter function
(ns test
  (:require
    [clojure.string :as str]
    [clojure.set :as set]))

;; should work like this
(filter odd? '(1 2 3))


(fn [delim lst] )

(defn myFilter
  [delim lst]
  (map #(when (< % delim) %) lst)
)
(myFilter 2 '(12))
(myFilter 2 1)
(myFilter 3 '(1 2 3 4))

(assert (= (filter #(< % 3) '(1 2 3 4)) (myFilter 3 '(1 2 3 4))  ))
(filter #())
