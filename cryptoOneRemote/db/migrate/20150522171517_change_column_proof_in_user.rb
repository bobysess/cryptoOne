class ChangeColumnProofInUser < ActiveRecord::Migration
  def change
     change_column :users, :proof , :text
  end
end
