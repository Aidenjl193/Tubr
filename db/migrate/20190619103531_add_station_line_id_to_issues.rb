class AddStationLineIdToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :station_line_id, :integer
  end
end
