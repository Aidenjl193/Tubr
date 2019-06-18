class StationLine < ApplicationRecord
  belongs_to :station
  belongs_to :line

  def node
    self.station.nodes[self.node_index]
  end
end
