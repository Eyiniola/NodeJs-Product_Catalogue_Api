const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: String,
    image: String,
});

module.exports = mongoose.model('Category', categorySchema);