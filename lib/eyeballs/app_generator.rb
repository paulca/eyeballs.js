module Eyeballs
  class AppGenerator < Thor::Group
    include Thor::Actions
    include Eyeballs::AppDetector

    desc "Creates a new eyeballs.js app"
  
    argument :name
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js app #{name}"
    end
  
    def build_the_app
      directory "templates/app_root", new_app_path
      copy_file 'dist/jquery/jquery-1.4.2.min.js', "#{new_app_path}/vendor/jquery/jquery-1.4.2.min.js"
      copy_file 'dist/mustache/mustache.0.3.0.js', "#{new_app_path}/vendor/mustache/mustache.0.3.0.js"
      copy_file 'dist/jquery/jquery.ba-bbq.min.js', "#{new_app_path}/vendor/jquery/jquery.ba-bbq.min.js"
      directory "src", "#{new_app_path}/vendor/eyeballs/"
      template "templates/initializer.js", "#{new_app_path}/config/initializer.js"
    end
  
    def farewell      
      $stdout.puts "Thank you for installing eyeballs.js"
    end
  end
end