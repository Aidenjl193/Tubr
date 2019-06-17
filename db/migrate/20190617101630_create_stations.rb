class CreateStations < ActiveRecord::Migration[5.2]
  def change
    create_table :stations do |t|
      t.string :name
      t.string :address
      t.boolean :accessible
      t.integer :open_time
      t.integer :close_time

      t.timestamps
    end
  end
end
