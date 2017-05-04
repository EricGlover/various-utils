#sequences.rb
#various things with sequences

#TODO : see if you can squeeze some usefulness out of the ArithGeo_2 method of things
  #currently it's runtime looks (at a glance) like not an improve over ArithGeo
    #I'm keeping it around for it's insightfulness though / FOR THE LOVE OF CALCULUS 


#determine whether a given array is an aritmetic or geometric sequence
def ArithGeo(arr)

  #test for arithmetic sequence first
  last = arr[1]
  difference = arr[1] - arr[0]
  arithmetic_sequence = true
  #loop invariant = ??
  (2...arr.size).each do |i|
    last_diff = difference
    difference = arr[i] - last
    if difference != last_diff
      arithmetic_sequence = false
      break;
    end
    last = arr[i]
  end
  #test for geometric sequence next
  last = arr[1]
  difference = arr[1] / arr[0]
  geometric_sequence = true
  (2...arr.size).each do |i|
    last_diff = difference
    difference = arr[i] / last
    if difference != last_diff
      geometric_sequence = false
      break;
    end
    last = arr[i]
  end
  return "Arithmetic" if arithmetic_sequence
  return "Geometric" if geometric_sequence
  return "-1"

end

#the magic of calculus
def ArithGeo_2(arr)
#test for arithmetic sequence first
  #sum from i = 1 to n, = n(n+1) / 2 for sum of 1 .. n
  #general sum of an arithmetic sequence
    #a[1] - a[0] = delta
    #a[0] = a
    #arr.size = n
    #sum = a * n + delta( n(n-1) / 2 )
  sum = arr.sum
  arith_sum = arr[0] * arr.size + (arr[1] - arr[0]) * ((arr.size - 1) * (arr.size) / 2 )
  return "Arithmetic" if sum == arith_sum

#test for geometric sequence next
  #sum from i = 1 to n, = { (a * (1 - r ** n) ) / (1 - r) }
  r = arr[1] / arr[0]
  a = arr[0]
  n = arr.size
  geo_sum = (a * (1 - (r ** n)) ) / (1 - r) if r != 1
  if r == 1
    return "-1"
  end
  return "Geometric" if geo_sum == sum


  return "-1"
end

def test_ArithGeo()
  puts ArithGeo([1,2,3,4,5])
  puts ArithGeo([2,4,8,16,32,64])
  puts ArithGeo([1,1,1,1,1,2])

  puts ArithGeo_2([1,2,3,4,5])
  puts ArithGeo_2([4,7,10,13,16])
  puts ArithGeo_2([2,4,8,16,32,64])
  puts ArithGeo_2([1,1,1,1,0])

end

#test_ArithGeo()
