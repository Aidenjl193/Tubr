class StationsController < ApplicationController

 def self.get_station_json
   if !@station_json
     @station_json = Station.all.to_json(:except => [:updated_at, :created_at], :include => {:nodes => {:except => [:id, :station_id]}})
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
