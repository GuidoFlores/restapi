const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('../middleware/verifyToken');


router.use('/api', verifyToken);

router.post('/items', itemController.createItem, verifyToken);
router.get('/items', itemController.getAllItems,verifyToken);
router.get('/items/:id', itemController.getItem,verifyToken);

//


router.put('/items/:id', itemController.updateItem,verifyToken);
router.delete('/items/:id', itemController.deleteItem,verifyToken);

module.exports = router;