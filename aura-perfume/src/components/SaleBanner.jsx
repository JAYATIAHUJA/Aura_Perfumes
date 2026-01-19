/**
 * Sale Banner Component
 * Premium announcement banner for promotions
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SaleBanner.css';

function SaleBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="sale-banner">
            <div className="sale-banner-content">
                <span className="sale-banner-sparkle">✨</span>
                <span className="sale-banner-text">
                    <strong>LIMITED TIME OFFER</strong> — Get <span className="sale-highlight">30% OFF</span> on all fragrances! Use code: <span className="sale-code">AURA30</span>
                </span>
                <span className="sale-banner-sparkle">✨</span>
                <Link to="/products" className="sale-banner-cta">Shop Now</Link>
            </div>
            <button
                className="sale-banner-close"
                onClick={() => setIsVisible(false)}
                aria-label="Close banner"
            >
                ×
            </button>
        </div>
    );
}

export default SaleBanner;
