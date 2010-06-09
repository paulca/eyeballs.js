module Eyeballs
  
  module AppDetector
    
    def new_app_path
      @new_app_path ||= if rack_app?
        $stdout.puts "public folder detected, installing to public/javascripts"
        'public/javascripts'
      else
        name
      end
    end
    
    def app_path
      @app_path ||= if rack_app?
        $stdout.puts "public folder detected, installing to public/javascripts"
        'public/javascripts'
      else
        '.'
      end
    end
    
    def rack_app?
      File.exists?('public')
    end
    
  end
  
end