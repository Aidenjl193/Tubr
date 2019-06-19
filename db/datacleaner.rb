require "json"

json_from_file = File.read(File.expand_path("./db/stations.json"))
stations_hash = JSON.parse(json_from_file)

def length(pa, pb)
  sum_of_squares = 0
  sum_of_squares += (p1[:x] - p2[:x]) ** 2 
  sum_of_squares += (p1[:y] - p2[:y]) ** 2 
  Math.sqrt( sum_of_squares )
end

def deltay(pa, pb)
  (pa[:y] - pb[:y])
end

def deltax(pa, pb)
  (pa[:x] - pb[:x])
end

def clean_line(stops)
  point_a = Stop.find_by(name: stops.first)
  point_b = Stop.find_by(name: stops.last)

  for i in 1..stops.length - 2 do
    stop = Stop.find_by(name: stops[i])
    line_length = length(point_a, stop)

    stop.update(x: line_length * deltax(point_a, point_b), y: line_length * deltay(point_a, point_b))
  end
end

clean_line([
        "Plaistow",      
        "Upton Park",      
        "East Ham",      
        "Barking",      
        "Upney",      
        "Becontree",      
        "Dagenham Heathway",      
        "Dagenham East",      
        "Elm Park",      
        "Hornchurch",      
        "Upminster Bridge",      
        "Upminster"])
            

