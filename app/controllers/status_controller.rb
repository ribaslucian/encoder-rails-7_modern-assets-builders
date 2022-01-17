class StatusController < ApplicationController
  
  def tech
    render params[:view]
    return
  end
  
end
