const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create product
router.post('/', async (req, res) => {
    try {
        const { name, description, category, price, rating } = req.body;
        const product = new Product({
            name,
            description,
            category,
            price,
            rating,
            createdBy: req.user._id
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create product' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        let query = {};
        
        // Filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        // Filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }
        
        // Filter by rating
        if (req.query.minRating) {
            query.rating = { $gte: Number(req.query.minRating) };
        }
        
        // Search by name or description
        if (req.query.search) {
            query.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const { name, description, category, price, rating } = req.body;
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            { name, description, category, price, rating },
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update product' });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
});

module.exports = router;