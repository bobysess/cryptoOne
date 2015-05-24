class AddColumnOwnerIdToSharedDocument < ActiveRecord::Migration
  def change
    add_column :shared_documents, :ownerId, :integer
  end
end
