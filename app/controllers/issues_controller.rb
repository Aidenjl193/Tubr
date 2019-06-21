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
    #byebug
    issue = Issue.create(
      issue_type: params["issue_type"],
      duration: params["duration"],
      direction: params["direction"],
      station_line_id: station_line_id,
      second_station_line_id: second_station_line_id,
    )
    render json: issue   #DAN: Required to send a response back to the fetch!! 
   
    #"issue"=>{"issue_type"=>"default", "duration"=>"default", "direction"=>"default", "second_station_line_id"=>"default"}
  end

  # private:

  # def post_params
  #   params.require(:issue).permit(:issue_type, :duration, :direction, :station_line_id, :second_station_line_id)
  # end
end
