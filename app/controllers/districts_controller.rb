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
      #<%= debug(@districts) %>
    end
  end

  # def fileContent
  #   @script = Script.where(:script_file_name => params[:file_name]).first # file_name is the data key of Ajax request in view

  #   if request.xhr?
  #       render :json => {
  #                           :file_content => @script.fileContent
  #                       }
  #    end
  # end
end

