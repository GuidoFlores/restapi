const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('./middleware/verifyToken');


router.use('/api', verifyToken);

router.post('/api/items', itemController.createItem, verifyToken.verifyToken);
router.get('/api/items', itemController.getAllItems,verifyToken.verifyToken);
router.get('/api/items/:id', itemController.getItem,verifyToken.verifyToken);

//


router.put('/api/items/:id', itemController.updateItem,verifyToken.verifyToken);
router.delete('/api/items/:id', itemController.deleteItem,verifyToken.verifyToken);

module.exports = router;