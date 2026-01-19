/**
 * Ultra Premium Sticky Bottle Component
 * Cinematic Luxury Experience with Enhanced Visual Effects
 */

import { useEffect, useState } from 'react';

function StickyBottle({ currentFrame, totalFrames = 56 }) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // All 56 frames are available for smooth rotation
    const availableFrames = Array.from({ length: 56 }, (_, i) => i + 1);

    const getImagePath = (index) => {
        const frameNumber = availableFrames[index] || availableFrames[0];
        return `/rotating_bottle_images/${frameNumber}.png`;
    };

    useEffect(() => {
        let loadedCount = 0;
        for (let i = 0; i < availableFrames.length; i++) {
            const img = new Image();
            img.src = getImagePath(i);
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / availableFrames.length) * 100));
                if (loadedCount === availableFrames.length) setImagesLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === availableFrames.length) setImagesLoaded(true);
            };
        }
    }, []);

    // Ultra Premium Container with Sophisticated Depth
    const containerStyle = {
        position: 'relative',
        width: '550px',
        height: '700px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at center, rgba(232, 199, 122, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: `
            drop-shadow(0 0 80px rgba(232, 199, 122, 0.25))
            drop-shadow(0 30px 120px rgba(0, 0, 0, 0.4))
        `,
    };

    // Sophisticated Multi-Layer Glow System
    const glowBaseStyle = {
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
    };

    // Premium Image Styling with Enhanced Effects
    const imageStyle = (isActive) => ({
        position: 'absolute',
        maxHeight: '620px',
        width: 'auto',
        objectFit: 'contain',
        opacity: isActive ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        filter: `
            drop-shadow(0 40px 100px rgba(0, 0, 0, 0.7)) 
            drop-shadow(0 0 80px rgba(184, 20, 29, 0.4))
            drop-shadow(0 0 150px rgba(232, 199, 122, 0.2))
            drop-shadow(0 10px 40px rgba(232, 199, 122, 0.1))
            brightness(1.15) 
            contrast(1.08)
            saturate(1.1)
        `,
        transform: isActive ? 'scale(1) translateZ(0)' : 'scale(0.96) translateZ(-10px)',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
    });

    return (
        <div style={containerStyle}>
            {/* Premium Ambient Lighting System */}
            <div style={{ 
                ...glowBaseStyle, 
                width: '600px', 
                height: '600px', 
                background: `
                    radial-gradient(ellipse at 30% 20%, rgba(184, 20, 29, 0.15) 0%, transparent 60%),
                    radial-gradient(ellipse at 70% 80%, rgba(232, 199, 122, 0.12) 0%, transparent 50%),
                    radial-gradient(circle at center, rgba(92, 14, 21, 0.08) 0%, transparent 70%)
                `, 
                filter: 'blur(120px)',
                zIndex: 0,
                animation: 'luxuryPulse 10s ease-in-out infinite'
            }} />
            
            {/* Mid-Range Premium Glow */}
            <div style={{ 
                ...glowBaseStyle, 
                width: '400px', 
                height: '400px', 
                background: `
                    radial-gradient(circle at 35% 25%, rgba(232, 199, 122, 0.18) 0%, transparent 65%),
                    radial-gradient(circle at center, rgba(250, 249, 246, 0.08) 0%, transparent 50%)
                `, 
                filter: 'blur(80px)',
                zIndex: 1,
                animation: 'luxuryPulse 7s ease-in-out infinite reverse'
            }} />
            
            {/* Intimate Luxury Accent */}
            <div style={{ 
                ...glowBaseStyle, 
                width: '200px', 
                height: '200px', 
                background: `
                    radial-gradient(circle at center, rgba(250, 249, 246, 0.12) 0%, rgba(232, 199, 122, 0.06) 40%, transparent 70%)
                `, 
                filter: 'blur(40px)',
                zIndex: 1,
                animation: 'luxuryPulse 5s ease-in-out infinite'
            }} />

            {/* Bottle Reflection Plane */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                height: '20px',
                background: 'radial-gradient(ellipse, rgba(232, 199, 122, 0.15) 0%, transparent 70%)',
                filter: 'blur(15px)',
                zIndex: 0,
                opacity: 0.6
            }} />

            {/* 20 Frame Images */}
            {Array.from({ length: totalFrames }).map((_, index) => (
                <img
                    key={index}
                    src={getImagePath(index)}
                    alt=""
                    style={imageStyle(index === currentFrame)}
                />
            ))}

            {!imagesLoaded && (
                <div style={{ position: 'absolute', color: '#D8B46A', fontSize: '0.7rem', letterSpacing: '0.4em' }}>
                    AURA {loadProgress}%
                </div>
            )}
        </div>
    );
}

export default StickyBottle;
