const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts=(req,res,next)=>{
    Product.findAll()
    .then(products => {
      // console.log('products are: '+products);
    res.json(products);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      console.log('this is cart: '+cart);
      return cart
        .getProducts()
        .then(products => {
          res.json(products)
          });
        })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('id is '+prodId)
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.json(fetchedCart);
    })
    .catch(err => console.log(err));
};



