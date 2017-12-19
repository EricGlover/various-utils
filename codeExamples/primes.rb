#Exploration of Primes
#why I wrote it...well primes are interesting
#and it illustrates the fundamental theorem of arithmetic a bit

#output
# [HoratioFox]: codeExamples$ ruby primes.rb
# 12 deconstructed into primes
# [2, 2, 3]
# 99 deconstructed into primes
# [3, 3, 11]
# Known primes, [2, 3, ... 89, 97]
# 993 deconstructed into primes
# [3, 331]
# Known primes, [2, 3, ... 983, 991]
class Prime
  def initialize()
    @primes = sieve(100)
  end

  def print_known_primes()
    print "Known primes, ", @primes
    puts
  end

  def sieve (n)
    #create a boolean array, indexes represent the value
    sieve = Array.new(n + 1, true)
    sieve[0] = false
    sieve[1] = false
    m = Math.sqrt(n)
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

  def prime_factor_decomposition (n)
    if n > @primes[-1]
      @primes = sieve(n)
    end
    prime_factors_array = []
    #set primes to some amount
    original_input = n
    largest_prime = 2

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
end

def test()
  p = Prime.new()
  puts "12 deconstructed into primes"
  print p.prime_factor_decomposition(12)
  puts
  puts "99 deconstructed into primes"
  print p.prime_factor_decomposition(99)
  puts
  p.print_known_primes()
  puts "993 deconstructed into primes"
  print p.prime_factor_decomposition(993)
  puts
  p.print_known_primes()
end
test()
