# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "json"
require "nokogiri"
require "open-uri"

lines_page = Nokogiri::HTML.parse(open("https://en.wikipedia.org/wiki/London_Underground"))
table_rows = lines_page.css("table.wikitable tbody tr")

lines = []

#table_rows.each do |row|
#  if(row.css("td")[0])
#    line_obj = {}
#    line_obj[:name] = row.css("td")[0].css("a").text
#    url =  row.css("td")[0].css("a")[0][:href]
#    line_obj[:color] = row.css("td")[1].attributes["style"].value.split(":")[1].sub("color", "").sub(";", "").sub(" ", "")#
#
#    line_obj[:station_line_hashes] = []#
#
#    line_page = Nokogiri::HTML.parse(open("https://en.wikipedia.org#{url}"))
#
#    trs = line_page.css("table.wikitable tbody tr")
#
#    trs.each do |line_row|
#      if(line_row.css("td")[0])
#        line_obj[:station_line_hashes] << {
#          name: line_row.css("td")[0].css("a").text,
#          node: 0
#        }
#      end
#    end
#    lines << line_obj
#  end
#end

#File.open("./db/lines.json","w") do |f|
#  f.write(lines.to_json)
#end

lines = JSON.parse(File.read(File.expand_path("./db/lines.json")))
json_from_file = File.read(File.expand_path("./db/stations.json"))
stations_hash = JSON.parse(json_from_file)

Station.destroy_all
Line.destroy_all
StationLine.destroy_all
Issue.destroy_all

stations_hash.each do |station_hash|
  if ((station_hash["x"] && station_hash["y"]) || station_hash["nodes"])
    station = Station.create(name: station_hash["name"], accessible: station_hash["accessible"])
    if (!station_hash["nodes"])
      Node.create(x: station_hash["x"], y: station_hash["y"], station_id: station.id)
    else
      station_hash["nodes"].each do |node|
        Node.create(x: node["x"], y: node["y"], station_id: station.id)
      end
    end
  end
end

Line.create(lines)

def length(pa, pb)
  sum_of_squares = 0
  sum_of_squares += (pa.x - pb.x) ** 2
  sum_of_squares += (pa.y - pb.y) ** 2
  Math.sqrt(sum_of_squares)
end

def deltay(pa, pb)
  (pb.y - pa.y)
end

def deltax(pa, pb)
  (pb.x - pa.x)
end

def clean_line(stops)
  point_a = Station.find_by(name: stops.first).nodes[0]
  point_b = Station.find_by(name: stops.last).nodes[0]

  for i in 1..stops.length - 2
    stop = Station.find_by(name: stops[i]).nodes[0]
    line_length = length(point_a, stop)
    orignial_length = length(point_a, point_b)
    puts line_length
    stop.update(x: point_a.x + line_length * deltax(point_a, point_b) / orignial_length, y: point_a.y + line_length * deltay(point_a, point_b) / orignial_length)
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
  "Upminster",
])

clean_line([
             "Mile End",
             "Bow Road",
             "Bromley-by-Bow",
             "West Ham",
           ])

clean_line([
             "Tower Gateway",
             "Aldgate East",
             "Whitechapel",
             "Stepney Green",
             "Mile End",
           ])

circle_statLines = StationLine.all.select { |sl| sl.line_id == 9 }

directions = ["Northbound", "Southbound", "Eastbound", "Westbound"]
issueTypes = ["Closure", "Delay", "Congestion"]
durations = ["Less than 30 mins", "A few hours", "For Today"]
days = ["2 days", "3 days", "4 days", "5 days", "6 days", "A week"]
durations += days

10.times do
  Issue.create(issue_type: issueTypes.sample,
               duration: durations.sample,
               station_line_id: StationLine.all.sample.id,
               direction: directions.sample,
               second_station_line_id: StationLine.all.sample.id )
end
