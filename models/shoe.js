var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId

var ShoeSchema = new Schema({
  data: {},
  sku: {type: Schema.ObjectId, ref: "Sku"},
});

module.exports = mongoose.model('Shoe', ShoeSchema);
