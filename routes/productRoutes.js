const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
router.route('/allproduct')
.get(productController.getAllProducts)

router.route('/addproduct')
.post(productController.addProduct)

router.route('/:productId')
.get(productController.getSingleProduct)
router.route('/category/:category')
.get(productController.searchByCategory)

router.route('/updateproduct/:productId')
.put(productController.updateProduct)

router.route('/deleteproduct/:productId')
.delete(productController.deleteProduct)
module.exports=router