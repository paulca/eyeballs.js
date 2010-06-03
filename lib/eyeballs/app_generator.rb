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
      directory "templates/app", "#{name}/app"
    end
  
    def farewell
      $stdout.puts "Thank you for installing eyeballs.js"
    end
  end
end