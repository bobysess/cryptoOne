class CreateSharedDocuments < ActiveRecord::Migration
  def change
    create_table :shared_documents do |t|
      t.integer :document_id
      t.integer :group_id
      t.date :sharing_date
      t.string :encrypted_sym_key

      t.timestamps
    end
  end
end
