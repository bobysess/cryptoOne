class CreateSymKeys < ActiveRecord::Migration
  def change
    create_table :sym_keys do |t|
      t.string :encrypted_key

      t.timestamps
    end
  end
end
