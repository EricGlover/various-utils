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
  # TODO: write a prime factor decompisition function
  # TODO: write a function to approximate the number of primes below a given number n
  # TODO: later make this check primes to save wasteful computations
    #
  #@primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ]

  def initialize()
    #..
    #binding.pry
    @primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ]
  end

  def list_known_primes()
    return @primes
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

  #improvement : you can check a number for primehood by only checking it's remainder when divided by known primes
    #so instead of looping through every # you can loop through the primes array
  #check for the nextPrime via brute force (god, that's so nasty)
  def nextPrime(last_prime)
      i = 2
      last_prime = last_prime + 1
      too_far = last_prime * last_prime
      #we'll continue our search for too_far times //rewrite this later
      #too_far.times do |z|
      loop do         #iterate until you find a prime
        loop do       #check last_prime for primehood
          if last_prime == i
            return last_prime
          end
          break if last_prime % i == 0
          i = i + 1
        end
        i = 2
        last_prime = last_prime + 1
      end
  end

  def is_prime?( n )
    (2..n - 1).each do |i|
      return false if n % i == 0
    end
    return true
  end

  def prime_factor_decomposition (n)
    prime_factors_array = []
    #set primes to some amount
    original_input = n
    largest_prime = 2
    if (is_prime? ( n) )    #brute force check here, improve later
      prime_factors_array = [n]
      return prime_factors_array
    end

    #loop invariant??
    @primes.size.times do |i|
      break if n == 1
      break if original_input <= @primes[i]
      while (n % @primes[i] == 0)
        n /= @primes[i]
        prime_factors_array << @primes[i]
      end
    end
    return prime_factors_array

  end

  #CONSIDER changing this into a base prime thing
    #so instead of an array you just use each spot to be the next prime and represent them all in one number
      #maybe just use 25 or 26 primes (2 - 97) and use the alpha char set to represent them???
        #a = 0, b = 2, c = 3, d = 5
        #bb = 4
        #maybe a0b2c0 = 4
        #wait...
          # 14 = 1,0,0,1 = a1b0c0d1 = ad ?????? ad = 14
          #maybe do that and then just use -1
          #so 'a' -'z' == 2 - 97
          #a^decimal_number_indicating_the_power (-1)
          #example ...hmmm what's...
            #101 = 102 - 1 = [2,3,17] - 1 = [1, 1, 0, 0, 0, 0, 1] - 1 = a1b1c0d0e0f0g1 - 1 = abg - 1
              #or set a = -1, so ach = 101, ch = 102, bbcc = 100, abbcc = 99
  #return an array of the prime notation of n
    #9 = [0,2]  #0 2's, 2 3's
    #12 = [2,1] #2 2's, 1 3's
  #TODO : fix this so it will generate more primes if need be,
    #this should really just be a method of somekind
  def prime_notation(n)
    prime_array = prime_factor_decomposition(n)
    largest_prime = prime_array.last
    result = []
    #@primes.each do |p|
    i = 0
    j = 0
    last_iteration = @primes.index(largest_prime)
    #amount_of_that_prime = 0
    #run through @primes and note 0 when primes[i] isn't in prime_array
    while i <= last_iteration
      amount_of_that_prime = 0
      if prime_array[j] == @primes[i]
        #prime found
        amount_of_that_prime += 1
        while prime_array[j + 1] == @primes[i]
          amount_of_that_prime += 1
          j += 1
        end
        result << amount_of_that_prime
        j += 1
      else
        #add a spot into the prime_notation to indicate that prime is absent
        result << 0
      end
      i += 1
    end
    return result
  end

  #TODO : get the digits to line up properly
  #prints out the prime notation on one line
    #and directly below it, the prime for that spot
  #example print_prime_notation(18)
    #[1, 2]
    #[2, 3]
  def print_prime_notation(n)
    prime_notation = prime_notation(n)
    #puts prime_notation
    #print out the prime_notation array on one line
    print "["
    (0...prime_notation.size - 1).each do |i|
      print "#{prime_notation[i]}, "
    end
    print "#{prime_notation[prime_notation.size-1]}]\n"

    #on the next line print out the primes that they correspond to
    print "["
    (0...prime_notation.size - 1).each do |i|
      print "#{@primes[i]}, "
    end
    print "#{@primes[prime_notation.size-1]}]\n"
  end

end

#p = Prime.new()
#puts p.find_nth_prime(15)


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
