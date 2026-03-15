# frozen_string_literal: true

require 'sinatra'
require 'json'
require 'rack/cors'

DATA_DIR = File.expand_path('data', __dir__)
LOCALES_DIR = File.join(DATA_DIR, 'locales')
FAQ_DIR = File.join(DATA_DIR, 'faq')
HEADINGS_FILE = File.join(DATA_DIR, 'headings.json')

use Rack::Cors do
  allow do
    origins '*'
    resource '/api/*', headers: :any, methods: %i[get options]
  end
end

set :port, ENV.fetch('PORT', 3000)
set :bind, '0.0.0.0'

def load_json(path)
  return nil unless File.file?(path)

  JSON.parse(File.read(path))
rescue JSON::ParserError
  nil
end

def locale_path(locale)
  path = File.join(LOCALES_DIR, "#{locale}.json")
  path if File.file?(path)
end

def headings_index
  @headings_index ||= load_json(HEADINGS_FILE) || []
end

def get_nested(hash, key_path)
  key_path.split('.').reduce(hash) { |h, k| h.is_a?(Hash) ? h[k] : nil }
end

# GET /api/locales/:locale — locale JSON (source of truth for frontend i18n)
get '/api/locales/:locale' do
  locale = params['locale']
  path = locale_path(locale)
  halt 404, { 'Content-Type' => 'application/json' }, { error: 'Locale not found' }.to_json unless path

  content_type :json
  File.read(path)
end

# GET /api/locales — list available locales
get '/api/locales' do
  locales = Dir.glob(File.join(LOCALES_DIR, '*.json')).map { |f| File.basename(f, '.json') }
  content_type :json
  { locales: locales }.to_json
end

# GET /api/search?q=...&locale=en — search headings (h1–h6) by translated text
get '/api/search' do
  q = (params['q'] || '').strip
  locale = params['locale'] || 'en'
  path = locale_path(locale)
  halt 400, { 'Content-Type' => 'application/json' }, { error: 'Missing query q' }.to_json if q.empty?
  halt 404, { 'Content-Type' => 'application/json' }, { error: 'Locale not found' }.to_json unless path

  messages = load_json(path)
  halt 500, { 'Content-Type' => 'application/json' }, { error: 'Locale data invalid' }.to_json unless messages.is_a?(Hash)

  query = q.downcase
  results = headings_index.filter_map do |entry|
    key = entry['key']
    text = get_nested(messages, key)
    next unless text.is_a?(String)
    next unless text.downcase.include?(query)

    {
      key: key,
      tag: entry['tag'],
      route: entry['route'] || '/',
      id: entry['id'],
      title: text
    }
  end

  content_type :json
  { results: results }.to_json
end

# GET /api/faq?locale=en — FAQ items (question + answer) for the given locale
get '/api/faq' do
  locale = params['locale'] || 'en'
  path = File.join(FAQ_DIR, "#{locale}.json")
  halt 404, { 'Content-Type' => 'application/json' }, { error: 'FAQ not found' }.to_json unless File.file?(path)

  data = load_json(path)
  halt 500, { 'Content-Type' => 'application/json' }, { error: 'FAQ data invalid' }.to_json unless data.is_a?(Array)

  content_type :json
  { items: data }.to_json
end

get '/api/health' do
  content_type :json
  { status: 'ok' }.to_json
end
