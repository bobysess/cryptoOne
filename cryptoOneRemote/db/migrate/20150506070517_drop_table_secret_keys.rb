class DropTableSecretKeys < ActiveRecord::Migration
  def change
    drop_table :secret_keys
  end
end
