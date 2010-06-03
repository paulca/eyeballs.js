require 'spec_helper'

describe Eyeballs do
  
  describe "generate a simple app" do
    let(:test_root) { 'spec/test_root' }
    before(:all) do
      FileUtils.mkdir_p(test_root)
      system("cd #{test_root}; ../../bin/eyeballs test")
    end
    
    it "should create the test root" do
      File.exists?(test_root).should be_true
    end
    
    it "should create the test app dirs" do
      File.exists?(File.join(test_root, 'test', 'app')).should be_true
      File.exists?(File.join(test_root, 'test', 'app', 'models')).should be_true
      File.exists?(File.join(test_root, 'test', 'app', 'controllers')).should be_true
      File.exists?(File.join(test_root, 'test', 'app', 'views')).should be_true
    end
    
    after(:all) do
      FileUtils.rm_r(test_root)
    end
  end
end