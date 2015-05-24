class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :salt, :text
    add_column :users, :verifier, :text
  end
end
