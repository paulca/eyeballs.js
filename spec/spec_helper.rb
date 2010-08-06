require 'eyeballs'
require 'fileutils'
require 'pathname'
require 'ruby-debug'
Debugger.settings[:autoeval] = true

def create_test_root
  FileUtils.mkdir_p(test_root)
end

def remove_test_root
  FileUtils.rm_r(test_root)
end

def run_command(cmd)
  system("cd #{test_root}; ../../bin/#{cmd}")
end

def file(*parts)
  Pathname.new([test_root, *parts].join('/'))
end

def test_root
  File.join(File.dirname(File.expand_path(__FILE__)), 'test_root')
end

# class FileChecker
#   def initialize(parts)
#     @file = File.join(parts)
#   end
# 
#   def exist?
#     File.exists?(@file)
#   end
#   
#   def read
#     File.read(@file)
#   end
#   
#   def to_s
#     @file
#   end
# end