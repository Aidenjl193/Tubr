class IssuesController < ApplicationController
  def show
    issue = Issue.find_by(id: params[:id])
    if issue
      render json: issue.to_json(inlcude: [:issue_type, :duration, :line_station_id])#, except: [:updated_at])
    else
      render json: { message: "No issue found" }
    end
  end

  def create
    issue = Issue.new(JSON.parse(params))
    #HERE 19/06/19
  end

end
