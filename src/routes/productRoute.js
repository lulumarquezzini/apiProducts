const express = require('express');
const router = express.Router();
const pController = require('../controllers/productController');

router.get('/products', pController.list);

router.post('/products', pController.create);

router.put('/products/:id', pController.update);

router.delete('/products/:id', pController.destroy);

module.exports = router;