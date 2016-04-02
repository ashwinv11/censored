require 'mongo'
require 'json'

client = Mongo::Client.new(['127.0.0.1:27017'], :database => 'test')

cursor = client[:district_old].find(:DISTRICT => 'PUDUCHERRY').each do |document|
  # content_type "application/json"
   puts document.inspect
end