const mongoose = require('mongoose');
const Product = require('../models/Product');
const Review = require('../models/Review');
require('dotenv').config();

const products = [
    {
        name: "AURA Mystic Rose",
        slug: "aura-mystic-rose",
        description: "An enchanting blend of Bulgarian rose, jasmine, and sandalwood that captures the essence of feminine mystique. This luxurious fragrance opens with fresh bergamot and pink pepper, evolving into a heart of damask rose and peony, before settling into a warm base of amber, vanilla, and white musk.",
        shortDescription: "Enchanting rose blend with jasmine and sandalwood notes",
        price: 89.99,
        originalPrice: 109.99,
        category: "floral",
        brand: "AURA",
        sizes: [
            { volume: "30ml", price: 89.99, inStock: true },
            { volume: "50ml", price: 129.99, inStock: true },
            { volume: "100ml", price: 189.99, inStock: false }
        ],
        images: [
            { url: "/PERFUME2.png", alt: "AURA Mystic Rose - Front View", isPrimary: true },
            { url: "/PERFUME3.png", alt: "AURA Mystic Rose - Side View", isPrimary: false },
            { url: "/PERFUME4.png", alt: "AURA Mystic Rose - Detail View", isPrimary: false }
        ],
        ingredients: ["Bulgarian Rose", "Jasmine", "Sandalwood", "Bergamot", "Pink Pepper", "Damask Rose", "Peony", "Amber", "Vanilla", "White Musk"],
        notes: {
            top: ["Bergamot", "Pink Pepper", "Fresh Rose Petals"],
            middle: ["Damask Rose", "Jasmine", "Peony", "Lily of the Valley"],
            base: ["Sandalwood", "Amber", "Vanilla", "White Musk"]
        },
        rating: {
            average: 4.8,
            count: 127
        },
        inStock: true,
        featured: true,
        tags: ["luxury", "romantic", "evening", "signature", "rose", "floral"],
        seoTitle: "AURA Mystic Rose - Luxury Floral Perfume | Premium Rose Fragrance",
        seoDescription: "Experience the enchanting AURA Mystic Rose perfume with Bulgarian rose, jasmine, and sandalwood. Perfect for romantic evenings and special occasions."
    },
    {
        name: "AURA Ocean Breeze",
        slug: "aura-ocean-breeze",
        description: "Dive into the refreshing essence of ocean waves with this invigorating aquatic fragrance. Featuring crisp sea salt, marine accord, and driftwood, this scent captures the freedom of coastal living with notes of citrus, water lily, and clean musk.",
        shortDescription: "Fresh aquatic fragrance with sea salt and marine notes",
        price: 79.99,
        originalPrice: 99.99,
        category: "fresh",
        brand: "AURA",
        sizes: [
            { volume: "30ml", price: 79.99, inStock: true },
            { volume: "50ml", price: 119.99, inStock: true },
            { volume: "100ml", price: 169.99, inStock: true }
        ],
        images: [
            { url: "/PERFUME6.png", alt: "AURA Ocean Breeze - Front View", isPrimary: true },
            { url: "/PERFUME7.png", alt: "AURA Ocean Breeze - Side View", isPrimary: false },
            { url: "/PERFUME8.png", alt: "AURA Ocean Breeze - Detail View", isPrimary: false }
        ],
        ingredients: ["Sea Salt", "Marine Accord", "Driftwood", "Lemon", "Water Lily", "Clean Musk", "Seaweed Extract", "Mint", "Cedar"],
        notes: {
            top: ["Sea Salt", "Lemon", "Fresh Mint", "Ocean Air"],
            middle: ["Water Lily", "Marine Accord", "Seaweed", "Eucalyptus"],
            base: ["Driftwood", "Clean Musk", "Cedar", "Ambergris"]
        },
        rating: {
            average: 4.6,
            count: 89
        },
        inStock: true,
        featured: true,
        tags: ["fresh", "aquatic", "summer", "unisex", "daytime", "clean"],
        seoTitle: "AURA Ocean Breeze - Fresh Aquatic Perfume | Marine Fragrance",
        seoDescription: "Refresh your senses with AURA Ocean Breeze perfume featuring sea salt, marine accord, and clean musk. Perfect for summer and daytime wear."
    },
    {
        name: "AURA Golden Amber",
        slug: "aura-golden-amber",
        description: "A warm and sophisticated oriental fragrance that embodies luxury and elegance. Rich amber, exotic spices, and precious woods create a captivating scent journey with hints of saffron, oud, and Madagascar vanilla.",
        shortDescription: "Warm oriental blend with amber, spices, and precious woods",
        price: 149.99,
        originalPrice: 179.99,
        category: "oriental",
        brand: "AURA",
        sizes: [
            { volume: "30ml", price: 149.99, inStock: true },
            { volume: "50ml", price: 199.99, inStock: true },
            { volume: "100ml", price: 279.99, inStock: true }
        ],
        images: [
            { url: "/PERFUMEBOTTLE1.png", alt: "AURA Golden Amber - Front View", isPrimary: true },
            { url: "/PERFUMR5.png", alt: "AURA Golden Amber - Luxury View", isPrimary: false }
        ],
        ingredients: ["Golden Amber", "Saffron", "Oud", "Madagascar Vanilla", "Cardamom", "Rose", "Sandalwood", "Patchouli", "Benzoin"],
        notes: {
            top: ["Saffron", "Cardamom", "Pink Pepper", "Bergamot"],
            middle: ["Rose", "Oud", "Jasmine", "Cinnamon"],
            base: ["Golden Amber", "Madagascar Vanilla", "Sandalwood", "Patchouli", "Benzoin"]
        },
        rating: {
            average: 4.9,
            count: 156
        },
        inStock: true,
        featured: true,
        tags: ["luxury", "oriental", "evening", "sophisticated", "amber", "oud", "premium"],
        seoTitle: "AURA Golden Amber - Luxury Oriental Perfume | Premium Amber Fragrance",
        seoDescription: "Indulge in AURA Golden Amber perfume with rich amber, exotic spices, and precious oud. A sophisticated oriental fragrance for evening wear."
    },
    {
        name: "AURA Wild Lavender",
        slug: "aura-wild-lavender",
        description: "Experience the calming beauty of Provence lavender fields with this serene and elegant fragrance. Pure lavender essential oil blends with bergamot, honey, and soft woods to create a peaceful and sophisticated scent.",
        shortDescription: "Serene lavender blend with bergamot and honey notes",
        price: 69.99,
        originalPrice: 89.99,
        category: "floral",
        brand: "AURA",
        sizes: [
            { volume: "30ml", price: 69.99, inStock: true },
            { volume: "50ml", price: 99.99, inStock: true },
            { volume: "100ml", price: 149.99, inStock: true }
        ],
        images: [
            { url: "/LAVENDER.png", alt: "AURA Wild Lavender - Front View", isPrimary: true }
        ],
        ingredients: ["Provence Lavender", "Bergamot", "Honey", "Rosemary", "Sage", "Cedar", "White Tea", "Soft Musk"],
        notes: {
            top: ["Lavender", "Bergamot", "Lemon", "Rosemary"],
            middle: ["Honey", "White Tea", "Sage", "Geranium"],
            base: ["Cedar", "Soft Musk", "Sandalwood", "Tonka Bean"]
        },
        rating: {
            average: 4.7,
            count: 203
        },
        inStock: true,
        featured: false,
        tags: ["calming", "lavender", "natural", "relaxing", "unisex", "therapeutic"],
        seoTitle: "AURA Wild Lavender - Pure Lavender Perfume | Calming Fragrance",
        seoDescription: "Find peace with AURA Wild Lavender perfume featuring pure Provence lavender, bergamot, and honey. Perfect for relaxation and daily wear."
    },
    {
        name: "AURA Citrus Burst",
        slug: "aura-citrus-burst",
        description: "An energizing and vibrant citrus fragrance that awakens the senses. Fresh grapefruit, sweet orange, and zesty lime create an uplifting blend perfect for starting your day with confidence and joy.",
        shortDescription: "Energizing citrus blend with grapefruit and orange notes",
        price: 59.99,
        originalPrice: 79.99,
        category: "citrus",
        brand: "AURA",
        sizes: [
            { volume: "30ml", price: 59.99, inStock: true },
            { volume: "50ml", price: 89.99, inStock: true },
            { volume: "100ml", price: 129.99, inStock: true }
        ],
        images: [
            { url: "/PERFUME2.png", alt: "AURA Citrus Burst - Front View", isPrimary: true },
            { url: "/PERFUME3.png", alt: "AURA Citrus Burst - Side View", isPrimary: false }
        ],
        ingredients: ["Pink Grapefruit", "Sweet Orange", "Lime", "Mandarin", "Lemongrass", "White Pepper", "Vetiver", "Light Musk"],
        notes: {
            top: ["Pink Grapefruit", "Sweet Orange", "Lime", "Mandarin"],
            middle: ["Lemongrass", "White Pepper", "Green Leaves", "Mint"],
            base: ["Vetiver", "Light Musk", "Cedar", "Blonde Woods"]
        },
        rating: {
            average: 4.5,
            count: 98
        },
        inStock: true,
        featured: false,
        tags: ["energizing", "citrus", "morning", "fresh", "uplifting", "vitamin", "zesty"],
        seoTitle: "AURA Citrus Burst - Fresh Citrus Perfume | Energizing Fragrance",
        seoDescription: "Energize your day with AURA Citrus Burst perfume featuring grapefruit, orange, and lime. Perfect for morning wear and active lifestyles."
    }
];

