const express=require('express');
const router=express.Router();
const adminController=require('../controllers/admin');

router.get('/',adminController.getIndex);

router.get('/products/:page',adminController.getIndex);

router.get('/cart', adminController.getCart);

router.post('/cart', adminController.postCart);

router.post('/orders',adminController.postOrder);

router.get('/orders',adminController.getOrder);

module.exports=router;
