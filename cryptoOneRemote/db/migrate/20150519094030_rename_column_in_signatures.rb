class RenameColumnInSignatures < ActiveRecord::Migration
  def change
     rename_column :signatures, :signature , :value
  end
end
