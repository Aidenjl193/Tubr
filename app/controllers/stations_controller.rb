class StationsController < ApplicationController

 def self.get_station_json
   if true
     filters = ["Circle line", "Bakerloo line"]
     @station_json = Line.where(name: filters).map{|line| line.stations}.flatten.to_json(
       :methods => :has_issues,
       :except => [:updated_at, :created_at],
       :include => {:nodes => {:except => [:id, :station_id]}}
     )
   end
   @station_json
 end
  
  def index
    render json: StationsController.get_station_json
  end
  def show
    station = Station.find_by(id: params[:id])
    render json: station, include: [:issues]
  end
end
