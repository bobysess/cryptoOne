json.array!(@shared_documents) do |shared_document|
  json.extract! shared_document, :id, :groupId, :documentId, :sharingDate, :encryptedSymKey
  json.url shared_document_url(shared_document, format: :json)
end
