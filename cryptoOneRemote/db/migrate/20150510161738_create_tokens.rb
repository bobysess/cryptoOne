class CreateTokens < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.string :token
      t.datetime :lastUpdate

      t.timestamps
    end
  end
end
