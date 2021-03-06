# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_20_133639) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "issues", force: :cascade do |t|
    t.string "issue_type"
    t.string "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "direction"
    t.integer "station_line_id"
    t.integer "second_station_line_id"
  end

  create_table "lines", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nodes", force: :cascade do |t|
    t.integer "x"
    t.integer "y"
    t.integer "station_id"
  end

  create_table "station_lines", force: :cascade do |t|
    t.integer "line_id"
    t.integer "station_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "node_index"
  end

  create_table "stations", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.boolean "accessible"
    t.integer "open_time"
    t.integer "close_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
