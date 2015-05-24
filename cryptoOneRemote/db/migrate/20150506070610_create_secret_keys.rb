class CreateSecretKeys < ActiveRecord::Migration
  def change
    create_table :secret_keys do |t|
      t.string :secretKey

      t.timestamps
    end
  end
end
