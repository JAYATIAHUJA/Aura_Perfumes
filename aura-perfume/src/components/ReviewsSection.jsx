/**
 * Customer Reviews Section
 * Showcases customer testimonials and ratings
 */

import { useState, useEffect } from 'react';

function ReviewsSection() {
    const [reviews, setReviews] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const featuredReviews = [
        {
            id: 1,
            customerName: "Sarah Williams",
            rating: 5,
            title: "Absolutely Divine",
            comment: "AURA Mystic Rose is the most beautiful fragrance I've ever owned. It's sophisticated, long-lasting, and gets compliments wherever I go. The packaging is also incredibly luxurious.",
            product: "AURA Mystic Rose",
            verified: true,
            location: "New York, NY"
        },
        {
            id: 2,
            customerName: "Michael Chen",
            rating: 5,
            title: "Perfect for Every Occasion",
            comment: "Ocean Breeze has become my signature scent. It's fresh yet sophisticated, perfect for both day and evening wear. The quality is exceptional and the bottle is a work of art.",
            product: "AURA Ocean Breeze",
            verified: true,
            location: "Los Angeles, CA"
        },
        {
            id: 3,
            customerName: "Isabella Rodriguez",
            rating: 5,
            title: "Luxury Redefined",
            comment: "Golden Amber is pure luxury in a bottle. The rich, warm notes are perfect for special occasions. I feel confident and elegant every time I wear it.",
            product: "AURA Golden Amber",
            verified: true,
            location: "Miami, FL"
        },
        {
            id: 4,
            customerName: "David Thompson",
            rating: 5,
            title: "Exceptional Quality",
            comment: "I bought the Wild Lavender for my wife and she absolutely loves it. The scent is calming yet sophisticated. AURA has exceeded all our expectations.",
            product: "AURA Wild Lavender",
            verified: true,
            location: "Chicago, IL"
        },
        {
            id: 5,
            customerName: "Emma Johnson",
            rating: 5,
            title: "My New Favorite",
            comment: "Citrus Burst is energizing and uplifting. Perfect for morning wear and gives me confidence throughout the day. The longevity is impressive for a citrus fragrance.",
            product: "AURA Citrus Burst",
            verified: true,
            location: "Seattle, WA"
        }
    ];

    useEffect(() => {
        setReviews(featuredReviews);
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredReviews.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
                viewBox="0 0 24 24"
                fill={index < rating ? 'currentColor' : 'none'}
                stroke="currentColor"
            >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
        ));
    };

    if (reviews.length === 0) {
        return null;
    }

    return (
        <section id="reviews" className="reviews-section">
            <div className="reviews-container">
                <div className="reviews-header">
                    <h2 className="reviews-title">What Our Customers Say</h2>
                    <p className="reviews-subtitle">
                        Discover why AURA has become the choice of discerning fragrance enthusiasts worldwide
                    </p>
                    <div className="reviews-stats">
                        <div className="stat-item">
                            <div className="stat-number">10,000+</div>
                            <div className="stat-label">Happy Customers</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-rating">
                                {renderStars(5)}
                                <span className="rating-text">4.9/5</span>
                            </div>
                            <div className="stat-label">Average Rating</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">Would Recommend</div>
                        </div>
                    </div>
                </div>

                <div className="reviews-carousel">
                    <div className="carousel-container">
                        <button className="carousel-btn prev" onClick={prevSlide}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="15,18 9,12 15,6"/>
                            </svg>
                        </button>

                        <div className="reviews-slider">
                            {reviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className={`review-card ${index === currentSlide ? 'active' : ''}`}
                                    style={{
                                        transform: `translateX(${(index - currentSlide) * 100}%)`,
                                        opacity: index === currentSlide ? 1 : 0.7
                                    }}
                                >
                                    <div className="review-content">
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                        <h3 className="review-title">{review.title}</h3>
                                        <p className="review-comment">"{review.comment}"</p>
                                        <div className="review-product">
                                            <span className="product-name">{review.product}</span>
                                        </div>
                                        <div className="review-author">
                                            <div className="author-info">
                                                <div className="author-name">
                                                    {review.customerName}
                                                    {review.verified && (
                                                        <svg className="verified-badge" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="author-location">{review.location}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}\n                        </div>

                        <button className="carousel-btn next" onClick={nextSlide}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="9,18 15,12 9,6"/>
                            </svg>
                        </button>
                    </div>

                    <div className="carousel-indicators">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="reviews-cta">
                    <p>Experience AURA for yourself</p>
                    <button className="reviews-cta-btn">Explore Collection</button>
                </div>
            </div>
        </section>
    );
}

export default ReviewsSection;