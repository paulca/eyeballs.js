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

post '/string_back' do
  'some string'
end

post '/test_id' do
  if params[:alternate_object]
    if params[:id]
      'fail'
    end
  else
    'ok'
  end
end

post '/rails_reviews' do
  if params[:rails_review]
    'ok'
  else
    'fail'
  end
end

post '/alternate_rails_reviews' do
  if params[:alternate_object]
    'ok'
  else
    'fail'
  end
end

post '/auth_token' do
  params[:authenticity_token]
end

get '/reviews/:id' do
  '{"id": "1", "title":"More Magic!"}'
end

get '/my/reviews/:id' do
  '{"id": "1", "title":"Prefixed"}'
end

put '/reviews/:id' do
  '{"id": "1", "title":"' + params[:title] + '"}'
end

delete '/reviews/:id' do
  '{"id": "1", "title":"Tennessee"}'
end