const Product = require('../models/productModel');

// create a new product
exports.createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);

        // check if product exists
        const existingProduct = await Product.findOne({ name: product.name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
};

// get all products 
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error});
    }
};


// get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error});
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted succesfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};