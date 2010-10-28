require 'spec_helper'

describe Eyeballs::AppGenerator do
  
  describe "generate a simple app" do
    let(:app_dir) { file('test', 'app') }
    let(:model_dir) { file('test', 'app', 'models') }
    let(:controller_dir) { file('test', 'app', 'controllers') }
    let(:view_dir) { file('test', 'app', 'views') }
    let(:config_dir) { file('test', 'config') }
    let(:vendor_dir) { file('test', 'vendor') }
    let(:jquery_dir) { file('test', 'vendor', 'jquery') }
    let(:eyeballs_dir) { file('test', 'vendor', 'eyeballs') }
    let(:mustache_dir) { file('test', 'vendor', 'mustache') }
    
    let(:jquery_file) { file('test', 'vendor', 'jquery', 'jquery-1.4.2.min.js') }
    let(:bbq_file) { file('test', 'vendor', 'jquery', 'jquery.ba-bbq.min.js') }
    let(:mustache_file) { file('test', 'vendor', 'mustache', 'mustache.0.3.0.js') }
    let(:index_file) { file('test', 'index.html') }
    let(:initializer_file) { file('test', 'config', 'initializer.js')}
    let(:routes_file) { file('test', 'config', 'routes.js')}
    
    before(:all) do
      create_test_root
      FileUtils.cd(test_root)
      Eyeballs::AppGenerator.start(['test'])
    end
    
    it "should create the test root" do
      File.exists?(test_root).should be_true
    end
    
    it "should create the test app dirs" do
      app_dir.should exist
      model_dir.should exist
      controller_dir.should exist
      view_dir.should exist
      config_dir.should exist
      vendor_dir.should exist
      jquery_dir.should exist
      eyeballs_dir.should exist
      mustache_dir.should exist
    end
    
    it "should create the app files" do
      jquery_file.should exist
      bbq_file.should exist
      mustache_file.should exist
      index_file.should exist
      initializer_file.should exist
      routes_file.should exist
    end
    
    after(:all) do
      remove_test_root
    end
  end
end