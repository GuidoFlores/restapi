const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/items', itemController.createItem);
router.get('/items', itemController.getItem);
router.get('/items/:id', itemController.getItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;