#!/usr/bin/env ruby
puts gets.split(" ").map{|x| x.to_i}.reduce(:+)
