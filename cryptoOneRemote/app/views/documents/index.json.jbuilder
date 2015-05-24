json.array!(@documents) do |document|
  json.extract! document, :id, :symKey, :ownerId, :name, :path, :uploadDate, :hashcode
  json.url document_url(document, format: :json)
end
