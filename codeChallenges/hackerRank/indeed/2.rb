def recurse(root, value)
  if root.value === value
    return true
  elsif root.value > value
    if !root.right
      return false
    end
    return recurse(root.right)
  elsif root.value < value
    if !root.left
      return false
    end
    return recurse(root.left)
  end
end
def isPresent(root , val)
  present = recurse(root)
  if present
    return 1
  else
    return 0
  end
end

def test(a, b)
  if !a
    return true
  else
    return 
