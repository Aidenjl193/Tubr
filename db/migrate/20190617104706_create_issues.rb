class CreateIssues < ActiveRecord::Migration[5.2]
  def change
    create_table :issues do |t|
      t.string :type
      t.string :duration
      t.integer :line_station_id

      t.timestamps
    end
  end
end
