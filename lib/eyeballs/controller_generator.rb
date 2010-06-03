module Eyeballs
  class ControllerGenerator < Thor::Group
    include Thor::Actions
  
    desc "Creates a new eyeballs.js controller"
  
    argument :name
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def self.destination_root
      "#{name}"
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js controller #{name}"
    end
  
    def build_the_model
      template "templates/controller.js", "app/controllers/#{name.downcase}_controller.js"
    end
  
    def farewell
      $stdout.puts "Your controller is ready to rule!"
    end
  end
end