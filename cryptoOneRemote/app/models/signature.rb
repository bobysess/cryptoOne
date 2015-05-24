class Signature < ActiveRecord::Base
  def to_json(options)
    {	  "id"  =>id,
        "signority" => User.find(signorityId),
        "user" =>User.find(userId),
        "value"=> value,
        "encryptedPublicKey" =>encryptedPublicKey,
        "signatureDate"=>signatureDate
    }
  end

  def as_json(options)
    {	  "id"  =>id,
         "signority" => User.find(signorityId),
         "user" =>User.find(userId),
         "value"=> value,
         "encryptedPublicKey" =>encryptedPublicKey,
         "signatureDate"=>signatureDate
    }
  end
end
