class ApplicationController < ActionController::Base

    def d param
      # do something then render view for process_one
      render json: JSON.pretty_generate(JSON.parse(param.to_json))
    end
end
