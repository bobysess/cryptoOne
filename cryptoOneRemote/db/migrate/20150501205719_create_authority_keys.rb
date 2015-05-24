class CreateAuthorityKeys < ActiveRecord::Migration
  def change
    create_table :authority_keys do |t|
      t.integer :owner_id
      t.string :owner_info
      t.integer :document_id
      t.string :document_name
      t.string :document_path
      t.string :encrypted_symkey
      t.date :date

      t.timestamps
    end
  end
end
