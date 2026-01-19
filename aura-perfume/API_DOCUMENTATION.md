# AURA Perfume API Documentation

## 🚀 Quick Start

**Backend Server:** Running on http://localhost:5000
**Frontend Application:** Running on http://localhost:5173
**Database:** MongoDB (Local instance)

## 📋 API Endpoints

### Products

#### GET /api/products
Get all products with optional filtering
- **Query Parameters:**
  - `category` - Filter by category (floral, oriental, woody, fresh, citrus, spicy)
  - `featured` - Get featured products (true/false)
  - `sort` - Sort products (price-low, price-high, rating, newest)
  - `limit` - Limit number of results
  - `search` - Text search in products

**Example:** `GET /api/products?featured=true&limit=4`

#### GET /api/products/:slug
Get single product by slug
- **Parameters:**
  - `slug` - Product slug (e.g., "aura-mystic-rose")

**Example:** `GET /api/products/aura-mystic-rose`

#### GET /api/products/:id/related
Get related products
- **Parameters:**
  - `id` - Product ID

### Reviews

#### GET /api/reviews
Get all reviews with pagination
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 10)

#### GET /api/reviews/product/:productId
Get reviews for specific product
- **Parameters:**
  - `productId` - Product ID

#### POST /api/reviews
Create new review
- **Body:**
```json
{
  "product": "productId",
  "customerName": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "title": "Amazing fragrance!",
  "comment": "Absolutely love this perfume..."
}
```

### Health Check

#### GET /api/health
Check if API is running
- Returns: `{ "message": "AURA Perfume API is running!" }`

## 🛍️ Sample Products

The database has been seeded with 5 luxury perfumes:

1. **AURA Mystic Rose** - Enchanting floral blend ($89.99)
2. **AURA Ocean Breeze** - Fresh aquatic fragrance ($79.99)
3. **AURA Golden Amber** - Warm oriental luxury ($149.99)
4. **AURA Wild Lavender** - Serene lavender blend ($69.99)
5. **AURA Citrus Burst** - Energizing citrus blend ($59.99)

## 🌟 Features Implemented

### Frontend Features
- ✅ Responsive product grid with filtering
- ✅ Detailed product pages with image gallery
- ✅ Shopping cart functionality
- ✅ Product reviews and ratings
- ✅ Social media sharing
- ✅ Smooth GSAP animations
- ✅ Mobile-responsive design
- ✅ Loading states and error handling

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ Product and review models
- ✅ CORS enabled for frontend communication
- ✅ Data validation and error handling
- ✅ Database seeding script

## 🎨 Frontend Components

- **Navigation** - Header with logo and menu
- **HeroSection** - Landing banner with animations
- **ProductsGrid** - Product listing with cards
- **ProductCard** - Individual product preview
- **ProductDetail** - Full product page with gallery
- **ScrollStory** - Animated story section
- **StickyBottle** - Floating perfume bottle animation
- **Footer** - Contact and social links

## 🚀 Getting Started

1. **Start Backend:**
```bash
cd server
node server.js
```

2. **Start Frontend:**
```bash
npm run dev
```

3. **Access Website:**
Open http://localhost:5173 in your browser

## 📱 Mobile Responsive
The application is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🔧 Environment Variables

Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aura_perfume
```

## 📦 Tech Stack

**Frontend:**
- React 19
- Vite
- GSAP (animations)
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

Your AURA Perfume e-commerce website is now complete and running! 🎉