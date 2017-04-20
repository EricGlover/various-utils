#require 'pry'

class Prime
  #10 000 000 , 10 ^ 8 runtimes
  #brute_force : 74.860748 seconds
  #sieve : 2.376461 seconds
  #
  #100 000 000 000 , 10 ^ 12 runtimes
  #Killed: 9
  #10000000000

  # TODO: consider changing instance methods to class methods
  # TODO: check whether the size of bool arrays in Ruby (B[].size) > (C[].size) character arrays
    #
  # TODO: rewrite sieve to reuse chunks of memory
    #
  @@primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ]

  def intitialize()
    #..
    #binding.pry
  end

  #brute division checking for primehood
  def brute_force (n)
    if n <= 1
      return false
    elsif n == 2
      return true
    #elsif n % 2 == 0 return false
    elsif n.even?
      return false
    else
      m = Math.sqrt(n)
      i = 3       #fuck ruby's lack of good for loops
      while i <= m
        return false if n % i == 0
        i += 2
      end
    end
    return true
  end

  def brute_find (n)
    primes = []
    n.times do |i|
      primes << i if brute_force(i)
    end
    return primes
  end

  def sieve (n)
    #create a boolean array, indexes represent the value
    sieve = Array.new(n + 1, true)
    sieve[0] = false
    sieve[1] = false
    m = Math.sqrt(n)
    #binding.pry

    #recreate a for loop : for (int i = 2; i <= m; i++)
    i = 2
    while i <= m
      if sieve[i]
        k = i * i #for loop : for(k = i * i; k <= n; k += i)
        while k <= n
          sieve[k] = false
          k += i
        end
      end
      i += 1
    end

    #convert boolean array to array of prime #'s
    primes = []
    (n+1).times do |i|
      primes << i if sieve[i]
    end
    return primes

  end

  #https://primes.utm.edu/howmany.html
  #Pierre Dusart showed that the nth prime
    #nth prime > n * (log(n) + log( log( n-1)) )
  def upper_bound_for_nth_prime (n)
    return n * (Math.log(n) + Math.log(Math.log(n-1) ) )
  end

  def find_nth_prime (n)
    number = upper_bound_for_nth_prime(n).truncate
    loop do
      return number if brute_force(number)
      number -= 1
    end
  end

end

p = Prime.new()
puts p.find_nth_prime(15)


def test()
  p = Prime.new()
  puts "End point for the prime search?"
  input = gets.chomp.to_i
  start = Time.now
  primes = p.sieve(input)
  elapsed = Time.now - start
  #binding.pry
  #puts primes
  puts "Total : #{primes.size}"
  puts "Execution time for sieve: #{elapsed} seconds"

  start = Time.now
  primes = p.brute_find(input)
  elapsed = Time.now - start
  #puts primes
  puts "Total : #{primes.size}"
  puts "Execution time for brute_find: #{elapsed} seconds"
end
