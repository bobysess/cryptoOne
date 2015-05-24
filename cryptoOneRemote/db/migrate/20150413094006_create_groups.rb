class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.string :encrypted_KGV
      t.integer :admin_id
      t.date :creation_date
      t.timestamps
    end
  end
end
