#fractions and complex numbers

require './gcd_lcm.rb'
#TODO Test the complex number section
#TODO add some utility to the complex number section
#TODO in the distant future consider adding some stuff for the Julia and Mandelbrot Sets
#TODO: write divide fractions 


#FRACTIONS
  #we store fractions as a two element array
    #a[0] = numerator
    #a[1] = denominator
#multiply, simply multiply across
def multiply_fractions(a, b)
  result = []
  result << a[0] * b[0]
  result << a[1] * b[1]
  return result
end
#divide fractions

a = [1,2]
b = [1,4]
c = [2,3]

#add,
  #find common multiple
    #multiply each numerator by necessary factor
      #add numerators, store common multiple
def add_fractions(a, b)
  denominator = lcm(a[1],b[1])
  result = []
  result << (denominator / a[1]) * a[0] + (denominator / b[1]) * b[0]
  result << denominator
    #reduce the result
  return result
end
#subtract fractions


#reduce
  #find GCD of numerator and denominator and divide each by GCD
def simplify_fraction(a)
  gcd = gcd(a[0], a[1])
  puts "for #{a}:"
  puts "gcd = #{gcd}"
  a[0] /= gcd
  a[1] /= gcd
  return a
end


##UNTESTED #####
#for complex numbers we'll just store the real parts
  #z = a + bi
    #z[0] = a; z[1] = b
      #make sure to always reduce i

#add complex
  #(a + ib) + (c + id) = (a+c) + (b+d)i
def add_complex(z,q)
  result = []
  result << z[0] + q[0]
  result << z[1] + q[1]
  return result
end

#subtract complex
  #(a + ib) - (c + id) = (a -c) + (b -d)i
def subtract_complex(z,q)
  temp = q.dup
  temp[0] *= -1
  temp[1] *= -1
  return add_complex(z,temp)
end

#multiply complex
  #(a + ib) * (c + id) = (ac - bd)  + i(ad + bc)
def multiply_complex(z,q)
  result = []
  result << (z[0] * q[0]) - (z[1] * q[1])
  result << (z[0] * q[1]) + (z[1] * q[0])
  return result
end

#divide complex
  #(a + ib) / (c + id) =  (ac + bd) + (bc - ad)i
                        #------------------------
                        #      (c^2 + d^2)
def divide_complex(z,q)
  denominator = q[0] ** 2 + q[1] ** 2
  real_part = ((z[0] * q[0]) + (z[1] * q[1])) / denominator
  imaginary_part = ( (z[1] * q[0]) - (z[0] * q[1]) ) / denominator
  result = [real_part, imaginary_part]
  return result
end

#simplify_i
