class AddColumnOwnerToDocuments < ActiveRecord::Migration
  def change
    add_column :documents, :owner_id, :integer
  end
end
