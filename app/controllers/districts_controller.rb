class DistrictsController < ApplicationController
  def index
    @districts = []
    client = Mongo::Client.new(['127.0.0.1:27017'], :database => 'censored_development')
    
    cursor = client[:district].find(:DISTRICT => 'PUDUCHERRY').each do |document|
      @districts.push(document)
    end

    render :json => @districts
  end
end