class CreateSignatures < ActiveRecord::Migration
  def change
    create_table :signatures do |t|
      t.integer :signority_id
      t.integer :user_id
      t.string :signature
      t.text :encrypted_public_key
      t.date :signature_date

      t.timestamps
    end
  end
end
