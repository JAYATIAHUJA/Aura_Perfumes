/**
 * Product Card Component
 * Responsive product card with hover effects and click navigation
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product.slug}`);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
        }

        return stars;
    };

    const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

    return (
        <div
            className={`product-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div className="product-card-image-container">
                {product.originalPrice && product.originalPrice > product.price && (
                    <div className="product-card-badge">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                )}

                <div className="product-card-image">
                    <img
                        src={primaryImage?.url || '/PERFUME2.png'}
                        alt={primaryImage?.alt || product.name}
                    />
                </div>

                <div className="product-card-overlay">
                    <button className="quick-view-btn">
                        Quick View
                    </button>
                </div>
            </div>

            <div className="product-card-content">
                <div className="product-card-category">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>

                <h3 className="product-card-title">{product.name}</h3>

                <p className="product-card-description">
                    {product.shortDescription}
                </p>

                <div className="product-card-rating">
                    <div className="stars">
                        {renderStars(product.rating?.average || 0)}
                    </div>
                    <span className="rating-count">
                        ({product.rating?.count || 0})
                    </span>
                </div>

                <div className="product-card-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="original-price">${product.originalPrice}</span>
                    )}
                </div>

                <div className="product-card-sizes">
                    {product.sizes?.slice(0, 3).map((size, index) => (
                        <span key={index} className={`size-option ${!size.inStock ? 'out-of-stock' : ''}`}>
                            {size.volume}
                        </span>
                    ))}
                </div>

                {!product.inStock && (
                    <div className="out-of-stock-label">Out of Stock</div>
                )}
            </div>
        </div>
    );
}

export default ProductCard;