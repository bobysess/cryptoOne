class RenameColumnEncryptedKgvInGroup < ActiveRecord::Migration
  def change
      rename_column :groups, :encryptedKGV ,:KGV
  end
end
