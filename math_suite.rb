#random maths

def factorial(n)
  #loop-invariants written explicitly for practice
  fact = 1
  k = 2
  #goal of loop find n!
  while n > k - 1
    #loop invariant : (k-1)! = fact
    fact *= k
    k += 1
  end
  return fact
end
