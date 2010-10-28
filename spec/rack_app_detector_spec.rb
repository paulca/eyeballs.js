require 'spec_helper'

describe Eyeballs::AppGenerator do  
  describe "generate a simple app" do
    before(:all) do
      create_test_root
      FileUtils.mkdir(test_root + '/public')
      FileUtils.cd(test_root)
      Eyeballs::AppGenerator.start(['test'])
    end
    let(:app_dir) { file('public', 'javascripts', 'app') }
    
    it "should create the test root" do
      File.exists?(test_root).should be_true
    end
    
    it "should create the test app in the public javascripts directory" do
      app_dir.should exist
    end
    
    after(:all) do
      remove_test_root
    end
  end
end