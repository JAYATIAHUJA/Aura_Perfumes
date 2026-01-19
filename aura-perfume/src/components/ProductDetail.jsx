/**
 * Product Detail Page Component
 * Complete product view with gallery, reviews, and purchase options
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import './ProductDetail.css';

function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        customerName: '',
        email: '',
        rating: 5,
        title: '',
        comment: ''
    });

    useEffect(() => {
        if (slug) {
            fetchProduct();
            fetchReviews();
        }
    }, [slug]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${slug}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            const data = await response.json();
            setProduct(data);
            setSelectedSize(data.sizes?.[0]);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            if (!product?._id) return;
            const response = await fetch(`http://localhost:5000/api/products/${product._id}/reviews`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!product?._id) return;

        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newReview,
                    product: product._id
                })
            });

            if (response.ok) {
                setNewReview({
                    customerName: '',
                    email: '',
                    rating: 5,
                    title: '',
                    comment: ''
                });
                setShowReviewForm(false);
                fetchReviews();
                fetchProduct(); // Refresh to get updated rating
            }
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

    const renderStars = (rating, interactive = false, onRate = null) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
                    onClick={() => interactive && onRate && onRate(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="loading-spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail-error">
                <h2>Product Not Found</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/')} className="back-button">
                    Back to Home
                </button>
            </div>
        );
    }

    if (!product) return null;

    const shareUrl = window.location.href;
    const shareTitle = `Check out ${product.name} - Premium Perfume`;

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                
                {/* Product Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img
                            src={product.images?.[selectedImage]?.url || '/PERFUME2.png'}
                            alt={product.images?.[selectedImage]?.alt || product.name}
                        />
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="image-thumbnails">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.alt}
                                    className={index === selectedImage ? 'active' : ''}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <div className="product-header">
                        <div className="product-category">{product.category}</div>
                        <h1 className="product-title">{product.name}</h1>
                        
                        <div className="product-rating">
                            <div className="stars">
                                {renderStars(product.rating?.average || 0)}
                            </div>
                            <span className="rating-text">
                                ({product.rating?.average || 0}) • {product.rating?.count || 0} reviews
                            </span>
                        </div>
                    </div>

                    <div className="product-pricing">
                        <span className="current-price">${selectedSize?.price || product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="original-price">${product.originalPrice}</span>
                        )}
                    </div>

                    <p className="product-description">{product.description}</p>

                    {/* Fragrance Notes */}
                    {product.notes && (
                        <div className="fragrance-notes">
                            <h3>Fragrance Notes</h3>
                            <div className="notes-grid">
                                {product.notes.top && (
                                    <div className="note-category">
                                        <h4>Top Notes</h4>
                                        <p>{product.notes.top.join(', ')}</p>
                                    </div>
                                )}
                                {product.notes.middle && (
                                    <div className="note-category">
                                        <h4>Heart Notes</h4>
                                        <p>{product.notes.middle.join(', ')}</p>
                                    </div>
                                )}
                                {product.notes.base && (
                                    <div className="note-category">
                                        <h4>Base Notes</h4>
                                        <p>{product.notes.base.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="size-selection">
                            <h3>Select Size</h3>
                            <div className="size-options">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        className={`size-option ${selectedSize === size ? 'selected' : ''} ${!size.inStock ? 'out-of-stock' : ''}`}
                                        onClick={() => size.inStock && setSelectedSize(size)}
                                        disabled={!size.inStock}
                                    >
                                        <span className="size-volume">{size.volume}</span>
                                        <span className="size-price">${size.price}</span>
                                        {!size.inStock && <span className="size-stock">Out of Stock</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity and Add to Cart */}
                    <div className="purchase-section">
                        <div className="quantity-selector">
                            <label>Quantity</label>
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>
                        
                        <button 
                            className="add-to-cart-btn"
                            disabled={!product.inStock || (selectedSize && !selectedSize.inStock)}
                        >
                            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>

                    {/* Share Buttons */}
                    <div className="share-section">
                        <h3>Share this Product</h3>
                        <div className="share-buttons">
                            <FacebookShareButton url={shareUrl} quote={shareTitle}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl} title={shareTitle}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <WhatsappShareButton url={shareUrl} title={shareTitle}>
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <div className="reviews-header">
                    <h2>Customer Reviews ({reviews.length})</h2>
                    <button 
                        className="write-review-btn"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                    >
                        Write a Review
                    </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                    <form className="review-form" onSubmit={handleReviewSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={newReview.customerName}
                                onChange={(e) => setNewReview({...newReview, customerName: e.target.value})}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={newReview.email}
                                onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                                required
                            />
                        </div>
                        
                        <div className="rating-input">
                            <label>Rating:</label>
                            <div className="stars">
                                {renderStars(newReview.rating, true, (rating) => 
                                    setNewReview({...newReview, rating})
                                )}
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Review Title"
                            value={newReview.title}
                            onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                            required
                        />
                        
                        <textarea
                            placeholder="Write your review..."
                            value={newReview.comment}
                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                            rows="4"
                            required
                        ></textarea>
                        
                        <div className="form-actions">
                            <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
                            <button type="submit">Submit Review</button>
                        </div>
                    </form>
                )}

                {/* Reviews List */}
                <div className="reviews-list">
                    {reviews.map((review) => (
                        <div key={review._id} className="review-item">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <h4>{review.customerName}</h4>
                                    <div className="stars">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <div className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <h5 className="review-title">{review.title}</h5>
                            <p className="review-comment">{review.comment}</p>
                            {review.verified && (
                                <div className="verified-badge">✓ Verified Purchase</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;