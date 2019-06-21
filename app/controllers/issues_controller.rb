class IssuesController < ApplicationController
  def show
    issue = Issue.find_by(id: params[:id])
    if issue
      render json: issue.to_json(inlcude: [:issue_type, :duration, :line_station_id]) #, except: [:updated_at])
    else
      render json: { message: "No issue found" }
    end
  end

  def create
    #byebug
    if params["line_id"] && params["station_id"]
      station_line_id = StationLine.find_by(line_id: params["line_id"], station_id: params["station_id"])
      station_line_id ? station_line_id = station_line_id.id : nil
    end

    #forgot to add 2nd station_line_id to params...workaround:
    if params["second_station_line_id"] && params["line_id"]
      #byebug
      second_station_id = Station.find_by(name: params["second_station_line_id"])
      second_station_id ? second_station_id = second_station_id.id : nil
      second_station_line_id = StationLine.find_by(line_id: params["line_id"], station_id: second_station_id)
      second_station_line_id ? second_station_line_id = second_station_line_id.id : nil
    end

    if second_station_line_id
      puts "YESSSSS"
    else
      puts "noooooo"
    end
byebug
    issue = Issue.create(
      issue_type: params["issue_type"],
      duration: params["duration"],
      direction: params["direction"],
      station_line_id: station_line_id,
      second_station_line_id: second_station_line_id,
    )

    #find second stationline using the name "All Saints" and the line_id 27?
    #HERE 19/06/19
  end
end
