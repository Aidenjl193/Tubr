class AddDirectionToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :direction, :string
  end
end
