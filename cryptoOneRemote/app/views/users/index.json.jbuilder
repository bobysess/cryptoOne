json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :email, :password, :publicKey, :secretKeyId, :roles
  json.url user_url(user, format: :json)
end
