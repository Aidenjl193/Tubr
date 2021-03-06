class LinesController < ApplicationController

  def index
    filters = ["Circle line", "Bakerloo line"]
    lines = Line.all.select{|line|  filters.any?{|filter| filter == line.name}}
    
    render json: lines.to_json(
             :methods => :path_coords,
             :except => [:updated_at, :created_at])
  end

  def show
    line = Line.find_by(name: params[:id])
    
    render json: line.to_json(
             :methods => :path_coords,
             :include => {
               :stations => {:except => [:updated_at, :created_at], :include => [:nodes]}
             },
             :except => [:updated_at, :created_at])
  end
end
