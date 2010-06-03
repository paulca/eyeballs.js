require 'spec_helper'

describe Eyeballs::AppGenerator do
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
end