const reviews = [
    // Reviews for AURA Mystic Rose
    {
        customerName: "Emily Chen",
        email: "emily.chen@example.com",
        rating: 5,
        title: "Absolutely Divine!",
        comment: "This perfume is everything I dreamed of and more. The rose scent is so elegant and not overpowering at all. I get compliments everywhere I go! The longevity is incredible - still smelling amazing after 8 hours.",
        verified: true
    },
    {
        customerName: "Sarah Johnson",
        email: "sarah.j@example.com",
        rating: 5,
        title: "My New Signature Scent",
        comment: "I've been searching for the perfect rose perfume for years, and this is it! The blend with jasmine and sandalwood makes it so sophisticated. Worth every penny!",
        verified: true
    },
    {
        customerName: "Maria Rodriguez",
        email: "maria.r@example.com",
        rating: 4,
        title: "Beautiful but Strong",
        comment: "Gorgeous fragrance with amazing projection. Maybe a bit too strong for daily wear, but perfect for special occasions. The bottle is also stunning!",
        verified: false
    },
    
    // Reviews for AURA Ocean Breeze
    {
        customerName: "James Wilson",
        email: "james.w@example.com",
        rating: 5,
        title: "Perfect Summer Scent",
        comment: "This is my go-to fragrance for summer! So fresh and clean, reminds me of vacation by the ocean. Great performance and very versatile.",
        verified: true
    },
    {
        customerName: "Lisa Thompson",
        email: "lisa.t@example.com",
        rating: 4,
        title: "Fresh and Clean",
        comment: "Love how clean this smells! Perfect for the office and casual wear. Not too heavy, which I appreciate. Lasts about 6 hours on me.",
        verified: true
    },
    
    // Reviews for AURA Golden Amber
    {
        customerName: "David Park",
        email: "david.p@example.com",
        rating: 5,
        title: "Luxury in a Bottle",
        comment: "This is hands down the most sophisticated fragrance I own. The oud and amber combination is intoxicating. Perfect for evening wear and special occasions.",
        verified: true
    },
    {
        customerName: "Rachel Green",
        email: "rachel.g@example.com",
        rating: 5,
        title: "Exceptional Quality",
        comment: "You can tell this is a premium fragrance from the first spray. Rich, complex, and absolutely gorgeous. The sillage is perfect - noticeable but not overwhelming.",
        verified: true
    },
    
    // Reviews for AURA Wild Lavender
    {
        customerName: "Michael Brown",
        email: "michael.b@example.com",
        rating: 4,
        title: "So Relaxing",
        comment: "I bought this for my wife, but I love it too! Very calming and peaceful. Great for bedtime or when you want to feel relaxed. Unisex appeal is a plus.",
        verified: true
    },
    {
        customerName: "Anna Davis",
        email: "anna.d@example.com",
        rating: 5,
        title: "Pure Lavender Bliss",
        comment: "As someone who loves lavender, this exceeded my expectations. It's not just lavender - the honey and bergamot add such beautiful depth. I'm ordering the 100ml next!",
        verified: true
    },
    
    // Reviews for AURA Citrus Burst
    {
        customerName: "Kevin Lee",
        email: "kevin.l@example.com",
        rating: 4,
        title: "Great Energy Booster",
        comment: "Perfect morning fragrance! Really does give me an energy boost. The citrus is very natural and not artificial at all. Good value for money.",
        verified: true
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aura_perfume', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await Product.deleteMany({});
        await Review.deleteMany({});
        console.log('Cleared existing data');
        
        // Insert products
        const insertedProducts = await Product.insertMany(products);
        console.log(`Inserted ${insertedProducts.length} products`);
        
        // Insert reviews with proper product references
        const reviewsWithProducts = reviews.map((review, index) => ({
            ...review,
            product: insertedProducts[Math.floor(index / 2)]._id // Distribute reviews among products
        }));
        
        await Review.insertMany(reviewsWithProducts);
        console.log(`Inserted ${reviewsWithProducts.length} reviews`);
        
        // Update product ratings
        for (const product of insertedProducts) {
            const productReviews = await Review.find({ product: product._id });
            if (productReviews.length > 0) {
                const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / productReviews.length;
                
                await Product.findByIdAndUpdate(product._id, {
                    'rating.average': parseFloat(averageRating.toFixed(1)),
                    'rating.count': productReviews.length
                });
            }
        }
        
        console.log('Database seeded successfully!');
        process.exit(0);
        
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();