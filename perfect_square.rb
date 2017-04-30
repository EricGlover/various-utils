#perfect_square

#three methods for finding perfect_squares ( of integers, not the much more interesting case of floats)
#1) the obvious way, by using sqrt function
#2) an iterative way, by checking all of n's divisors
#3) using the fundamental theory of arithemtic,
  #if the set of n's prime factors can be split into two identical sets
    #then n is a perfect_square

#TODO : try reading and implementing some of this fancy shit later
#TODO : try your hand at writing some test cases
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
  p = Prime.new()
  #use prime utility to find the array containing all of n's prime factors
    #example
    #p.prime_factor_decomposition( 100 ) = [2,2,5,5]
  prime_factors = p.prime_factor_decomposition( n )

  #split into two hopefully equal arrays
  #note that prime_factors will be in ascending form
  #Algo for this
    #runtime O(n)
    #check each unique value to see if there's an even amount of them
      #if not return false
  i = 0
  #loop invariant prime_factors[i - 1] contains an amount of uniq values
  while (i < prime_factors.size)
    value = prime_factors[i]
    count = 0
    #loop invariant ?
    while (i < prime_factors.size && value == prime_factors[i])
      i += 1
      count += 1
    end
    return false if count.odd?
  end
  return true
end

#shitty test code [true, false, true, false, true]
#puts perfect_square_3?( 100 )
#puts perfect_square_3?( 11 )
#puts perfect_square_3?( 4 )
#puts perfect_square_3?( 111 )
#puts perfect_square_3?( 121 )
