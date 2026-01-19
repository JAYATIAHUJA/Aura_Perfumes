/**
 * Products Grid Component
 * Displays a grid of product cards with loading and error states
 */

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductsGrid.css';

function ProductsGrid({ featured = false, limit = null }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [featured, limit]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (featured) params.append('featured', 'true');
            if (limit) params.append('limit', limit.toString());

            const response = await fetch(`http://localhost:5000/api/products?${params}`);

            if (!response.ok) {
                throw new Error('Backend server not running');
            }

            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            // Fallback to mock data when backend is not available
            const mockProducts = [
                {
                    _id: '1',
                    name: 'AURA Mystic Rose',
                    slug: 'aura-mystic-rose',
                    shortDescription: 'Enchanting rose blend with jasmine and sandalwood notes',
                    price: 89.99,
                    originalPrice: 109.99,
                    category: 'floral',
                    images: [{ url: '/PERFUME2.png', alt: 'AURA Mystic Rose', isPrimary: true }],
                    rating: { average: 4.8, count: 127 },
                    sizes: [
                        { volume: '30ml', price: 89.99, inStock: true },
                        { volume: '50ml', price: 129.99, inStock: true }
                    ],
                    inStock: true,
                    featured: true
                },
                {
                    _id: '2',
                    name: 'AURA Ocean Breeze',
                    slug: 'aura-ocean-breeze',
                    shortDescription: 'Fresh aquatic fragrance with sea salt and marine notes',
                    price: 79.99,
                    originalPrice: 99.99,
                    category: 'fresh',
                    images: [{ url: '/PERFUME6.png', alt: 'AURA Ocean Breeze', isPrimary: true }],
                    rating: { average: 4.6, count: 89 },
                    sizes: [
                        { volume: '30ml', price: 79.99, inStock: true },
                        { volume: '50ml', price: 119.99, inStock: true }
                    ],
                    inStock: true,
                    featured: true
                },
                {
                    _id: '3',
                    name: 'AURA Golden Amber',
                    slug: 'aura-golden-amber',
                    shortDescription: 'Warm oriental blend with amber, spices, and precious woods',
                    price: 149.99,
                    originalPrice: 179.99,
                    category: 'oriental',
                    images: [{ url: '/PERFUMEBOTTLE1.png', alt: 'AURA Golden Amber', isPrimary: true }],
                    rating: { average: 4.9, count: 156 },
                    sizes: [
                        { volume: '30ml', price: 149.99, inStock: true },
                        { volume: '50ml', price: 199.99, inStock: true }
                    ],
                    inStock: true,
                    featured: true
                },
                {
                    _id: '4',
                    name: 'AURA Wild Lavender',
                    slug: 'aura-wild-lavender',
                    shortDescription: 'Serene lavender blend with bergamot and honey notes',
                    price: 69.99,
                    originalPrice: 89.99,
                    category: 'floral',
                    images: [{ url: '/LAVENDER.png', alt: 'AURA Wild Lavender', isPrimary: true }],
                    rating: { average: 4.7, count: 203 },
                    sizes: [
                        { volume: '30ml', price: 69.99, inStock: true },
                        { volume: '50ml', price: 99.99, inStock: true }
                    ],
                    inStock: true,
                    featured: false
                },
                {
                    _id: '5',
                    name: 'AURA Citrus Burst',
                    slug: 'aura-citrus-burst',
                    shortDescription: 'Energizing citrus blend with grapefruit and orange notes',
                    price: 59.99,
                    originalPrice: 79.99,
                    category: 'citrus',
                    images: [{ url: '/PERFUME3.png', alt: 'AURA Citrus Burst', isPrimary: true }],
                    rating: { average: 4.5, count: 98 },
                    sizes: [
                        { volume: '30ml', price: 59.99, inStock: true },
                        { volume: '50ml', price: 89.99, inStock: true }
                    ],
                    inStock: true,
                    featured: false
                }
            ];

            let filteredProducts = mockProducts;
            if (featured) {
                filteredProducts = mockProducts.filter(p => p.featured);
            }
            if (limit) {
                filteredProducts = filteredProducts.slice(0, limit);
            }

            setProducts(filteredProducts);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="products-grid-container">
                <div className="products-grid loading">
                    {[...Array(featured ? 4 : 6)].map((_, index) => (
                        <div key={index} className="product-card-skeleton">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line short"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-grid-container">
                <div className="error-message">
                    <div className="error-icon">⚠️</div>
                    <h3>Unable to load products</h3>
                    <p>{error}</p>
                    <button className="retry-btn" onClick={fetchProducts}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="products-grid-container">
                <div className="empty-state">
                    <div className="empty-icon">🌸</div>
                    <h3>No products found</h3>
                    <p>We're currently updating our collection. Please check back soon!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="products-grid-container">
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsGrid;