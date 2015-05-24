class RenameTablesAndColumns < ActiveRecord::Migration
  def change
       #users
        remove_column :users, :keypair_id
        add_column :users , :publicKey ,:text
        add_column :users, :secretKeyId , :integer
       #symkey
        drop_table :sym_keys
      # signature
        rename_column :signatures, :user_id, :userId
        rename_column :signatures, :signority_id ,:signorityId
        rename_column :signatures, :encrypted_public_key ,:encryptedPublicKey
        rename_column :signatures, :signature_date, :signatureDate
      #sharedDocument
        rename_column :shared_documents ,:group_id, :groupId
        rename_column :shared_documents ,:document_id, :documentId
        rename_column :shared_documents ,:sharing_date, :sharingDate
        rename_column :shared_documents, :encrypted_sym_key, :encryptedSymKey
      #menberships
        rename_column :menberships , :user_id , :userId
        rename_column :menberships, :group_id, :groupId
        rename_column :menberships , :encrypted_kGV, :encryptedKGV
        rename_column :menberships , :admission_date , :admissionDate
      #keypair secretkeky
      drop_table :keypairs
      create_table :secret_keys do |t|
        t.text :secretKey
        t.timestamps
      end
      #group
         rename_column :groups , :encrypted_KGV , :encryptedKGV
         rename_column :groups , :creation_date , :creationDate
         rename_column :groups , :admin_id, :adminId
      #document
         rename_column :documents , :sym_key_id , :symKeyId
         rename_column :documents , :owner_id , :ownerId
         rename_column :documents , :upload_date , :uploadDate
      # authorityKey
         rename_column :authority_keys , :owner_info, :ownerInfo
         rename_column :authority_keys , :owner_id, :ownerId
         rename_column :authority_keys , :document_id , :documentId
         rename_column :authority_keys , :document_name, :documentName
         rename_column :authority_keys , :document_path, :documentPath
         rename_column :authority_keys , :encrypted_symkey , :encryptedSymKey


  end
end
