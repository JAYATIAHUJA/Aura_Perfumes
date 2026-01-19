const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');

// GET /api/products - Get all products with optional filtering
router.get('/', async (req, res) => {
    try {
        const { category, featured, sort, limit, search } = req.query;
        let query = {};
        
        if (category) query.category = category;
        if (featured) query.featured = featured === 'true';
        if (search) {
            query.$text = { $search: search };
        }
        
        let productsQuery = Product.find(query);
        
        // Sorting
        if (sort) {
            switch (sort) {
                case 'price-low':
                    productsQuery = productsQuery.sort({ price: 1 });
                    break;
                case 'price-high':
                    productsQuery = productsQuery.sort({ price: -1 });
                    break;
                case 'rating':
                    productsQuery = productsQuery.sort({ 'rating.average': -1 });
                    break;
                case 'newest':
                    productsQuery = productsQuery.sort({ createdAt: -1 });
                    break;
                default:
                    productsQuery = productsQuery.sort({ featured: -1, 'rating.average': -1 });
            }
        }
        
        if (limit) {
            productsQuery = productsQuery.limit(parseInt(limit));
        }
        
        const products = await productsQuery.exec();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:slug - Get single product by slug
router.get('/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id/reviews - Get reviews for a product
router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/products - Create new product (admin only - simplified for demo)
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;