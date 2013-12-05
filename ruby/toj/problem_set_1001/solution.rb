#!/usr/bin/env ruby
puts  $stdin.readlines.map{|x| Math.sqrt(x.to_f).round(4)}.reverse
