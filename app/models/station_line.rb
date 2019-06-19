class StationLine < ApplicationRecord
  belongs_to :station
  belongs_to :line
  has_many :issues

  def node
    self.station.nodes[self.node_index]
  end
end
