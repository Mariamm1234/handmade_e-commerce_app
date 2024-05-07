const express = require('express');
//router==app
const router = express.Router();
const cartController=require('../controllers/cartController')

router.route('/:userEmail')
.post(cartController.addItem)

router.route('/deleteItem/:userEmail/:itemId')
.delete(cartController.deleteItem)

router.route('/deleteCart/:cartId/:userEmail')
.delete(cartController.deleteCart)

router.route('/updateCart/:itemId/:userEmail')
.put(cartController.updateCart)

module.exports=router