require 'spec_helper'

describe Eyeballs::ModelGenerator do

  before(:all) do
    create_test_root
    FileUtils.cd(test_root)
    Eyeballs::ModelGenerator.start(["Paul"])
  end
  let(:model_file) { file('app', 'models', 'paul.js') }
  
  it "should create my model" do
    model_file.should exist
  end
  
  it "should create my file" do
    model_file.read.should include("o_O('Paul', function(){")
  end
  
  after(:all) do
    remove_test_root
  end
end