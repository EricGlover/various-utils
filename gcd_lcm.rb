#GCD LCM
#using Euclid's algo

#oddly enough the order doesn't seem to matter
#worst runtime is 5 * number of digits of the smaller integer
def gcd(a, b)
  return a if b == 0
  gcd(b, a % b)
end

def lcm(a,b)
  return b * a / gcd(a,b)
end

def continued_fraction(a, b)
  integers = []
  #algo, take out the integer, take the reciprocal, repeat until no remainder or a == 1 (hmm...)
  #save the integrers

  #loop invariant??
  while (b != 0)      #[a/b] = a/b (integer) + b / a % b
    integers << a / b
    temp = a
    a = b
    b = temp % b
  end
  puts integers
  return integers
end

def notation_1(array)
  print '['
  print "#{array[0]};"
  (1...array.size - 1).each do |i|
    print "#{array[i]},"
  end
  print "#{array[array.size-1]}]"
  puts ""
end

def notation_2(array)
  print "#{array[0]} + "
  (1...array.size - 1).each do |i|
    print "(#{array[i]} + "
  end
  print "#{array[array.size - 1]}"
  (1...array.size).each do |i|
    print ')^-1'
  end
  puts ""
end

def notation_3(array)
  puts "#{array.first} + 1"
  puts "   ----"
  (1...array.size - 1).each do |i|
    print " " * i * 3
    puts "#{array[i]} + 1"
    s = " " * (i * 3 + 3)
    s << "----"
    puts s
  end
  print "   " * array.size
  puts "#{array.last}"
end
