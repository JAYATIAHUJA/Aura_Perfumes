/**
 * Ultra Premium Story Section Component
 * Sophisticated Editorial Layout with Enhanced Visual Effects
 */

function StorySection({
    id,
    label,
    title,
    text,
    alignment,
    ingredients,
    showCollection,
}) {
    const collectionItems = [
        { name: 'AURA Signature', size: '100ml EDP', image: '/PERFUMEBOTTLE1.png' },
        { name: 'AURA Noir', size: '75ml EDP', image: '/PERFUME8.png' },
        { name: 'AURA Bloom', size: '50ml EDP', image: '/PERFUME2.png' },
        { name: 'AURA Velvet', size: '100ml EDP', image: '/PERFUME6.png' },
    ];

    return (
        <section className="scroll-story-section" id={id}>
            <div className="scroll-story-content">
                <span className="story-label">{label}</span>
                <h2 className="story-title">{title}</h2>
                <p className="story-text">{text}</p>

                {ingredients && (
                    <div className="story-ingredients">
                        {ingredients.map((ing, i) => (
                            <div key={i} className="ingredient-item">
                                <div className="ingredient-icon-wrapper">
                                    <img src={ing.icon} alt="" className="ingredient-icon" />
                                </div>
                                <div className="ingredient-name">{ing.name}</div>
                                <div className="ingredient-note">{ing.note}</div>
                            </div>
                        ))}
                    </div>
                )}

                {showCollection && (
                    <div className="story-collection">
                        {collectionItems.map((item, i) => (
                            <div key={i} className="collection-preview-item">
                                <img src={item.image} alt={item.name} className="collection-preview-img" />
                                <div className="collection-preview-name">{item.name}</div>
                                <div className="collection-preview-size">{item.size}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default StorySection;
