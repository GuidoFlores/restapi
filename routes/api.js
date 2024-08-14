const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/items', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItem);

//
router.get('/items/:token', itemController.verifyToken)

router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;