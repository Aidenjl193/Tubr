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

  def distance(p1, p2)
    sum_of_squares = (p1[:x] - p2[:x]) ** 2 
    sum_of_squares += (p1[:y] - p2[:y]) ** 2 
    Math.sqrt( sum_of_squares )
  end

  def path_coords
    path = []

    for i in 0..station_lines.length - 1 do
      pos = {x: station_lines[i].station.x, y: station_lines[i].station.y}
      path << pos
      path << pos

      if(i != 0 && i != station_lines.length - 1)
        prev_pos = path[path.length - 3]
        
        next_pos = {x: station_lines[i + 1].station.x, y: station_lines[i + 1].station.y}
        
        dir = {x: pos[:x] - prev_pos[:x], y: pos[:y] - prev_pos[:y]}

        next_dir = {x: pos[:x] - next_pos[:x], y: pos[:y] - next_pos[:y]}

        distance = distance(dir, next_dir)
        
        if(next_dir[:x] != 0 && next_dir[:y] != 0 && distance > 50)
          if(dir[:x] == 0)
            path << {x: pos[:x], y: next_pos[:y]}
          elsif(dir[:y] == 0)
            path << {x: next_pos[:x], y: pos[:y]}
          end
        end
      end
    end
    
    path
  end
end
