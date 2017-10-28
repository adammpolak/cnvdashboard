var express = require('express');
var router  = express.Router();


var Shoe = require('../models/shoe');
// var Type = require('../models/type');

// ROUTE :: GET --------------------------all shoes
router.get('/', function(req, res){
  Shoe.find({}).exec()
  .then(function(allShoes){
    console.log(allShoes);
    res.json(allShoes);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one shoe
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  Shoe.create(req.body)
  .then(function(shoe){
    console.log(shoe);
    res.json(shoe);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one shoe
router.get('/:pId', function(req, res){
  Shoe.findById(req.params.pId).exec()
  .then(function(shoe){
    console.log(shoe);
    res.json(shoe);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one shoe
router.put('/', function(req, res){
  Shoe.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(shoe){
    console.log(shoe);
    res.json(shoe);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Shoe.remove({_id: req.params.id})
  .then(function(shoe){
    console.log(shoe);
    res.json(shoe);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
