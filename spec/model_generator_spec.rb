require 'spec_helper'

describe Eyeballs::ModelGenerator do
  let(:test_root) { 'spec/test_root' }
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