class StationsController < ApplicationController

  def index
    # to be replaced later by Aiden...
    #Stations won't change so will save as a global JS variable after fetch
    stations = Station.all
    render json: stations.to_json(:except => [:updated_at, :created_at], :include => [:nodes]);
  end

end
