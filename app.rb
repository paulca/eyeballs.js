require 'rubygems'
require 'sinatra'
set :static, true
set :public, Proc.new { File.expand_path('.') }

get '/reviews' do
  '[{"id": "1", "title":"Local, baby"}]'
end

post '/reviews' do
  '{"id": "1"}'
end

post '/alternate_reviews' do
  '{"id": "2"}'
end

get '/reviews/:id' do
  '{"id": "1", "title":"More Magic!"}'
end

get '/my/reviews/:id' do
  '{"id": "1", "title":"Prefixed"}'
end

put '/reviews/:id' do
  '{"id": "1", "title":"Tennessee"}'
end

delete '/reviews/:id' do
  '{"id": "1", "title":"Tennessee"}'
end