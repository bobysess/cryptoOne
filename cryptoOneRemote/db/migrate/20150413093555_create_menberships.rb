class CreateMenberships < ActiveRecord::Migration
  def change
    create_table :menberships do |t|
      t.integer :group_id
      t.integer :user_id
      t.string :encrypted_kGV
      t.date :admission_date

      t.timestamps
    end
  end
end
