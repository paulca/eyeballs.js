require 'spec_helper'

describe Eyeballs::ModelGenerator do
  before(:all) do
    create_test_root
    FileUtils.cd(test_root)
    Eyeballs::ScaffoldGenerator.start(["Review", "title:string", "content:text"])
  end
  let(:model_file) { file('app', 'models', 'review.js') }
  let(:controller_file) { file('app', 'controllers', 'reviews_controller.js') }
  let(:html_file) { file('reviews.html') }
  let(:edit_view_file) { file('app', 'views', 'reviews', 'edit.html.mustache') }
  let(:partial_view_file) { file('app', 'views', 'reviews', '_review.html.mustache') }
  
  it "should create my files" do
    model_file.should exist
    controller_file.should exist
    html_file.should exist
    edit_view_file.should exist
    partial_view_file.should exist
  end
  
  it "should fill out the model file" do
    model_file.read.should include("o_O('Review', function(){")
  end
  
  it "should fill out the controller file" do
    controller_file.read.should include("o_O('ReviewsController', {")
    controller_file.read.should include("Review.all(function(reviews){")
    controller_file.read.should include("for(var id in reviews)")
  end
  
  it "should fill out the html file" do
    html_file.read.should include("Reviews")
    html_file.read.should include(%Q[<input type="text" name="title" value="" data-attribute="title">])
    html_file.read.should include(%Q[<textarea name="content" data-attribute="content"></textarea>])
  end
  
  after(:all) do
    remove_test_root
  end
end