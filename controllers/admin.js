const Cart = require('../models/cart');
const Product = require('../models/product');
const ItemsPerPage=2;

exports.getIndex=(req,res,next)=>{
const page=req.params.page;
console.log('pageno:'+page);
let totalItems;
Product.count()
       .then(numProducts=>{
        totalItems=numProducts;
        console.log('total products'+totalItems);
        return Product.findAll({
            offset:((page-1)*ItemsPerPage),
            limit:ItemsPerPage    
        })
       })
         .then(products=>{
          console.log('products  '+products);
          res.json({products,
          totalProducts:totalItems,
          hasNextPage:ItemsPerPage*page<totalItems,
          hasPreviosPage:page>1,
          nextPage:page+1,
          prevPage:page-1,
          lastPage:Math.ceil(totalItems/ItemsPerPage)
          })
         })

  // Product.findAll()
  // .then(products => {
  //   // console.log('products are: '+products);
  // res.json(products);
  // })
  // .catch(err => {
  //   console.log(err);
  // });
}

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
          res.status(200).json({
            success:true,
            products:products})
          });
        })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {

  if(!req.body.productId){
    return res.status(400).json({success:false,message:'productid is missing'})
  }
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
      console.log('cart is: '+fetchedCart);
      res.status(200).json({success:true,message:'Successfully added to cart'})
    })
    .catch(err => {
      res.status(500).json({success:false,message:'Unable to add to cart'})
    });
};



