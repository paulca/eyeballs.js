require 'eyeballs'
require 'fileutils'
require 'ruby-debug'

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
  FileChecker.new([test_root] + parts)
end

class FileChecker
  def initialize(parts)
    @file = File.join(parts)
  end

  def exist?
    File.exists?(@file)
  end
  
  def read
    File.read(@file)
  end
  
  def to_s
    @file
  end
end