require 'spec_helper'

describe Eyeballs::ControllerGenerator do

  before(:all) do
    create_test_root
    FileUtils.cd(test_root)
    Eyeballs::ControllerGenerator.start(["Paul"])
  end
  
  let(:controller_file) { file('app/controllers/paul_controller.js') }
  let(:controller_view_dir) { file('app/views/paul') }
  
  it "should create my controller" do
    controller_file.should exist
  end
  
  it "should create my file" do
    controller_file.read.should include("o_O('PaulController', {")
  end
  
  it "should create an empty dir for views" do
    controller_view_dir.should exist
  end
  
  after(:all) do
    remove_test_root
  end
end