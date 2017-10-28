var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId

var SkuSchema = new Schema({
  sku: String,
  attributes: [String],
  shoes: [{type: Schema.ObjectId, ref: "Shoe"}]
});


module.exports = mongoose.model('Sku', SkuSchema);
