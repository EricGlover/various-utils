#write a quick solution to finding equivalent screen resolutions

#finish this tomorrow

require './fractions_and_complexNums.rb'

# returns a list of ratios
def parse_screen_res( screen_res_array )
  ratios = []

  # parse strings input like this #1024 768
                                #1152 720
                                #1280 800
                                #1440 900
  nums = screen_res_array.split(" ").map do |s|
    s.to_i
  end

  #put them into an array of ratios
  new_fraction = []
  nums.each do |i|
    new_fraction.push(i)
    if (new_fraction.length == 2)
      ratios.push(new_fraction)
      new_fraction = []
    end
  end

  return ratios
end

#take in an array of screen resolutions and display available aspect ratios
def find_aspect( string_screen_res )
  uniq_ratios = []

  #parse it first
  ratios = parse_screen_res( string_screen_res )

  ratios.each do |i|
    puts i
    aspect_ratio = simplify_fraction(i)
    puts "#{aspect_ratio}"
    if (!uniq_ratios.include?(aspect_ratio))
      uniq_ratios.push(aspect_ratio)
    end
  end
  return uniq_ratios
end

#sifter,
 #given two arrays of ratios find all the equivalent pairs
 #use a select

def equivalent_ratios( your_res, available_screen_resolutions )
  your_res = your_res.chomp

end

#a = [1024, 768, 1152, 720, 1280, 800, 1440, 900, 1680, 1050, 1920, 1200, 2048, 1280, 2304, 1440, 2560, 1600, 2880, 1800]
a = "1024 768
1152 720
1280 800
1440 900
1680 1050
1920 1200
2048 1280
2304 1440
2560 1600
2880 1800"
b = find_aspect( a )
print "#{b}\n"
