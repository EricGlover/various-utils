class Prime
  #10 000 000 , 10 ^ 8 runtimes
  #brute_force : 74.860748 seconds
  #sieve : 2.376461 seconds
  #
  #100 000 000 000 , 10 ^ 12 runtimes
  #Killed: 9
  #10000000000


  def intitialize
    #..
  end

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
    #create a boolean array
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
    primes = []
    (n+1).times do |i|
      primes << i if sieve[i]
    end
    return primes

  end


end



p = Prime.new()
puts "End point for the prime search?"
input = gets.chomp.to_i
start = Time.now
primes = p.sieve(input)
elapsed = Time.now - start
#puts primes
puts "Total : #{primes.size}"
puts "Execution time for sieve: #{elapsed} seconds"

start = Time.now
primes = p.brute_find(input)
#puts p.brute_find(input)
elapsed = Time.now - start
#puts primes
puts "Total : #{primes.size}"
puts "Execution time for brute_find: #{elapsed} seconds"
