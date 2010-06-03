require 'spec_helper'

describe Eyeballs::ModelGenerator do
  let(:test_root) { 'spec/test_root' }
  before(:all) do
    create_test_root
    run_command("eyeballs generate scaffold Review title:string content:text")
  end
  let(:model_file) { file('app', 'models', 'review.js') }
  let(:controller_file) { file('app', 'models', 'reviews_controller.js') }
  let(:html_file) { file('reviews.html') }
  
  it "should create my files" do
    model_file.should exist
    controller_file.should exist
    html_file.should exist
  end
  
  it "should create my file" do
    model_file.read.should include("o_O('Paul', function(paul){")
  end
  
  after(:all) do
    remove_test_root
  end
end