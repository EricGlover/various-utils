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
