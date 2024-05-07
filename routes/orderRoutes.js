const express = require('express');
const router = express.Router();
const orderController=require('../controllers/orderController')

router.route('/allorders')
.get(orderController.getAllOrders)

router.route('/addorder')
.post(orderController.addOrder)

router.route('/updateorder/:orderId')
.put(orderController.updateOrder)

router.route('/deleteorder/:orderId')
.delete(orderController.deleteSingleOrder)

module.exports=router