const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('../middleware/verifyToken');


router.use('/api', verifyToken);

router.post('/items',verifyToken, itemController.createItem);
router.get('/items', verifyToken, itemController.getAllItems);
router.get('/items/:id', verifyToken, itemController.getItem);

//


router.put('/items/:id', verifyToken, itemController.updateItem);
router.delete('/items/:id', verifyToken, itemController.deleteItem);

module.exports = router;