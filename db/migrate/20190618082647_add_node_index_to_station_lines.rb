class AddNodeIndexToStationLines < ActiveRecord::Migration[5.2]
  def change
    add_column :station_lines, :node_index, :integer
  end
end
