class StationLine < ApplicationRecord
  belongs_to :station
  belongs_to :line
  has_many :issues

  @_node = nil

  def node
    if(!@_node)
      @_node = self.station.nodes[self.node_index]
    end
    @_node
  end
end
