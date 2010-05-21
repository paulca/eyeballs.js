require 'rubygems'
require 'sinatra'
require 'erb'

get '/' do
  erb :index
end

get '/speakers' do
  erb :speakers
end

get '/venue' do
  erb :venue
end

get '/itinerary' do
  erb :itinerary
end

get '/book' do
  erb :book
end

get '/drinkup' do
  @quotes = []
  erb :drinkup
end