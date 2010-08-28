require 'rubygems'
require 'sinatra'

set :static, true
set :public, Proc.new { File.expand_path('.') }