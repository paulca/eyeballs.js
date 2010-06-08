require 'spec_helper'

describe Eyeballs::ModelGenerator do
  let(:test_root) { 'spec/test_root' }
  before(:all) do
    create_test_root
    run_command("eyeballs generate scaffold Review title:string content:text")
  end
  let(:model_file) { file('app', 'models', 'review.js') }
  let(:controller_file) { file('app', 'controllers', 'reviews_controller.js') }
  let(:html_file) { file('reviews.html') }
  let(:new_view_file) { file('app', 'views', 'reviews', 'new.html.mustache') }
  let(:partial_view_file) { file('app', 'views', 'reviews', '_review.html.mustache') }
  
  it "should create my files" do
    model_file.should exist
    controller_file.should exist
    html_file.should exist
    new_view_file.should exist
    partial_view_file.should exist
  end
  
  it "should fill out the model file" do
    model_file.read.should include("o_O('Review', function(review){")
  end
  
  it "should fill out the controller file" do
    controller_file.read.should include("o_O('ReviewsController', {")
  end
  
  it "should fill out the html file" do
    html_file.read.should include("Reviews")
  end
  
  after(:all) do
    remove_test_root
  end
end