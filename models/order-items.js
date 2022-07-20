const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const OrderItem=sequelize.define('order-item',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    orderedItem:Sequelize.STRING,
    imageUrl:Sequelize.STRING
    
})
module.exports=OrderItem;