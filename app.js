const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');


const app = express();
const sequelize = require('./util/database');


const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(adminRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    // return User.findByPk(1);
    console.log(result);
    app.listen('5000');
  }).catch(err=>console.log(err));  

