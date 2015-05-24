class CreateKeypairs < ActiveRecord::Migration
  def change
    create_table :keypairs do |t|
      t.text :public_key
      t.text :secret_key
      t.timestamps
    end
  end
end
