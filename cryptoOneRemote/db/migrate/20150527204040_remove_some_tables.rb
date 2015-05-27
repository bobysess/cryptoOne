class RemoveSomeTables < ActiveRecord::Migration
  def change
    drop_table :authority_keys
    drop_table :people
  end
end
