class SharedDocument < ActiveRecord::Base
  def as_json(options)
    {
        "id" => id,
        "group" => Group.find(groupId),
	      "document" => Document.find(documentId),
        "owner" => User.find(ownerId),
	      "sharingDate" =>sharingDate,
	      "encryptedSymKey" => encryptedSymKey
    }

  end

  def to_json(options)
    {
        "id" => id,
        "group" => Group.find(groupId),
        "document" => Document.find(documentId),
        "owner" => User.find(ownerId),
        "sharingDate" =>sharingDate,
        "encryptedSymKey" => encryptedSymKey
    }

  end
end
