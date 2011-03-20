require 'rake'
require 'spec/rake/spectask'

desc 'Default: run specs.'
task :default => :spec

desc 'Run the specs'
Spec::Rake::SpecTask.new(:spec) do |t|
  t.spec_opts = ['--colour --format progress --loadby mtime --reverse']
  t.spec_files = FileList['spec/**/*_spec.rb']
end

PKG_FILES = FileList[
  '[a-zA-Z]*',
  'app/**/*',
  'bin/**/*',
  'dist/**/*',
  'templates/**/*',
  'lib/**/*',
  'src/**/*',
  'templates/**/*',
  'test/**/*',
  'views/**/*'
]

begin
  require 'jeweler'
  Jeweler::Tasks.new do |s|
    s.name = "eyeballs"
    s.version = "0.5.17"
    s.author = "Paul Campbell"
    s.email = "paul@rslw.com"
    s.homepage = "http://www.github.com/paulca/eyeballs.js"
    s.platform = Gem::Platform::RUBY
    s.summary = "A lightweight javascript MVC framework."
    s.files = PKG_FILES.to_a
    s.require_path = "lib"
    s.has_rdoc = false
    s.add_dependency 'thor'
    s.add_dependency 'activesupport'
    s.extra_rdoc_files = ["README.md"]
  end
rescue LoadError
  puts "Jeweler not available. Install it with: sudo gem install jeweler"
end

Jeweler::GemcutterTasks.new
