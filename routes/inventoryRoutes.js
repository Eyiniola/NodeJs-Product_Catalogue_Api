const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// create inventory
router.post('/', inventoryController.createInventory);

//get low stock inventory
router.get('/lowstock', inventoryController.getLowStockItems);

//get inventory for a specific product
router.get('/product/:productId', inventoryController.getInventoryByProduct);

// get inventory by inventory Id
router.get('/:id', inventoryController.getInventoryById);

// update inventory stock
router.put('/:id', inventoryController.updateInventory);

// delete inventory
router.delete('/:id', inventoryController.deleteInventory);


module.exports = router;