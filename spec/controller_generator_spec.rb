require 'spec_helper'

describe Eyeballs::ControllerGenerator do

  before(:all) do
    create_test_root
    run_command("eyeballs generate controller Paul")
  end
  let(:controller_file) { file('app', 'controllers', 'paul_controller.js') }
  
  it "should create my controller" do
    controller_file.should exist
  end
  
  it "should create my file" do
    controller_file.read.should include("o_O('PaulController', {")
  end
  
  after(:all) do
    remove_test_root
  end
end