const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const ProductController = require('./product.controller');






router.get('/', ProductController.findAllProducts());
router.post('/add', ProductController.createProduct());
router.post('/update/:id', ProductController.updateProductById());
router.delete('/delete/:id', ProductController.deleteProductById())
router.post('/upload', upload.single('image'), ProductController.uploadImage());
router.get('/:id',ProductController.getOneProduct())

module.exports = router;