#dealing with different number base systems


#extend these to the Babylonian numeral system
#extend these to the Hex numeral system
#consider making a prime numeral system

#converting from n from base b (2<= b <= 10) to decimal (base 10)
def convert_to_decimal(number, base)

  result = 0
  multiplier = 1      #(any_base ^ 0 == 1)

  while (number > 0)
    result += (number % 10) * multiplier
    multiplier *= base
    number /= 10
  end

  return result
end
  #note that ruby apparently supports octal notation
  #so testing this with  (0010, 2) => 8
  #but testing with this (  10, 2) => 2  [correctly]
    #note : leading 0 for octal, 0x for hex, 0b for binary

#for binary specifically figure out how to just have the machine give you it's representation with bit manipulation or something
#for base 2<= b <= 10
def convert_from_decimal(number, base)
  result = 0
  multiplier = 1
  6.times do |i|
    multiplier *= base
    puts "#{number} % #{multiplier} = #{number % multiplier}"
  end

  #why exactly does this part work?
  nums = []
  while number > 0
    nums << number % base
    number /= base
  end

  ####
  (0...nums.size).each do |i|
    result += nums[i] * (10 ** i)
  end
  return result

end

#TODO : make a decimal representation of remainder
#TODO :
  #note ruby naturally does Math.log(number, base)
def log(base, number)
  a = 1
  result = 0
  while a <= number
    a *= base
    result += 1
  end
  result -= 1
  a /= base
  remainder = number - a
  return "#{base} ** #{result} == #{a}, remainder = #{remainder}"
end


#print out the base ten stuff for illustration, use exponential notation


#general conversion function from base b to base p
