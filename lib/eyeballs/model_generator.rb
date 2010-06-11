module Eyeballs
  class ModelGenerator < Thor::Group
    include Thor::Actions
    include Eyeballs::AppDetector

    desc "Creates a new eyeballs.js model"
    argument :name
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js model #{name}"
    end
  
    def build_the_model
      template "templates/model.js", "#{app_path}/app/models/#{name.downcase}.js"
    end
  
    def farewell
      $stdout.puts "Your model is ready to rock!"
    end
  end
end