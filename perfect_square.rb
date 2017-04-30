#perfect_square

#three methods for finding perfect_squares ( of integers, not the much more interesting case of floats)
#1) the obvious way, by using sqrt function
#2) an iterative way, by checking all of n's divisors
#3) using the fundamental theory of arithemtic,
  #if the set of n's prime factors can be split into two identical sets
    #then n is a perfect_square

#TODO : try reading and implementing some of this fancy shit later
#https://betterexplained.com/articles/understanding-quakes-fast-inverse-square-root/


def perfect_square_1?(n)
  p = Math.sqrt(n)
  return true if p == p.truncate
  return false
end

def perfect_square_2?(n)
  (2 .. (n/2) ).each do |i|
    return true if i * i == n
  end
  return false
end

def perfect_square_3?(n)
  require './prime.rb'
  
