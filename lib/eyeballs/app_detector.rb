module Eyeballs
  
  module AppDetector
    
    def new_app_path
      @new_app_path ||= if File.exists?('public')
        $stdout.puts "public folder detected, installing to public/javascripts"
        'public/javascripts'
      else
        name
      end
    end
    
    def app_path
      @app_path ||= if File.exists?('public')
        $stdout.puts "public folder detected, installing to public/javascripts"
        'public/javascripts'
      else
        '.'
      end
    end
  end
  
end