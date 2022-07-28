const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: false }));


const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');
const Orders=require('./models/orders');
const OrderItem=require('./models/order-items');

const adminRoutes = require('./routes/admin');

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(adminRoutes);

app.use((req,res,next)=>{
  console.log('URL:'+req.url);
  res.sendFile(path.join(__dirname,`public/${req.url}`));
})

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
User.hasMany(Orders);
Orders.belongsTo(User);
Orders.belongsToMany(Product,{through:OrderItem});
Product.belongsToMany(Orders,{through:OrderItem});

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'rupesh', email: 'rupesh@gmail.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);

  return user.createCart();
  })
  .then(order=>{
    app.listen(5000);

  })
  .catch(err => {
    console.log(err);
  });
