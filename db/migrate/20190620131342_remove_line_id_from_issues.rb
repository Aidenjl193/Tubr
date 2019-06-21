class RemoveLineIdFromIssues < ActiveRecord::Migration[5.2]
  def change
    remove_column :issues, :line_id, :integer
  end
end
