// ===== EUPHORIA RP WEBSITE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initParticles();
    initSmoothScrolling();
    initScrollAnimations();
    initGlitchEffect();
    initTypingEffect();
    initAmbientEffects();
    
    console.log('🧟 Euphoria RP website loaded successfully');
});

// ===== PARTICLE SYSTEM =====
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration between 15-25 seconds
        const duration = Math.random() * 10 + 15;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle();
            }
        }, (duration + 5) * 1000);
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('lore').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Navigation links smooth scroll (if any are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate feature cards
                if (entry.target.classList.contains('features-grid')) {
                    animateFeatureCards(entry.target);
                }
                
                // Animate gallery items
                if (entry.target.classList.contains('gallery-grid')) {
                    animateGalleryItems(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and elements
    document.querySelectorAll('.section, .features-grid, .gallery-grid').forEach(el => {
        observer.observe(el);
    });
}

function animateFeatureCards(grid) {
    const cards = grid.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateGalleryItems(grid) {
    const items = grid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 150);
    });
}

// ===== GLITCH EFFECT ENHANCEMENT =====
function initGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    if (!glitchElement) return;
    
    let glitchInterval;
    let isGlitching = false;
    
    function triggerRandomGlitch() {
        if (isGlitching) return;
        
        isGlitching = true;
        glitchElement.classList.add('glitch-active');
        
        // Random glitch duration between 200-800ms
        const duration = Math.random() * 600 + 200;
        
        setTimeout(() => {
            glitchElement.classList.remove('glitch-active');
            isGlitching = false;
        }, duration);
    }
    
    // Random glitch every 3-8 seconds
    function scheduleNextGlitch() {
        const delay = Math.random() * 5000 + 3000;
        setTimeout(() => {
            triggerRandomGlitch();
            scheduleNextGlitch();
        }, delay);
    }
    
    scheduleNextGlitch();
}

// ===== TYPING EFFECT FOR LORE =====
function initTypingEffect() {
    const timestamp = document.querySelector('.timestamp');
    if (!timestamp) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typewriterEffect(timestamp);
                observer.unobserve(timestamp);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(timestamp);
}

function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #dc2626';
    element.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typeSpeed = 50;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, typeSpeed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    
    type();
}

// ===== AMBIENT EFFECTS =====
function initAmbientEffects() {
    // Red mist animation
    const redMist = document.querySelector('.red-mist');
    if (redMist) {
        let opacity = 0.05;
        let direction = 1;
        
        setInterval(() => {
            opacity += direction * 0.01;
            if (opacity >= 0.15 || opacity <= 0.02) {
                direction *= -1;
            }
            redMist.style.background = `radial-gradient(ellipse at center, transparent 0%, rgba(220, 38, 38, ${opacity}) 70%, rgba(220, 38, 38, ${opacity * 2}) 100%)`;
        }, 100);
    }
    
    // Subtle screen flicker
    let flickerTimeout;
    function randomFlicker() {
        document.body.style.filter = 'brightness(0.9)';
        setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 50);
        
        // Schedule next flicker randomly between 10-30 seconds
        flickerTimeout = setTimeout(randomFlicker, Math.random() * 20000 + 10000);
    }
    
    // Start flickering after 5 seconds
    setTimeout(randomFlicker, 5000);
}

// ===== UTILITY FUNCTIONS =====

// Copy to clipboard function
window.copyToClipboard = function(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(element);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
};

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(element) {
    const button = element ? element.nextElementSibling : document.querySelector('.copy-btn');
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#22c55e';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#dc2626';
        }, 2000);
    }
}

// ===== PARALLAX SCROLLING =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.red-mist, #particles-container');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== PERFORMANCE OPTIMIZATION =====

// Throttle scroll events
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Parallax and other scroll effects handled here
}, 16)); // ~60fps

// ===== CSS ANIMATIONS VIA JAVASCRIPT =====

// Add CSS keyframes for blinking cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #dc2626; }
        51%, 100% { border-color: transparent; }
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .gallery-item {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.6s ease-out;
    }
    
    .glitch-active {
        animation: glitch 0.3s ease-in-out !important;
    }
    
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    // Create zombie horde effect
    const body = document.body;
    body.style.filter = 'hue-rotate(120deg) saturate(1.5)';
    
    // Add dramatic text
    const easterEggDiv = document.createElement('div');
    easterEggDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #dc2626;
            padding: 2rem;
            border: 2px solid #dc2626;
            border-radius: 8px;
            text-align: center;
            z-index: 9999;
            font-family: 'Orbitron', monospace;
            box-shadow: 0 0 50px rgba(220, 38, 38, 0.5);
        ">
            <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">SYSTEM BREACH DETECTED</h2>
            <p style="margin-bottom: 1rem;">The infected have found a way in...</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">He's still down there, waiting.</p>
        </div>
    `;
    
    body.appendChild(easterEggDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        body.style.filter = 'none';
        easterEggDiv.remove();
    }, 5000);
    
    console.log('🧟 Easter egg activated! The horde approaches...');
}

// ===== MOBILE OPTIMIZATIONS =====
if ('ontouchstart' in window) {
    // Disable hover effects on touch devices
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .feature-card:hover::before {
            display: none;
        }
        
        .touch-device .feature-card:active {
            transform: scale(0.95);
        }
        
        .touch-device .btn:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(touchStyle);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const firstFocusable = document.querySelector('a, button, input, textarea, select');
        if (firstFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// Respect reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Euphoria RP Website Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
