class District
  include Mongoid::Document
  field :_id, type: String
  field :state_ut, type: String
  field :district, type: String
  field :year, type: Integer
  field :rape, type: Integer

  attr_readonly :_id, :state_ut, :district, :year, :rape
  # index({ _id: 1 }, { unique: true, name: "_id" })
  # index({ state_ut: 1 }, { unique: true, name: "STATE/UT" })
  # index({ district: 1 }, { unique: true, name: "DISTRICT" })
  # index({ year: 1 }, { unique: true, name: "Year" })
  # index({ rape: 1 }, { unique: true, name: "Rape" })
end
