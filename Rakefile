# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

task :default => 'app:import_data'

# Age and sex wise persons arrested under crime against women during 2012
# API_1_URL = "https://data.gov.in/api/datastore/resource.json?resource_id=5bc0be8a-69e5-4a23-9d8c-163924f143e7&api-key=#{ENV["GOV_API_KEY"]}"
# Persons arrested under crime against Women during 2001-2012
# API_2_URL = "https://data.gov.in/api/datastore/resource.json?resource_id=601c1745-b832-40ff-987c-84208aecdc52&api-key=#{ENV["GOV_API_KEY"]}"
# Offenders Relation And Proximity To Rape Victims 2001-2012
# API_3_URL = "https://data.gov.in/api/datastore/resource.json?resource_id=c5559d7d-af41-45f2-8f5f-92b310f059df&api-key=#{ENV["GOV_API_KEY"]}"

# Using ActiveRecord Migrations

require 'active_record'
require 'yaml'

namespace :app do
  # Checks and ensures task is not run in production.
  task :ensure_development_environment => :environment do
    if Rails.env.production?
      raise "I'm sorry, I can't do that. (You're asking me to drop your production database.)"
    end
  end

  task :import_age do
    puts "import_age"
    `mongoimport --db test --collection age --type csv --headerline --file csv/age.csv`
  end

  task :import_age_old do
    puts "import_age_old"
    `mongoimport --db test --collection age_old --type csv --headerline --file csv/age_old.csv`
  end

  task :import_caste do
    puts "import_caste"
    `mongoimport --db test --collection caste --type csv --headerline --file csv/caste.csv`
  end

  task :import_caste_old do
    puts "import_caste_old"
    `mongoimport --db test --collection caste_old --type csv --headerline --file csv/caste_old.csv`
  end

  task :import_children do
    puts "import_children"
    `mongoimport --db test --collection children --type csv --headerline --file csv/children.csv`
  end

  task :import_children_old do
    puts "import_children_old"
    `mongoimport --db test --collection children_old --type csv --headerline --file csv/children_old.csv`
  end

  task :import_district_IPC do
    puts "import_district_IPC"
    `mongoimport --db test --collection district_IPC --type csv --headerline --file csv/district_IPC.csv`
  end

  task :import_district_IPC_old do
    puts "import_district_old"
    `mongoimport --db test --collection district_IPC_old --type csv --headerline --file csv/district_IPC_old.csv`
  end

  # District 2013
  task :import_district do
    puts "import_district"
    `mongoimport --db test --collection district --type csv --headerline --file csv/district.csv`
  end

  task :import_district_old do
    puts "import_district_old"
    `mongoimport --db test --collection district_old --type csv --headerline --file csv/district_old.csv`
  end

  task :import_district_IPC do
    puts "import_district_IPC"
    `mongoimport --db test --collection district_IPC --type csv --headerline --file csv/district_IPC.csv`
  end

  task :import_district_IPC_old do
    puts "import_district_IPC_old"
    `mongoimport --db test --collection district_IPC_old --type csv --headerline --file csv/district_IPC_old.csv`
  end

  task :import_offenders do
    puts "import_offenders"
    `mongoimport --db test --collection offenders --type csv --headerline --file csv/offenders.csv`
  end

  task :import_offenders_old do
    puts "import_offenders_old"
    `mongoimport --db test --collection offenders_old --type csv --headerline --file csv/offenders_old.csv`
  end

  task :import_tribe do
    puts "import_tribe"
    `mongoimport --db test --collection tribe --type csv --headerline --file csv/tribe.csv`
  end

  task :import_tribe_old do
    puts "import_tribe_old"
    `mongoimport --db test --collection tribe_old --type csv --headerline --file csv/tribe_old.csv`
  end

  task :import_women do
    puts "import_women"
    `mongoimport --db test --collection women --type csv --headerline --file csv/women.csv`
  end

  task :import_women_old do
    puts "import_women_old"
    `mongoimport --db test --collection women_old --type csv --headerline --file csv/women_old.csv`
  end

  task :import_women_updated do
    puts "import_women_updated"
    `mongoimport --db test --collection women_updated --type csv --headerline --file csv/women_updated.csv`
  end

  task :import_women_updated_old do
    puts "import_women_updated_old"
    `mongoimport --db test --collection women_updated_old --type csv --headerline --file csv/women_updated_old.csv`
  end

  task :import_data => [:import_age, :import_age_old, :import_caste,
                        :import_caste, :import_caste_old, :import_children,
                        :import_children_old, :import_district_IPC, :import_district_IPC_old,
                        :import_offenders, :import_offenders_old, :import_tribe,
                        :import_tribe_old, :import_women, :import_women_old,
                        :import_women_updated, :import_women_updated_old] do
    puts "Got queries."
  end

  task :drop_dev_db do 
    `mongo itsyourfault_development --eval "db.getCollectionNames().forEach(function(n){db[n].remove()});"`
  end
end