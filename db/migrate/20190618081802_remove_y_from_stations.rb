class RemoveYFromStations < ActiveRecord::Migration[5.2]
  def change
    remove_column :stations, :y, :integer
  end
end
