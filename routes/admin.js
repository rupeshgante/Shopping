const express=require('express');
const router=express.Router();
const adminController=require('../controllers/admin');

router.get('/products',adminController.getProducts);

module.exports=router;
