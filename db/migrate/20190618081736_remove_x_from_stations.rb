class RemoveXFromStations < ActiveRecord::Migration[5.2]
  def change
    remove_column :stations, :x, :integer
  end
end
