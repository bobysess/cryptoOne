json.array!(@secret_keys) do |secret_key|
  json.extract! secret_key, :id, :secretKey
  json.url secret_key_url(secret_key, format: :json)
end
