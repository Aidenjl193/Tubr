class AddSecondStationIdToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :second_station_id, :integer
  end
end
