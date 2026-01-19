const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

// GET /api/reviews - Get all reviews (with pagination)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const reviews = await Review.find()
            .populate('product', 'name slug images')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Review.countDocuments();
        
        res.json({
            reviews,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/reviews - Create new review
router.post('/', async (req, res) => {
    try {
        const { product, customerName, email, rating, title, comment } = req.body;
        
        // Check if product exists
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const review = new Review({
            product,
            customerName,
            email,
            rating,
            title,
            comment
        });
        
        await review.save();
        
        // Update product rating
        await updateProductRating(product);
        
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/reviews/:id/helpful - Mark review as helpful
router.put('/:id/helpful', async (req, res) => {
    try {
        const { userIdentifier } = req.body; // Could be IP or user ID
        
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        // Check if user already marked as helpful
        if (review.helpful.users.includes(userIdentifier)) {
            return res.status(400).json({ message: 'Already marked as helpful' });
        }
        
        review.helpful.count += 1;
        review.helpful.users.push(userIdentifier);
        await review.save();
        
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Helper function to update product rating
async function updateProductRating(productId) {
    try {
        const reviews = await Review.find({ product: productId });
        
        if (reviews.length === 0) {
            await Product.findByIdAndUpdate(productId, {
                'rating.average': 0,
                'rating.count': 0
            });
            return;
        }
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);
        
        await Product.findByIdAndUpdate(productId, {
            'rating.average': parseFloat(averageRating),
            'rating.count': reviews.length
        });
    } catch (error) {
        console.error('Error updating product rating:', error);
    }
}

module.exports = router;