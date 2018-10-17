var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoose = require('mongoose')

mongoose.connect(process.env.MONGOLAB_URI);

var urlsSchema = new mongoose.Schema(
  {
    original_url: { type: String, default: 'unknown', required: true},
    short_url: {type: Number, default: 0}
  }
  )
var URL = mongoose.model('URL', urlsSchema)

var counterSchema = new mongoose.Schema(
  {name: {type:String, default: 'last created'},
    count: {type:Number,default:0}}
  )
var COUNTER = mongoose.model('counter', counterSchema)

exports.UrlModel = URL,
exports.counter = COUNTER