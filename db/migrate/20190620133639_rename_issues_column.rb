class RenameIssuesColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :issues, :second_station_id, :second_station_line_id
  end
end
