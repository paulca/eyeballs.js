module Eyeballs
  class ModelGenerator < Thor::Group
    include Thor::Actions
  
    desc "Creates a new eyeballs.js model"
  
    argument :name
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def self.destination_root
      "#{name}"
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js model #{name}"
    end
  
    def build_the_app
      template "templates/model.js", "app/models/#{name.downcase}.js"
    end
  
    def farewell
      $stdout.puts "Your model is ready to rock!"
    end
  end
end