const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController');
const { use } = require('./productRoutes');

router.route('/login')
.post(userController.login)

router.route('/register')
.post(userController.register)

router.route('/user/profile/:userEmail')
.get(userController.getProfile)

router.route('/user/updateProfile/:userEmail')
.put(userController.updateProfile)

router.route('/user/orders/userorder/:email')
.get(userController.userOrder)

router.route('/user/deleteAccount/:userEmail')
.delete(userController.deleteAccount)

module.exports=router