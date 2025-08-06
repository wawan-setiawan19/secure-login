const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken); // All routes protected

router.post('/', productController.create);
router.get('/', productController.list);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);
router.get('/:id', productController.getProductById);

module.exports = router;