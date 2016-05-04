class DistrictsController < ApplicationController
  def index
    gon.state = state
    gon.district = district

    @districts = []
    client = Mongo::Client.new(['127.0.0.1:27017'], :database => 'censored_development')
  
    cursor = client[:district].find(:DISTRICT => district).each do |document|
      @districts.push(document)
    end
    
    gon.districts = @districts
    # render :json => @districts
  end
end