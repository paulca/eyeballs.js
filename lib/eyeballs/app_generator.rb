module Eyeballs
  class AppGenerator < Thor::Group
    include Thor::Actions
  
    desc "Creates a new eyeballs.js app"
  
    argument :name
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js app #{name}"
    end
    
    def install_to
      @install_to ||= if File.exists?('public')
        $stdout.puts "public folder detected, installing to public/javascripts"
        'public/javascripts'
      else
        name
      end
    end
  
    def build_the_app
      directory "templates/app_root", install_to
      copy_file 'dist/jquery-1.4.2.min.js', "#{install_to}/vendor/jquery/jquery-1.4.2.min.js"
      copy_file 'dist/jquery.livequery.js', "#{install_to}/vendor/jquery/jquery.livequery.js"
      copy_file 'dist/mustache.js', "#{install_to}/vendor/mustache/mustache.js"
      directory "src", "#{install_to}/vendor/eyeballs/"
    end
  
    def farewell
      $stdout.puts "Thank you for installing eyeballs.js"
    end
  end
end