/**
 * Floating Petals Background Component
 * Premium decorative petals with subtle animations
 */

import './FloatingPetals.css';

function FloatingPetals() {
    const petals = [
        // Left side petals
        { id: 1, src: '/ROSE1.png', className: 'petal petal-1' },
        { id: 2, src: '/ROSE2.png', className: 'petal petal-2' },
        { id: 3, src: '/LILYPETAL1.png', className: 'petal petal-3' },
        { id: 4, src: '/ROSE4.png', className: 'petal petal-4' },

        // Right side petals
        { id: 5, src: '/ROSE3.png', className: 'petal petal-5' },
        { id: 6, src: '/LILIPETAL2.png', className: 'petal petal-6' },
        { id: 7, src: '/LILIPET.png', className: 'petal petal-7' },
        { id: 8, src: '/ROSE1.png', className: 'petal petal-8' },

        // Additional scattered petals
        { id: 9, src: '/ROSE2.png', className: 'petal petal-9' },
        { id: 10, src: '/LILYPETAL1.png', className: 'petal petal-10' },
        { id: 11, src: '/ROSE4.png', className: 'petal petal-11' },
        { id: 12, src: '/ROSE3.png', className: 'petal petal-12' },
    ];

    return (
        <div className="floating-petals">
            {petals.map(petal => (
                <img
                    key={petal.id}
                    src={petal.src}
                    alt=""
                    className={petal.className}
                    loading="lazy"
                />
            ))}
        </div>
    );
}

export default FloatingPetals;
