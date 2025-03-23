const Inventory =  require('../models/inventoryModel');
const mongoose = require('mongoose');


// Creating Inventory
exports.createInventory = async (req, res) => {
    try {
      const { stock, color, warehouseLocation, product } = req.body;

      // Check if inventory with the same product and color already exists
      const existingInventory = await Inventory.findOne({ product, color });

      if (existingInventory) {
        return res.status(400).json({ message: 'This inventory specification already exists', });
      }
  
      // Validate product existence
      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ message: 'Invalid Product ID' });
      }
  
      const newInventory = new Inventory({
        stock,
        color,
        warehouseLocation,
        product
      });
  
      const savedInventory = await newInventory.save();
      res.status(201).json(savedInventory);
    } catch (err) {
        console.error('Create Error:', err);
      res.status(500).json({ message: 'Failed to create inventory', error: err });
    }
  };


// Searching inventory by id
exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get inventory', error })
    }
};


// Get inventory by Product ID
exports.getInventoryByProduct = async (req, res) => {
    try {
        const inventories = await Inventory.find({ product: req.params.productId }).select('color stock warehouseLocation').lean();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product inventory', error })
    }
};

//Update inventory
exports.updateInventory = async (req, res) => {
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInventory) return res.status(404).json({ message: 'Inventory not found' });
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Inventory', error });
    }
};

// Delete a product
exports.deleteInventory = async (req, res) => {
    try {
        const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedInventory) return res.status(404).json({ message: 'Inventory not found' });
        res.status(200).json({ message: 'Inventory deleted succesfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Inventory', error });
    }
};

// Get low stock inventory
exports.getLowStockItems = async (req, res) => {
    try {
        const threshold = req.query.threshold || 100;
        const lowStockItems = await Inventory.find({ stock: { $lt: threshold} }).populate('product', 'name').lean();

        if (lowStockItems.length === 0) {
            return res.status(404).json({ message: 'No low stock items found' });
        }

        res.status(200).json(lowStockItems);
    } catch (error) {
        console.error('Error fetching low stock items:', error);
        res.status(500).json({ message: 'Failed to fetch low stock items', error });
    }
};