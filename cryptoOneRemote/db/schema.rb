# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150527204040) do

  create_table "documents", force: true do |t|
    t.string   "path"
    t.string   "name"
    t.string   "hashcode"
    t.date     "uploadDate"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "ownerId"
    t.string   "symKey"
  end

  create_table "groups", force: true do |t|
    t.string   "name"
    t.string   "KGV"
    t.integer  "adminId"
    t.date     "creationDate"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "menberships", force: true do |t|
    t.integer  "groupId"
    t.integer  "userId"
    t.string   "encryptedKGV"
    t.date     "admissionDate"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "secret_keys", force: true do |t|
    t.string   "secretKey"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shared_documents", force: true do |t|
    t.integer  "documentId"
    t.integer  "groupId"
    t.date     "sharingDate"
    t.string   "encryptedSymKey"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "ownerId"
  end

  create_table "signatures", force: true do |t|
    t.integer  "signorityId"
    t.integer  "userId"
    t.string   "value"
    t.text     "encryptedPublicKey"
    t.date     "signatureDate"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tokens", force: true do |t|
    t.string   "token"
    t.datetime "lastUpdate"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "userId"
  end

  create_table "users", force: true do |t|
    t.string   "lastname"
    t.string   "firstname"
    t.string   "password"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "roles"
    t.text     "publicKey"
    t.integer  "secretKeyId"
    t.text     "salt"
    t.text     "verifier"
    t.boolean  "isInitialized",             default: false
    t.boolean  "isActiv",                   default: false
    t.text     "proof",         limit: 255
  end

end
