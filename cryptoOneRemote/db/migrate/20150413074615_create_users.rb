class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :lastname
      t.string :firstname
      t.string :password
      t.string :email
      t.integer :keypair_id

      t.timestamps
    end
  end
end
