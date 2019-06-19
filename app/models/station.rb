class Station < ApplicationRecord
  has_many :station_lines
  has_many :lines, through: :station_lines
  has_many :nodes
  has_many :issues, through: :station_lines

  def has_issues
    self.issues.length > 0 ? true : false
  end
end
