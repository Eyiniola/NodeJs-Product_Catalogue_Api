const Category = require('../models/categoryModel');
const Product = require('../models/productModel');


exports.createCategory = async (req, res) => {
    try{
        const category = await Category.create(req.body);

        // check if category exists
        const existingCategory = await Category.findOne({ name: category.name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error });
    }
};




// Get Categories
exports.getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error });
    }
};

// Get products by category with optional filters
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { minPrice, maxPrice, search } = req.query;

        // check if category exists
        const category = await Category.findById({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }



        let filter = { category: categoryId };

        // Apply search filter
        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // search won't be case sensitive
        }

        // Apply price filtering
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const products = await Product.find(filter).populate('category');

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};