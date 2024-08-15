const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('./middleware/verifyToken');


router.use('/api', verifyToken);

router.post('/api/items', itemController.createItem);
router.get('/api/items', itemController.getAllItems);
router.get('/api/items/:id', itemController.getItem);

//


router.put('/api/items/:id', itemController.updateItem);
router.delete('/api/items/:id', itemController.deleteItem);

module.exports = router;