class DistrictsController < ApplicationController
  def index
    state = params[:state]
    district = params[:district]
    @districts = []
    client = Mongo::Client.new(['127.0.0.1:27017'], :database => 'censored_development')
  
    cursor = client[:district].find(:DISTRICT => district).each do |document|
      @districts.push(document)
    end
    
    # render :json => @districts
  end
end