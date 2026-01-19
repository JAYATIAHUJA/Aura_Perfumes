/**
 * Scroll Story Component
 * Refined z-index and smoother horizontal tracking
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StickyBottle from './StickyBottle';
import StorySection from './StorySection';

gsap.registerPlugin(ScrollTrigger);

function ScrollStory() {
    const wrapperRef = useRef(null);
    const bottleRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(0);

    const totalFrames = 56; // All 56 frames for ultra-smooth rotation

    const sections = [
        {
            id: 'about',
            label: 'Chapter I',
            title: 'Born of Darkness and Desire',
            text: 'In the quiet hours before dawn, when roses bloom in shadow—AURA was born. A fragrance that speaks in whispers.',
            alignment: 'stacked',
        },
        {
            id: 'philosophy',
            label: 'Chapter II',
            title: 'The Art of Being Unforgettable',
            text: 'True luxury lies not in what is seen, but in what lingers. AURA is the invisible signature that speaks volumes.',
            alignment: 'stacked',
        },
        {
            id: 'ingredients',
            label: 'Chapter III',
            title: 'Notes of Enchantment',
            text: 'A symphony of precious essences harmoniously blended from the fields of Grasse to the heart of our atelier.',
            alignment: 'stacked',
            ingredients: [
                { name: 'Rose Damascena', note: 'Top Note', icon: '/ROSE1.png' },
                { name: 'White Lily', note: 'Heart Note', icon: '/LILYPETAL1.png' },
                { name: 'Velvet Amber', note: 'Base Note', icon: '/ROSE4.png' },
            ],
        },
        {
            id: 'tested',
            label: 'Chapter IV',
            title: 'Tested by Life',
            text: 'From sun-drenched fields to moonlit ateliers. Every bottle carries the fingerprints of master perfumers.',
            alignment: 'stacked',
        },
        {
            id: 'collection',
            label: 'Chapter V',
            title: 'Discover Your Aura',
            text: 'Find the fragrance that tells your story. Our signature collection, crafted to linger.',
            alignment: 'stacked',
            showCollection: true,
        },
    ];

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const bottle = bottleRef.current;
        if (!wrapper || !bottle) return;

        // Get all section elements for precise triggering
        const sectionEls = wrapper.querySelectorAll('section');
        const firstSection = sectionEls[0]; // Chapter I
        const lastSection = sectionEls[sectionEls.length - 1]; // Chapter V

        // Bottle visibility: Fade in at Chapter I, fade out after Chapter V
        ScrollTrigger.create({
            trigger: firstSection,
            start: 'top 80%', // Start showing when Chapter I enters viewport
            endTrigger: lastSection,
            end: 'bottom 20%', // End when Chapter V is almost out of view
            onEnter: () => {
                gsap.to(bottle, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            },
            onLeave: () => {
                gsap.to(bottle, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            },
            onEnterBack: () => {
                gsap.to(bottle, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(bottle, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });

        // Bottle rotation: Scrub through frames from Chapter I to Chapter V
        ScrollTrigger.create({
            trigger: firstSection,
            start: 'top 80%',
            endTrigger: lastSection,
            end: 'bottom 30%',
            scrub: 0.5,
            onUpdate: (self) => {
                // Map scroll progress to frame number (0 to 55)
                const frame = Math.min(totalFrames - 1, Math.floor(self.progress * totalFrames));
                setCurrentFrame(frame);
            }
        });

        // Premium section animations with stagger
        sectionEls.forEach((section, i) => {
            gsap.fromTo(section.querySelector('div'),
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'top 25%',
                        toggleActions: 'play none none reverse',
                        scrub: false
                    }
                }
            );
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <>
            {/* FIXED BOTTLE - Left Side Visual Anchor (Hidden initially) */}
            <div ref={bottleRef} className="scroll-story-bottle" style={{
                position: 'fixed',
                top: 0,
                left: '5%',
                width: '40%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                pointerEvents: 'none',
                opacity: 0, // Start hidden until hero is scrolled
            }}>
                <div style={{ willChange: 'transform' }}>
                    <StickyBottle currentFrame={currentFrame} totalFrames={totalFrames} />
                </div>
            </div>

            {/* STORY CONTENT - Right Side Stacked */}
            <div ref={wrapperRef} className="scroll-story-wrapper" style={{
                position: 'relative',
                zIndex: 10,
                marginLeft: '45%', // Make room for bottle
                width: '55%',
                paddingRight: '5%'
            }}>
                {sections.map((section, index) => (
                    <StorySection key={section.id} {...section} />
                ))}
            </div>
        </>
    );
}

export default ScrollStory;
