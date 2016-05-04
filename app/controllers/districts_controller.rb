class DistrictsController < ApplicationController
  def index
    # byebug
    @client = Mongo::Client.new(['127.0.0.1:27017'], :database => 'censored_development')

    @districts = []
    state = params[:state]
    district = params[:district]
    
    cursor = @client[:district].find(:DISTRICT => district).each do |document|
      @districts.push(document)
      puts document
    end

    if request.xhr?
      render :json => @districts
    end
  end
end

