class Menbership < ActiveRecord::Base

  def to_json(options)
   result = {};
   result= {
        "id" => id,
        "user" => User.find(self.userId) ,
        "group" =>Group.find(self.groupId),
        "encryptedKGV" => encryptedKGV ,
        "admissionDate" => admissionDate
    }
  end

  def as_json( options)
    result = {};
    result= {
        "id" => id,
        "user" => User.find(self.userId) ,
        "group" =>Group.find(self.groupId),
        "encryptedKGV" => encryptedKGV ,
        "admissionDate" => admissionDate
    }

  end
end
