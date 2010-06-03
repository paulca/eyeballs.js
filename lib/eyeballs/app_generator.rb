module Eyeballs
  class AppGenerator < Thor::Group
    include Thor::Actions
  
    desc "Creates a new eyeballs.js app"
  
    argument :name
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def self.destination_root
      "#{name}"
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js app #{name}"
    end
  
    def build_the_app
      directory "templates/app_root", "#{name}"
      copy_file 'dist/jquery-1.4.2.min.js', "#{name}/vendor/jquery/jquery-1.4.2.min.js"
      copy_file 'dist/jquery.livequery.js', "#{name}/vendor/jquery/jquery.livequery.js"
      copy_file 'dist/mustache.js', "#{name}/vendor/mustache/mustache.js"
      directory "src", "#{name}/vendor/eyeballs/"
    end
  
    def farewell
      $stdout.puts "Thank you for installing eyeballs.js"
    end
  end
end