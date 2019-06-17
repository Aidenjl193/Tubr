class Line < ApplicationRecord
  has_many :station_lines
  has_many :stations, through: :station_lines
  
  def station_line_names=(names)
    names.each do |name|
      station = Station.find_by(name: name)
      if(station)
        self.station_lines.build(station_id: station.id)
      end
    end
  end

  def path_coords
    self.station_lines.map do |station_line|
      {x: station_line.station.x, y: station_line.station.y}
    end
  end
end
