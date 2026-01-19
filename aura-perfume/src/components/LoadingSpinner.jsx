/**
 * Loading Spinner Component
 * Elegant loading animation for the luxury experience
 */

import './LoadingSpinner.css';

function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
    return (
        <div className={`loading-spinner-container ${size}`}>
            <div className="loading-spinner">
                <div className="spinner-ring">
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                    <div className="ring-segment"></div>
                </div>
                <div className="spinner-logo">
                    AURA
                </div>
            </div>
            {message && (
                <p className="loading-message">{message}</p>
            )}
        </div>
    );
}

export default LoadingSpinner;