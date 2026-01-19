/**
 * Enhanced Footer Component
 * Complete footer with newsletter, social links, and company info
 */

import { useState } from 'react';

function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const footerLinks = {
        shop: [
            { name: 'All Fragrances', href: '/products' },
            { name: 'Best Sellers', href: '/products?featured=true' },
            { name: 'New Arrivals', href: '/products?sort=newest' },
            { name: 'Gift Sets', href: '/gifts' },
            { name: 'Travel Size', href: '/products?size=30ml' }
        ],
        about: [
            { name: 'Our Story', href: '#story' },
            { name: 'Ingredients', href: '/ingredients' },
            { name: 'Sustainability', href: '/sustainability' },
            { name: 'Press', href: '/press' },
            { name: 'Careers', href: '/careers' }
        ],
        support: [
            { name: 'Contact Us', href: '/contact' },
            { name: 'Size Guide', href: '/size-guide' },
            { name: 'Shipping Info', href: '/shipping' },
            { name: 'Returns', href: '/returns' },
            { name: 'FAQ', href: '/faq' }
        ]
    };

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/aura.perfume',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: 'Facebook',
            href: 'https://facebook.com/aura.perfume',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/aura_perfume',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            )
        },
        {
            name: 'Pinterest',
            href: 'https://pinterest.com/aura_perfume',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001.017.001z" />
                </svg>
            )
        }
    ];

    return (
        <footer id="footer" className="footer">
            {/* Newsletter Section */}
            <div className="footer-newsletter">
                <div className="footer-newsletter-content">
                    <div className="newsletter-info">
                        <h3>Stay in the Scent</h3>
                        <p>Be the first to discover new fragrances, exclusive offers, and luxury experiences from AURA.</p>
                    </div>
                    <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                        <div className="newsletter-input-container">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="newsletter-input"
                                required
                            />
                            <button
                                type="submit"
                                className="newsletter-submit"
                                disabled={subscribed}
                            >
                                {subscribed ? 'Subscribed!' : 'Subscribe'}
                            </button>
                        </div>
                        {subscribed && (
                            <p className="newsletter-success">
                                ✨ Thank you! You'll receive exclusive updates soon.
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <h2 className="footer-logo">AURA</h2>
                        <p className="footer-tagline">
                            Crafting luxury fragrances that capture the essence of elegance and sophistication.
                            Each bottle tells a story of passion, artistry, and timeless beauty.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="footer-social-link"
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="footer-links">
                        <div className="footer-links-section">
                            <h4>Shop</h4>
                            <ul>
                                {footerLinks.shop.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>About</h4>
                            <ul>
                                {footerLinks.about.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-section">
                            <h4>Support</h4>
                            <ul>
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>Get in Touch</h4>
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>hello@auraperfume.com</span>
                        </div>
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                            </svg>
                            <span>+91 1234567890</span>
                        </div>
                        <div className="contact-item">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>New Delhi, India  </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="footer-copyright-wrapper">
                            <p className="footer-copyright">
                                ©  2026 AURA Perfume
                            </p>
                            <span className="make-in-india-badge" style={{
                                fontSize: '0.7rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--color-champagne)',
                                opacity: 0.7,
                                marginLeft: '20px',
                                borderLeft: '1px solid rgba(232, 199, 122, 0.3)',
                                paddingLeft: '20px'
                            }}>
                                Make in India
                            </span>
                        </div>
                        <div className="footer-legal">
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
