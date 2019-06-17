class AddXToStations < ActiveRecord::Migration[5.2]
  def change
    add_column :stations, :x, :integer
  end
end
