class StatusController < ApplicationController
  
  def tech
    render params[:render]
  end
  
end
