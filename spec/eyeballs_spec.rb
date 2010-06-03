require 'spec_helper'

describe Eyeballs do
  let(:test_root) { 'spec/test_root' }
  
  describe "generate a simple app" do
    before(:all) do
      create_test_root
      run_command("eyeballs test")
    end
    
    it "should create the test root" do
      File.exists?(test_root).should be_true
    end
    
    it "should create the test app dirs" do
      file('test', 'app').should exist
      file('test', 'app', 'models').should exist
      file('test', 'app', 'controllers').should exist
      file('test', 'app', 'views').should exist
    end
    
    after(:all) do
      remove_test_root
    end
  end
  
  describe "generate a model" do
    before(:all) do
      create_test_root
      run_command("eyeballs generate model Paul")
    end
    let(:model_file) { file('app', 'models', 'paul.js') }
    
    it "should create my model" do
      model_file.should exist
    end
    
    it "should create my file" do
      model_file.read.should include("o_O('Paul', function(paul){")
    end
    
    after(:all) do
      remove_test_root
    end
  end
end