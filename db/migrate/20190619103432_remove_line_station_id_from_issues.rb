class RemoveLineStationIdFromIssues < ActiveRecord::Migration[5.2]
  def change
    remove_column :issues, :line_station_id, :integer
  end
end
