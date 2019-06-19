# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "json"
json_from_file = File.read(File.expand_path("./db/stations.json"))
stations_hash = JSON.parse(json_from_file)

Station.destroy_all
Line.destroy_all
StationLine.destroy_all
Issue.destroy_all

stations_hash.each do |station_hash|
  if((station_hash["x"] && station_hash["y"]) || station_hash["nodes"])
    station = Station.create(name: station_hash["name"])
    if(!station_hash["nodes"])
      Node.create(x: station_hash["x"], y: station_hash["y"], station_id: station.id)
    else
      station_hash["nodes"].each do |node|
         Node.create(x: node["x"], y: node["y"], station_id: station.id)
      end
    end
  end
end

 lines = [
    {
		name: "circle",
		color: "#FFCC00",
        station_line_hashes: [
          {name: "Hammersmith", node: 0 },
          {name: "Goldhawk Road", node: 0 },
          {name: "Shepherd's Bush Market", node: 0 },
          {name: "Wood Lane", node: 0 },
          {name: "Latimer Road", node: 0 },
          {name: "Ladbroke Grove", node: 0 },
          {name: "Westbourne Park", node: 0 },
          {name: "Royal Oak", node: 0 },
          {name: "Paddington", node: 0 },
          {name: "Edgware Road", node: 0 },
          {name: "Baker Street", node: 0 },
          {name: "Great Portland Street", node: 0 },
          {name: "Euston Square", node: 0 },
          {name: "King's Cross St ancras", node: 0 },
          {name: "Farringdon", node: 0 },
          {name: "Barbican", node: 0 },
          {name: "Moorgate", node: 0 },
          {name: "Liverpool Street", node: 0 },
          {name: "Aldgate", node: 0 },
          {name: "Tower Hill", node: 0 },
          {name: "Monument", node: 0 },
          {name: "Cannon Street", node: 0 },
          {name: "Mansion House", node: 0 },
          {name: "Blackfriars", node: 0 },
          {name: "Temple", node: 0 },
          {name: "Embankment", node: 0 },
          {name: "Westminster", node: 0 },
          {name: "St James's Park", node: 0 },
          {name: "Victoria", node: 0 },
          {name: "Sloane Square", node: 0 },
          {name: "South Kensington", node: 0 },
          {name: "Gloucester Road", node: 0 },
          {name: "High Street Kensington", node: 0 },
          {name: "Notting Hill Gate", node: 0 },
          {name: "Bayswater", node: 0 },
          {name: "Paddington", node: 1},
          {name: "Edgware Road", node: 1 }
        ]
    }
  ]

  Line.create(lines)

 
  circle_statLines = StationLine.all.select{ |sl| sl.line_id == 9}

  Issue.create(issue_type: "Closure", duration: "3 days", station_line_id: StationLine.all.sample.id, direction: "Northbound")
  Issue.create(issue_type: "Delay", duration: "Unknown", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Congestion", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Delay", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Southbound")
  Issue.create(issue_type: "Closure", duration: "2 days", station_line_id: StationLine.all.sample.id, direction: "Westbound")
  Issue.create(issue_type: "Closure", duration: "3 days", station_line_id: StationLine.all.sample.id, direction: "Northbound")
  Issue.create(issue_type: "Delay", duration: "Unknown", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Congestion", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Delay", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Southbound")
  Issue.create(issue_type: "Closure", duration: "2 days", station_line_id: StationLine.all.sample.id, direction: "Westbound")
  Issue.create(issue_type: "Closure", duration: "3 days", station_line_id: StationLine.all.sample.id, direction: "Northbound")
  Issue.create(issue_type: "Delay", duration: "Unknown", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Congestion", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Delay", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Southbound")
  Issue.create(issue_type: "Closure", duration: "2 days", station_line_id: StationLine.all.sample.id, direction: "Westbound")
  Issue.create(issue_type: "Closure", duration: "3 days", station_line_id: StationLine.all.sample.id, direction: "Northbound")
  Issue.create(issue_type: "Delay", duration: "Unknown", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Congestion", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Delay", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Southbound")
  Issue.create(issue_type: "Closure", duration: "2 days", station_line_id: StationLine.all.sample.id, direction: "Westbound")
  Issue.create(issue_type: "Closure", duration: "3 days", station_line_id: StationLine.all.sample.id, direction: "Northbound")
  Issue.create(issue_type: "Delay", duration: "Unknown", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Congestion", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Eastbound")
  Issue.create(issue_type: "Delay", duration: "Short Term", station_line_id: StationLine.all.sample.id, direction: "Southbound")
  Issue.create(issue_type: "Closure", duration: "2 days", station_line_id: StationLine.all.sample.id, direction: "Westbound")