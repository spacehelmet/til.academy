---
title: Function composition in Ruby 2.6
date: "2019-05-17T13:52:00.169Z"
author: "Mordorreal"
description: New arrow operators and function composition in Ruby.
tags: ["FP", "Ruby", "2.6"]
---

## Let's bring benefits of FP in Ruby together

I've really excited the way how Ruby progress and I love the direction where we go. Personally, I love clean and readable code and for my opinion Functional Programming solve give you great opportunity to write really readable and clean code. So, I agitate everyone to try FP in Ruby and have fun with it!

### What is function composition?

Function composition is a really easy topic. Let me describe it a little bit with examples.

```ruby
def double(value)
  value * 2
end

def square(value)
  value * value
end
```

This is a simple two functions that we'll try to compose. Usually, in Ruby you can do it following way:

```ruby
square(double(2)) # 16
```

Or we can create separate function and get the same result:

```ruby
def double_then_square(value)
  square(double(value))
end

double_then_square(2) # 16
```

Good! Now we composed two functions in one. Easy?
But in Haskell we can do it really easy:

```haskell
doubleThenSquare = square . double
```

In my opinion, Haskell wins.
As you can see `double` function is in the end. That's because of the mathematical definition of function composition.

```
(g ∘ f)(x) = g(f(x))
```

This notation can be read "g after f" (or "g following f") which might help when remembering the order of application when you call your composite function.

In a programming language where programs are commonly written as a series of functions, having function composition makes it easier to compose behaviour from existing functions and encourage you to break down the large functions into smaller, simpler parts.

### Functions in Ruby

To be able to use function composition in Ruby we want functions that we can pass as arguments to other functions, stored in variables and data structures and be able to return them from other functions: in other words, we want first-class functions.

The first Ruby equivalent is Proc.

We can create a Proc following ways:

```ruby
# Use the Proc class constructor
double = Proc.new { |number| number * 2 }

# Use the Kernel#proc method as a shorthand
double = proc { |number| number \* 2 }

# Receive a block of code as an argument (note the &)

def make_proc(&block)
  block
end

double = make_proc { |number| number \* 2 }

# Use Proc.new to capture a block passed to a method without an
# explicit block argument

def make_proc
  Proc.new
end

double = make_proc { |number| number \* 2 }
```

We can use a Proc by calling its call method with any arguments. There are also a few shorthand alternatives we can use:

```ruby
double.call(3) # 6
double.(3)     # 6
double[3]      # 6
double === 3   # 6
```

The last form of call is very useful when you use a Proc in the `when` clause of a `case` statement.

```ruby
divisible_by_3 = proc { |number| (number % 3).zero? }
divisible_by_10 = proc { |number| (number % 10).zero? }

case 9
when divisible_by_3 then puts 'Foo'
when divisible_by_10 then puts 'Bar'
end
# Foo
# nil
```

Also, we have Proc alternative called `lambda`.

```ruby
# Use Kernel#lambda
double = lambda { |number| number * 2 }

# Use the Lambda literal syntax
double = ->(number) { number * 2 }
```

The key differences between “lambdas” and “procs” is:

- Calling `return` from a lambda will only exit from the lambda whereas calling `return` from a proc will exit from the surrounding method (and will throw a LocalJumpError if there is no surrounding method).
- In lambdas, the number of arguments must match the definition exactly (as in a method definition with def) but in procs, missing arguments are replaced with nil, single array arguments are deconstructed if the proc has multiple arguments and no error is raised if too many arguments are passed

```ruby
def lambda_with_bad_arguments
  x_and_y = ->(x, y) { "#{x} and #{y}" }
  x_and_y.call([1, 2, 3])
end

lambda_with_bad_arguments
# ArgumentError: wrong number of arguments (given 1, expected 2)

def lambda_with_return
  lambda = -> { return }
  lambda.call

  'Simple output'
end

lambda_with_return
# "Simple output"

def proc_with_bad_arguments
  x_and_y = proc { |x, y| "#{x} and #{y}" }
  x_and_y.call([1, 2, 3])
end

proc_with_bad_arguments
# "1 and 2"

def proc_with_return
  proc = proc { return }
  proc.call

   'Simple output'
end

proc_with_return
# nil
```

The other Ruby first-class function that we can use is Method. This allows us to represent methods defined on objects as objects themselves:

```ruby
class Hello
  attr_reader :hi

  def initialize(message)
    @message = message
  end

  def hello_message(subject)
    "#{message}, #{subject}!"
  end
end

hello = Hello.new('Hello')
hello_message = hello.method(:hi)
# <Method: Hello#hi>
```

And these can then be called in the same way as Proc:

```ruby
hello_message.call('world') # "Hello, world!"
hello_message.('world')     # "Hello, world!"
hello_message['world']      # "Hello, world!"
hello_message === 'world'   # "Hello, world!"
```

Also, some Ruby objects can transform themselves into Proc by implementing to_proc. Ruby will automatically call this method on any object that is being passed as a block argument to another method with &.

```ruby
[3, 2, 1].select(&:even?)
# same is
[3, 2, 1].select(&:even?.to_proc)
```

Ruby provides implementations of to_proc for the following objects:

- Hash will return a Proc that takes a key as input and returns the corresponding value from the hash or nil if it is not found
- Symbol will return a Proc that takes an object and will call the method with the symbol’s name on it

```ruby
{ name: 'Dave', age: 10 }.to_proc.call(:name)
# "Dave"

:upcase.to_proc.call('hi')
# "HI"
```

### Function composition in Ruby

There are two new operators:

- `<<` called "backward composition" and "compose to left"
- `>>` called "forward composition" and "compose to right"

Some simple examples:

```ruby
double_then_square = square << double
double_then_square.(2) # 16
# or
double_then_square = double >> square
double_then_square.(2) # 16
```

The entire feature is roughly equivalent to the following Ruby code:

```ruby
class Proc
  def <<(g)
    if lambda?
      lambda { |*args, &blk| call(g.call(*args, &blk)) }
    else
      proc { |*args, &blk| call(g.call(*args, &blk)) }
    end
  end

  def >>(g)
    if lambda?
      lambda { |*args, &blk| g.call(call(*args, &blk)) }
    else
      proc { |*args, &blk| g.call(call(*args, &blk)) }
    end
  end
end

class Method
  def <<(g)
    to_proc << g
  end

  def >>(g)
    to_proc >> g
  end
end
```

### Code examples

And some more examples:

```ruby
save_data = ->(value) { p "'#{value}' saved"}

string = 'big string'
(
  :to_s.to_proc >>
  :capitalize.to_proc >>
  :to_json.to_proc >>
  save_data
).call(string) # "'\"Big string\"' saved"

string = 'another big string'
(
  save_data <<
  :to_json.to_proc <<
  :to_s.to_proc <<
  :capitalize.to_proc
) === string # "'\"Another big string\"' saved"

request = { id: 1, data: { value: 'a really important message' } }.to_json

parse_json = ->(json) { JSON.parse(json) }
get_value = ->(request) { request['data']['value'] }

(
  parse_json >>
  :to_h.to_proc >>
  get_value >>
  :to_s.to_proc >>
  :capitalize.to_proc >>
  save_data
).(request) "'A really important message' saved"

request = { id: 1, value: 'FP in Ruby' }
to_center = ->(val) { val.center(20) }

(
  request.to_proc >>
  :to_s.to_proc >>
  to_center >>
  save_data
)[:value] "'     FP in Ruby     ' saved"

```

_Reminder:_ Please open a PR if you have any feedback/question/comment on this blog post.
