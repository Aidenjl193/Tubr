class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.integer :x
      t.integer :y
      t.integer :station_id
    end
  end
end
