const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('./middleware/verify_token'); 

router.use('/api', verifyToken);

router.get('/api/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const itemDoc = await db.collection('items').doc(itemId).get();
        
        if (!itemDoc.exists) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }

        res.status(200).json({ id: itemDoc.id, ...itemDoc.data() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/items', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;