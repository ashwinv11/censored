# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

db = "itsyourfault_#{Rails.env}"

# task :default => 'app:import_data'
# rake db:mongoid:create_indexes / rake db:setup
# rake db:mongoid:remove_indexes

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
    `mongoimport --db "#{db}" --collection age --type csv --headerline --file csv/age.csv -v`
  end

  task :import_age_old do
    puts "import_age_old"
    `mongoimport --db "#{db}" --collection age_old --type csv --headerline --file csv/age_old.csv -v`
  end

  task :import_caste do
    puts "import_caste"
    `mongoimport --db "#{db}" --collection caste --type csv --headerline --file csv/caste.csv -v`
  end

  task :import_caste_old do
    puts "import_caste_old"
    `mongoimport --db "#{db}" --collection caste_old --type csv --headerline --file csv/caste_old.csv -v`
  end

  task :import_children do
    puts "import_children"
    `mongoimport --db "#{db}" --collection children --type csv --headerline --file csv/children.csv -v`
  end

  task :import_children_old do
    puts "import_children_old"
    `mongoimport --db "#{db}" --collection children_old --type csv --headerline --file csv/children_old.csv -v`
  end

  # District 2013
  task :import_district do
    puts "import_district"
    `mongoimport --db "#{db}" --collection district --type csv --headerline --file csv/district.csv -v`
  end

  task :import_district_old do
    puts "import_district_old"
    `mongoimport --db "#{db}" --collection district_old --type csv --headerline --file csv/district_old.csv -v`
  end

  task :import_district_IPC do
    puts "import_district_IPC"
    `mongoimport --db "#{db}" --collection district_IPC --type csv --headerline --file csv/district_IPC.csv -v`
  end

  task :import_district_IPC_old do
    puts "import_district_old"
    `mongoimport --db "#{db}" --collection district_IPC_old --type csv --headerline --file csv/district_IPC_old.csv -v`
  end

  task :import_offenders do
    puts "import_offenders"
    `mongoimport --db "#{db}" --collection offenders --type csv --headerline --file csv/offenders.csv -v`
  end

  task :import_offenders_old do
    puts "import_offenders_old"
    `mongoimport --db "#{db}" --collection offenders_old --type csv --headerline --file csv/offenders_old.csv -v`
  end

  task :import_tribe do
    puts "import_tribe"
    `mongoimport --db "#{db}" --collection tribe --type csv --headerline --file csv/tribe.csv -v`
  end

  task :import_tribe_old do
    puts "import_tribe_old"
    `mongoimport --db "#{db}" --collection tribe_old --type csv --headerline --file csv/tribe_old.csv -v`
  end

  task :import_women do
    puts "import_women"
    `mongoimport --db "#{db}" --collection women --type csv --headerline --file csv/women.csv -v`
  end

  task :import_women_old do
    puts "import_women_old"
    `mongoimport --db "#{db}" --collection women_old --type csv --headerline --file csv/women_old.csv -v`
  end

  task :import_women_updated do
    puts "import_women_updated"
    `mongoimport --db "#{db}" --collection women_updated --type csv --headerline --file csv/women_updated.csv -v`
  end

  task :import_women_updated_old do
    puts "import_women_updated_old"
    `mongoimport --db "#{db}" --collection women_updated_old --type csv --headerline --file csv/women_updated_old.csv -v`
  end

  task :import_data => [:import_age, :import_age_old, :import_caste,
                        :import_caste, :import_caste_old, :import_children,
                        :import_children_old, :import_district, :import_district_old,
                        :import_district_IPC, :import_district_IPC_old,
                        :import_offenders, :import_offenders_old, :import_tribe,
                        :import_tribe_old, :import_women, :import_women_old,
                        :import_women_updated, :import_women_updated_old] do
    puts "Got queries."
  end

  task :drop_dev_db do 
    `mongo "#{db}" --eval "db.getCollectionNames().forEach(function(n){db[n].remove()});"`
  end
end