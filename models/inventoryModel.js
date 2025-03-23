const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    stock: { type: Number, required: true },
    color: { type: String, required: true },
    warehouseLocation: String,
    lastRestocked: Date,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

// Ensure unique product and color combination
inventorySchema.index({ product: 1, color: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);