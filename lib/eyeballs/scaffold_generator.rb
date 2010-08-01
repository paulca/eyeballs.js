module Eyeballs
  class ScaffoldGenerator < Thor::Group
    include Thor::Actions
    include Eyeballs::AppDetector
  
    desc "Creates a new eyeballs.js scaffold"
  
    argument :name
    argument :attrs, :type => :array
  
    def self.source_root
      File.join(File.dirname(__FILE__), '..', '..')
    end
  
    def self.destination_root
      "#{name}"
    end
  
    def greeting
      $stdout.puts "Creating new eyeballs.js scaffold, model controller and views for #{name}"
    end
  
    def build_the_model
      template "templates/model.js", "app/models/#{name.downcase}.js"
    end
    
    def build_the_controller
      template "templates/scaffold_controller.js", "#{app_path}/app/controllers/#{name.downcase.pluralize}_controller.js"
    end
    
    def build_the_views
      template "templates/scaffold_index.html", "#{public_path}/#{name.downcase.pluralize}.html"
      template "templates/scaffold_partial.html.mustache", "#{app_path}/app/views/#{name.downcase.pluralize}/_#{name.downcase}.html.mustache"
      template "templates/scaffold_edit.html.mustache", "#{app_path}/app/views/#{name.downcase.pluralize}/edit.html.mustache"
    end
  
    def farewell
      $stdout.puts "Your scaffold is ready to rumble!"
    end
    
    def attributes
      AttributeCollector.new(attrs)
    end
  end
  
  class AttributeCollector
    class << self
      def new(attrs)
        attrs.collect do |attr|
          parts = attr.split(':')
          Attribute.new(:name => parts[0], :type => parts[1])
        end
      end
    end
  end
  
  class Attribute
    attr_accessor :name, :type
    
    def initialize(attributes = {})
      attributes.each_pair do |key, val|
        self.send("#{key}=", val)
      end
    end
  end
end