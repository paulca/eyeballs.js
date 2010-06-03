require 'rubygems'
require 'thor'

class App < Thor                                                 # [1]
  map "-L" => :list                                              # [2]

  desc "install APP_NAME", "install one of the available apps"   # [3]
  method_options :force => :boolean, :alias => :string           # [4]
  def install(name)
    user_alias = options[:alias]
    if options.force?
      # do something
      puts 'hello world'
    end
    # other code
  end

  desc "list [SEARCH]", "list all of the available apps, limited by SEARCH"
  def list(search="")
    # list everything
  end
end