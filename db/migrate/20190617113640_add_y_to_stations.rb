class AddYToStations < ActiveRecord::Migration[5.2]
  def change
    add_column :stations, :y, :integer
  end
end
