const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors=require('cors');

app.use(cors());
app.use(bodyParser.json({ extended: false }));


const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');

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

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

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
  .then(cart=>{
    app.listen(5000);

  })
  .catch(err => {
    console.log(err);
  });
