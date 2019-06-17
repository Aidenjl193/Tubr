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

stations_hash.each do |station|
  if(station["pos"] && station["x"] && station["y"])
    Station.create(name: station["name"], x: station["x"], y: station["y"])
  end
end

 lines = [
    {
		name: "circle",
		color: "#FFCC00",
        station_line_names: [
          "Hammersmith",
          "Goldhawk Road",
          "Shepherd's Bush Market",
          "Wood Lane",
          "Latimer Road",
          "Ladbroke Grove",
          "Westbourne Park",
          "Royal Oak",
          "Paddington",
          "Edgware Road",
          "Baker Street",
          "Great Portland Street",
          "Euston Square",
          "King's Cross St Pancras",
          "Farringdon",
          "Barbican",
          "Moorgate",
          "Liverpool Street",
          "Aldgate",
          "Tower Hill",
          "Monument",
          "Cannon Street",
          "Mansion House",
          "Blackfriars",
          "Temple",
          "Embankment",
          "Westminster",
          "St James's Park",
          "Victoria",
          "Sloane Square",
          "South Kensington",
          "Gloucester Road",
          "High Street Kensington",
          "Notting Hill Gate",
          "Bayswater",
          "Paddington"
        ]
    }
  ]

  Line.create(lines)
