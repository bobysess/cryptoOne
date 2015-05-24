class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.integer :sym_key_id
      t.string :path
      t.string :name
      t.string :hashcode
      t.date :upload_date

      t.timestamps
    end
  end
end
