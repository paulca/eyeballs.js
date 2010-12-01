require 'rubygems'
require 'sinatra'
set :static, true
set :public, Proc.new { File.expand_path('.') }

get '/tests.js' do
  content_type 'application/javascript'
  files = []
  Dir["#{File.join(File.expand_path('.'), 'test', 'unit')}/*.html"].each do |file|
    files << "'#{File.basename(file)}'"
  end
  "var test_files = [#{files.join(',')}];"
end

get '/reviews' do
  '[{"id": "1", "title":"Local, baby"}]'
end

get '/reviews_with_content_type' do
  content_type 'application/json'
  '[{"id": "1", "title":"Local, baby"}]'
end

post '/reviews' do
  '{"id": "1"}'
end

post '/alternate_reviews' do
  '{"id": "2"}'
end

get '/string_back/1' do
  'found a string'
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

get '/rails_reviews' do
  '[{"rails_review": {"id":"1", "title": "Did you include the root?"}}]'
end

post '/rails_reviews' do
  if params[:rails_review]
    '{"rails_review": {"id":"1"}}'
  else
    'fail'
  end
end

get '/rails_reviews/1' do
  '{"rails_review": {"id":"1"}}'
end

get '/alternate_rails_reviews/1' do
  '{"alternate_rails_review": {"id":"1"}}'
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

get '/reviews/2' do
  '{"id": "2", "title":"funtimes"}'
end

get '/reviews/:id' do
  '{"id": "1", "title":"More Magic!"}'
end

get '/my/reviews/:id' do
  '{"id": "1", "title":"Prefixed"}'
end

put '/reviews/:id' do
  '{"id": "1", "title":"Updated"}'
end

delete '/reviews/:id' do
  'Deleted OK'
end