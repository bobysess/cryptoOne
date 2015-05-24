class AddColumnUserIdToToken < ActiveRecord::Migration
  def change
    add_column :tokens, :userId, :integer
  end
end
