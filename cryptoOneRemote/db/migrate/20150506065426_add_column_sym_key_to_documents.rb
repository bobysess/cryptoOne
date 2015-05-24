class AddColumnSymKeyToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :symKey, :string
    remove_column :documents , :symKeyId
  end
end
