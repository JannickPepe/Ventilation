# frozen_string_literal: true

require 'sinatra'
require 'json'
require 'rack/cors'
require 'jwt'
require 'bcrypt'

DATA_DIR = File.expand_path('data', __dir__)
LOCALES_DIR = File.join(DATA_DIR, 'locales')
FAQ_DIR = File.join(DATA_DIR, 'faq')
HEADINGS_FILE = File.join(DATA_DIR, 'headings.json')
USERS_FILE = File.join(DATA_DIR, 'users.json')

JWT_SECRET = ENV.fetch('JWT_SECRET', 'dev-secret-change-in-production')
ACCESS_TOKEN_EXPIRY = 3600        # 1 hour
REFRESH_TOKEN_EXPIRY = 5 * 24 * 3600  # 5 days

use Rack::Cors do
  allow do
    origins '*'
    resource '/api/*', headers: :any, methods: %i[get post put patch delete options]
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

# --- Auth helpers ---
def parse_json_body
  body = request.body.read
  return {} if body.to_s.strip.empty?

  JSON.parse(body)
rescue JSON::ParserError
  {}
end

def load_users
  data = load_json(USERS_FILE)
  data.is_a?(Array) ? data : []
end

def save_users(users)
  File.write(USERS_FILE, JSON.pretty_generate(users))
end

def validate_email(email)
  err = []
  err << 'can\'t be blank' if email.to_s.strip.empty?
  err << 'is invalid' if email.to_s.strip != '' && !email.to_s.match?(/\A[^@\s]+@[^@\s]+\.[^@\s]+\z/)
  err
end

def validate_password(password, for_register: false)
  err = []
  err << 'can\'t be blank' if password.to_s.empty?
  err << 'is too short (minimum 8 characters)' if for_register && password.to_s.length < 8 && !password.to_s.empty?
  err
end

def find_user_by_email(email)
  load_users.find { |u| u['email'].to_s.downcase == email.to_s.strip.downcase }
end

def create_user(email, password)
  users = load_users
  id = (users.map { |u| u['id'].to_i }.max || 0) + 1
  user = {
    'id' => id,
    'email' => email.to_s.strip.downcase,
    'password_digest' => BCrypt::Password.create(password),
    'created_at' => Time.now.utc.iso8601
  }
  users << user
  save_users(users)
  user
end

def issue_access_token(user_id)
  payload = { sub: user_id, exp: Time.now.to_i + ACCESS_TOKEN_EXPIRY, type: 'access' }
  JWT.encode(payload, JWT_SECRET, 'HS256')
end

def issue_refresh_token(user_id)
  payload = { sub: user_id, exp: Time.now.to_i + REFRESH_TOKEN_EXPIRY, type: 'refresh' }
  JWT.encode(payload, JWT_SECRET, 'HS256')
end

def decode_refresh_token(token)
  payload, = JWT.decode(token, JWT_SECRET, true, algorithm: 'HS256')
  payload if payload && payload['type'] == 'refresh'
rescue JWT::DecodeError
  nil
end

def json_response(status, body)
  [status, { 'Content-Type' => 'application/json' }, [body.to_json]]
end

# POST /api/auth/register
post '/api/auth/register' do
  content_type :json
  data = parse_json_body
  email = data['email'].to_s.strip
  password = data['password'].to_s

  errors = {}
  errors['email'] = validate_email(email) if validate_email(email).any?
  errors['password'] = validate_password(password, for_register: true) if validate_password(password, for_register: true).any?
  if find_user_by_email(email)
    errors['email'] ||= []
    errors['email'] << 'is already taken'
  end
  halt *json_response(422, { errors: errors }) if errors.any?

  user = create_user(email, password)
  access_token = issue_access_token(user['id'])
  refresh_token = issue_refresh_token(user['id'])
  return json_response(201, {
    user: { id: user['id'], email: user['email'] },
    access_token: access_token,
    refresh_token: refresh_token,
    expires_in: ACCESS_TOKEN_EXPIRY
  })
end

# POST /api/auth/login
post '/api/auth/login' do
  content_type :json
  data = parse_json_body
  email = data['email'].to_s.strip
  password = data['password'].to_s

  errors = {}
  errors['email'] = validate_email(email) if validate_email(email).any?
  errors['password'] = validate_password(password) if validate_password(password).any?
  halt *json_response(422, { errors: errors }) if errors.any?

  user = find_user_by_email(email)
  halt *json_response(401, { error: 'Invalid email or password' }) unless user
  halt *json_response(401, { error: 'Invalid email or password' }) unless BCrypt::Password.new(user['password_digest']) == password

  access_token = issue_access_token(user['id'])
  refresh_token = issue_refresh_token(user['id'])
  return json_response(200, {
    user: { id: user['id'], email: user['email'] },
    access_token: access_token,
    refresh_token: refresh_token,
    expires_in: ACCESS_TOKEN_EXPIRY
  })
end

# POST /api/auth/refresh
post '/api/auth/refresh' do
  content_type :json
  data = parse_json_body
  refresh_token = data['refresh_token'].to_s
  halt *json_response(401, { error: 'Invalid or expired refresh token' }) if refresh_token.empty?

  payload = decode_refresh_token(refresh_token)
  halt *json_response(401, { error: 'Invalid or expired refresh token' }) unless payload

  user_id = payload['sub']
  users = load_users
  user = users.find { |u| u['id'].to_i == user_id.to_i }
  halt *json_response(401, { error: 'User not found' }) unless user

  access_token = issue_access_token(user['id'])
  new_refresh_token = issue_refresh_token(user['id'])
  return json_response(200, {
    user: { id: user['id'], email: user['email'] },
    access_token: access_token,
    refresh_token: new_refresh_token,
    expires_in: ACCESS_TOKEN_EXPIRY
  })
end

get '/api/health' do
  content_type :json
  { status: 'ok' }.to_json
end
