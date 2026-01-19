/**
 * Main App Component with Routing
 * Full-stack e-commerce perfume website
 */

import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ScrollStory from './components/ScrollStory';
import ProductsGrid from './components/ProductsGrid';
import ProductDetail from './components/ProductDetail';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import FloatingPetals from './components/FloatingPetals';
import SaleBanner from './components/SaleBanner';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    // Optimized GSAP configuration for premium performance
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
      force3D: true
    });
    gsap.defaults({ ease: 'power2.out', duration: 0.8 });

    // Smooth scroll configuration
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150
    });

    // Delayed refresh for better initialization
    gsap.delayedCall(0.1, () => {
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf('*');
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      {/* Global Effects */}
      <div className="grain-overlay" />
      <div className="vignette" />
      <FloatingPetals />

      <Navigation />
      <SaleBanner />

      <Routes>
        {/* Homepage */}
        <Route path="/" element={
          <>
            <HeroSection />

            {/* Call to Action Banner */}
            <section className="cta-banner">
              <div className="cta-content">
                <h2>Discover Our Latest Collection</h2>
                <p>Experience the art of luxury perfumery with our carefully curated selection of premium fragrances</p>
                <Link to="/products" className="cta-button">Explore Now</Link>
              </div>
            </section>

            {/* Featured Products */}
            <section className="featured-products" id="collection">
              <div className="section-header">
                <h2>Featured Fragrances</h2>
                <p>Handpicked premium perfumes for the discerning connoisseur</p>
              </div>
              <ProductsGrid featured={true} limit={4} />
            </section>

            {/* Story Section with Bottle Animation */}
            <section id="story">
              <ScrollStory />
            </section>

            {/* Customer Reviews */}
            <section id="reviews">
              <ReviewsSection />
            </section>
          </>
        } />

        {/* Product Detail Page */}
        <Route path="/product/:slug" element={<ProductDetail />} />

        {/* All Products Page */}
        <Route path="/products" element={
          <>
            <section className="products-page">
              <div className="page-header">
                <h1>All Products</h1>
                <p>Explore our complete collection of luxury fragrances</p>
              </div>
              <ProductsGrid />
            </section>
          </>
        } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
