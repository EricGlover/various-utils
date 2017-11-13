def isLucky(num)
  num.to_s.chars.each do |char|
    if char != '4' && char != '7'
      return false
    end
  end
  return true
end
isLucky(4)
isLucky(7)
isLucky(123)

def frequency(num)
  fours = []
  sevens = []
  num.to_s.chars.each do |char|
    if char === '4'
      fours << char
    end
    if char === '7'
      sevens << char
    end
  end
  if fours.length === sevens.length
     return true
   end
  return false
end
frequency(4)
frequency(7)
frequency(47)
# answer = nil
# lowest_price = nil
# if answer.is_nil?
#   lowest_price = 
