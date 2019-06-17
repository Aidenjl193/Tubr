class LinesController < ApplicationController

  def show
    line = Line.find(params[:id])
    
    render json: line.to_json(
             :methods => :path_coords,
             :include => {
               :stations => {:except => [:updated_at, :created_at]}
             },
             :except => [:updated_at, :created_at])
  end
end
