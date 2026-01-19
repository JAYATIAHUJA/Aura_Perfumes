/**
 * Enhanced Professional Navigation
 * Complete e-commerce navigation with search, cart, and user features
 */

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to products page with search
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const scrollToSection = (sectionId) => {
        // If not on homepage, navigate there first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileOpen(false);
    };

    return (
        <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
            <div className="nav-container">
                {/* Brand */}
                <Link to="/" className="nav-brand">
                    AURA
                </Link>

                {/* Desktop Menu */}
                <div className="nav-menu">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                    >
                        Collection
                    </Link>
                    <button
                        className="nav-link nav-link--btn"
                        onClick={() => scrollToSection('story')}
                    >
                        Story
                    </button>
                    <button
                        className="nav-link nav-link--btn"
                        onClick={() => scrollToSection('reviews')}
                    >
                        Reviews
                    </button>
                    <button
                        className="nav-link nav-link--btn"
                        onClick={() => scrollToSection('footer')}
                    >
                        Contact
                    </button>
                </div>

                {/* Navigation Actions */}
                <div className="nav-actions">
                    {/* Search Toggle */}
                    <button
                        className="nav-action-btn"
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Search"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>

                    {/* Wishlist */}
                    <Link to="/products" className="nav-action-btn" aria-label="Wishlist">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </Link>

                    {/* Shopping Cart */}
                    <Link to="/products" className="nav-action-btn nav-cart" aria-label="Shopping Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
                    </Link>

                    {/* User Account */}
                    <Link to="/products" className="nav-action-btn" aria-label="Account">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </Link>
                </div>

                {/* Search Overlay */}
                {searchOpen && (
                    <div className="nav-search-overlay">
                        <form onSubmit={handleSearch} className="nav-search-form">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for fragrances..."
                                className="nav-search-input"
                                autoFocus
                            />
                            <button type="submit" className="nav-search-submit">
                                Search
                            </button>
                            <button
                                type="button"
                                className="nav-search-close"
                                onClick={() => setSearchOpen(false)}
                            >
                                ×
                            </button>
                        </form>
                    </div>
                )}

                {/* Mobile Toggle */}
                <button
                    className="nav-toggle"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`nav-mobile ${isMobileOpen ? 'nav-mobile--open' : ''}`}>
                <Link to="/" onClick={() => setIsMobileOpen(false)}>Home</Link>
                <Link to="/products" onClick={() => setIsMobileOpen(false)}>Collection</Link>
                <button onClick={() => scrollToSection('story')}>Story</button>
                <button onClick={() => scrollToSection('reviews')}>Reviews</button>
                <button onClick={() => scrollToSection('footer')}>Contact</button>
                <Link to="/products" className="nav-mobile-cta" onClick={() => setIsMobileOpen(false)}>
                    Shop Now
                </Link>
            </div>
        </nav>
    );
}

export default Navigation;
