/**
 * Ultra Premium Hero Section Component
 * Sophisticated Luxury Experience with Enhanced Visual Effects
 */

import StarButton from './StarButton';

function HeroSection() {
    const sideBottles = [
        { id: 1, src: '/PERFUME2.png', alt: 'AURA Mystic Rose', name: 'Mystic Rose', slug: 'aura-mystic-rose', position: 'top' },
        { id: 2, src: '/PERFUME3.png', alt: 'AURA Citrus Burst', name: 'Citrus Burst', slug: 'aura-citrus-burst', position: 'bottom' },
        { id: 4, src: '/PERFUME6.png', alt: 'AURA Ocean Breeze', name: 'Ocean Breeze', slug: 'aura-ocean-breeze', position: 'top' },
        { id: 5, src: '/PERFUMEBOTTLE1.png', alt: 'AURA Golden Amber', name: 'Golden Amber', slug: 'aura-golden-amber', position: 'bottom' },
    ];

    return (
        <section className="hero-section" style={{
            paddingTop: '140px',
            background: `
                radial-gradient(ellipse at 15% 25%, rgba(45, 5, 8, 0.6) 0%, transparent 60%),
                radial-gradient(ellipse at 85% 75%, rgba(92, 14, 21, 0.5) 0%, transparent 55%),
                radial-gradient(ellipse at center, rgba(139, 16, 24, 0.3) 0%, transparent 40%),
                linear-gradient(135deg, #0a0203 0%, #2d0508 50%, #5c0e15 100%)
            `,
        }}>
            {/* Premium Texture Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        rgba(232, 199, 122, 0.015) 2px,
                        rgba(232, 199, 122, 0.015) 4px
                    ),
                    radial-gradient(circle at 25% 35%, rgba(250, 249, 246, 0.03) 0%, transparent 50%)
                `,
                pointerEvents: 'none',
                zIndex: 1,
            }} />

            {/* Luxury Ambient Glow */}
            <div style={{
                position: 'absolute',
                top: '15%',
                right: '12%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(232, 199, 122, 0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'luxuryFloat 12s ease-in-out infinite',
                zIndex: 2,
            }} />

            {/* Left Rose Petals Decoration */}
            <div className="hero-petal-decoration petal-left" style={{
                position: 'absolute',
                left: '-5%',
                top: '50%',
                transform: 'translateY(-50%) rotate(-15deg)',
                zIndex: 3,
                pointerEvents: 'none',
            }}>
                <img
                    src="/TOOMANYROSEPETALS.png"
                    alt=""
                    style={{
                        width: '450px',
                        height: 'auto',
                        opacity: 0.25,
                        filter: 'blur(2px) brightness(0.8)',
                    }}
                />
            </div>

            {/* Right Rose Petals Decoration */}
            <div className="hero-petal-decoration petal-right" style={{
                position: 'absolute',
                right: '-5%',
                top: '50%',
                transform: 'translateY(-50%) rotate(15deg) scaleX(-1)',
                zIndex: 3,
                pointerEvents: 'none',
            }}>
                <img
                    src="/TOOMANYROSEPETALS.png"
                    alt=""
                    style={{
                        width: '450px',
                        height: 'auto',
                        opacity: 0.25,
                        filter: 'blur(2px) brightness(0.8)',
                    }}
                />
            </div>

            {/* Side Bottles - Premium Left Collection - CLICKABLE */}
            <div className="side-bottles-left">
                {sideBottles.slice(0, 2).map((bottle) => (
                    <a
                        key={bottle.id}
                        href={`/product/${bottle.slug}`}
                        className="hero-bottle-link"
                    >
                        <img
                            src={bottle.src}
                            alt={bottle.alt}
                            className="hero-bottle-img"
                        />
                        <div className="hero-bottle-name">
                            {bottle.name}
                        </div>
                        {/* Subtle glow ring */}
                        <div className="hero-bottle-glow" />
                    </a>
                ))}
            </div>

            {/* Side Bottles - Premium Right Collection - CLICKABLE */}
            <div className="side-bottles-right">
                {sideBottles.slice(2).map((bottle) => (
                    <a
                        key={bottle.id}
                        href={`/product/${bottle.slug}`}
                        className="hero-bottle-link"
                    >
                        <img
                            src={bottle.src}
                            alt={bottle.alt}
                            className="hero-bottle-img"
                        />
                        <div className="hero-bottle-name">
                            {bottle.name}
                        </div>
                        {/* Subtle glow ring */}
                        <div className="hero-bottle-glow" />
                    </a>
                ))}
            </div>

            {/* Premium Hero Content */}
            <div className="hero-content">
                <h1 className="hero-title text-shimmer" style={{
                    fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                    fontWeight: 800,
                    fontStyle: 'italic',
                    marginBottom: '24px',
                    fontFamily: 'var(--font-display)',
                    lineHeight: 1.1,
                }}>
                    More than a fragrance. It's an <em style={{ color: 'var(--color-champagne)' }}>aura</em>.
                </h1>
                <p className="hero-subtitle" style={{
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-smoke)',
                    marginBottom: '48px',
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'italic',
                    opacity: 0.9,
                }}>
                    Crafted to Linger. Destined to Enchant.
                </p>
                <div className="hero-cta-wrapper">
                    <StarButton href="#story">
                        Discover Your Aura
                    </StarButton>
                </div>
            </div>

            {/* Elegant Scroll Indicator */}
            <div className="scroll-indicator">
                <p style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--color-smoke)',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-body)',
                }}>
                    Scroll to Explore
                </p>
                <div style={{
                    width: '2px',
                    height: '30px',
                    background: 'linear-gradient(to bottom, var(--color-champagne), transparent)',
                    margin: '0 auto',
                    animation: 'luxuryFloat 3s ease-in-out infinite',
                }} />
            </div>
        </section>
    );
}

export default HeroSection;
