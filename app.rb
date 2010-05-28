require 'sinatra'

get '/' do
  erb :index
end

post '/reviews' do
  '{"id": "1"}'
end