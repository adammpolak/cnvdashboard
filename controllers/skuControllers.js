var express = require('express');
var router  = express.Router();

var Sku = require('../models/sku');
var Shoe = require('../models/shoe');
// var Type = require('../models/type');

// ROUTE :: GET --------------------------all skus
router.get('/', function(req, res){
  Sku.find({}).exec()
  .then(function(allSkus){
    // console.log(allSkus);
    res.json(allSkus);
  })
  .catch(function(err){
    // console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one sku
router.post('/', function(req, res){
  // console.log("req.body:" + JSON.stringify(req.body));
  // Sku.remove({}, function(err){
  // console.log(err)
  // });
  //
  // Shoe.remove({}, function(err){
  //   console.log(err)
  // });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // usage example:
  req.body.attributes = req.body.attributes.filter( onlyUnique ); // returns ['a', 1, 2, '1']

  var sku = new Sku ({
    sku: req.body.sku,
    attributes: req.body.attributes,
    shoes: []
  })
  var shoes = [];
  // console.log("amount of shoes in sku: " + req.body.shoes.length);
  for (var i = 0; i < req.body.shoes.length; i++) {
    // for (var j = 0; j < req.body.attributes.length; j++) {
    //   req.body.attributes[j]
    // }
    var shoe = ({
      data: req.body.shoes[i],
      sku: sku._id
    });
    shoes.push(shoe);
  };
  var shoe_ids = [];

  Shoe.insertMany(shoes)
    .then(function(docs) {
      // console.log("we inserted all the docs!");
      for (var i = 0; i < docs.length; i++) {
        shoe_ids.push(docs[i]._id);
      }
      sku.shoes = shoe_ids;
      sku.save(function(err, sku){
        if(err){
          console.log(err);
        } else {
          // console.log("this sku got saved: " + sku.sku + " with this many rows: " + sku.shoes.length);
          res.json(sku)
        }
      });
    })
    .catch(function(err) {
      // console.log("there was an error doing the insert many");
    })

  // Shoe.insertMany(shoes,function(error, docs) {
  //   if (error){
  //     next(error)
  //   }
  //   else {
  //     // res.json(docs)
  //   }
  //
  // })
  // console.log("sku shoes array: " + shoe_ids);
  // shoe.save(function(err, shoe){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log("this is a saved shoe log");
  //   }
  // });
  // console.log("shoe: " + JSON.stringify(req.body.shoes[i]));
  // Shoe.create(req.body);
  // Sku.create(req.body)
  // .then(function(sku){
  //   console.log(sku);
  //   res.json(sku);
  // })
  // .catch(function(err){
  //   console.log(err);
  //   res.status(400);
  // })
});

// ROUTE :: GET ---------------------------one sku
router.get('/:pId', function(req, res){
  Sku.findById(req.params.pId).exec()
  .then(function(sku){
    console.log(sku);
    res.json(sku);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one sku
router.put('/', function(req, res){
  Sku.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(sku){
    console.log(sku);
    res.json(sku);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Sku.remove({_id: req.params.id})
  .then(function(sku){
    console.log(sku);
    res.json(sku);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
