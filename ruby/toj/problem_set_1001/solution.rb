#!/usr/bin/env ruby
puts  $stdin.readlines.map{|x| x.strip.split }.flatten.reverse.map{|x| Math.sqrt(x.to_i).round(4)}
