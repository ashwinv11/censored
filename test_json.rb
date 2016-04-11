require 'mongo'
require 'json'

client = Mongo::Client.new(['127.0.0.1:27017'], :database => 'itsyourfault_development')

cursor = client[:district].find(
  :DISTRICT => 'PUDUCHERRY').each do |document|
  # content_type "application/json"
  puts document.inspect
end

# cursor = client[:district_old].find(
#   :_id => "BSON::ObjectId('5700177f8d9c472a8e1b3abc')").each do |document|
#   # content_type "application/json"
#   puts document.inspect
# end