const Product = require('../models/product');

exports.getProducts=(req,res,next)=>{
    Product.findAll()
    .then(products => {
    res.json(products);
    })
    .catch(err => {
      console.log(err);
    });
}