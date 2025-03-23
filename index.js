const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hyce_store', {
    //useNewUrlParser: true, depreacted
    //useUnifiedTopology: true deprecated
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));


// Routes
app.get('/api/', (req, res) => {
    res.json({ message: 'Welcome to Hyce store' });
});
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventories', inventoryRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});