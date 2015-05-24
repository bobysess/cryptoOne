class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :firstName
      t.string :lastName
      t.string :email
      t.integer :alter
      t.date :birthday

      t.timestamps
    end
  end
end
