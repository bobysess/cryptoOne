class AddColumnIsInitializedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :isInitialized, :boolean ,:default => false
    add_column :users, :isActiv, :boolean , :default => false
  end
end
