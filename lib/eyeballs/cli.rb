module Eyeballs
  class CLI < Thor
    
    desc "eyeballs generate [generator] [name]", "call a generator"
    def generate(requested_generator, name, *args)
      ARGV.delete('generate')
      if(ARGV.include?(requested_generator))
        ARGV.delete(requested_generator)
        "Eyeballs::#{requested_generator.capitalize}Generator".constantize.start
      end
    end

  end
end