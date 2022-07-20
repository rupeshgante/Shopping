const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Order=sequelize.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    totalPrice:Sequelize.DOUBLE,
    
});
module.exports=Order;

