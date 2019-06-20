class AddLineIdToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :line_id, :integer
  end
end
