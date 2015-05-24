class AddProofToUsers < ActiveRecord::Migration
  def change
    add_column :users, :proof, :string
  end
end
