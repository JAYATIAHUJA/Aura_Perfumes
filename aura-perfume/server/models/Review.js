const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    comment: {
        type: String,
        required: true,
        maxLength: 1000
    },
    verified: {
        type: Boolean,
        default: false
    },
    helpful: {
        count: {
            type: Number,
            default: 0
        },
        users: [String] // Store user IPs or IDs who found it helpful
    },
    images: [{
        url: String,
        alt: String
    }]
}, {
    timestamps: true
});

// Index for efficient queries
reviewSchema.index({ product: 1, rating: -1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);