class Station < ApplicationRecord
  has_many :station_lines
  has_many :lines, through: :station_lines
  has_many :nodes
end
