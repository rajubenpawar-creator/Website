// AI Free Tools - Main JavaScript

/**
 * Open tool function - currently shows alert
 * @param {string} toolId - The ID of the tool to open
 */
function openTool(toolId) {
    // Get tool name based on ID
    const toolNames = {
        'image-compressor': 'Image Compressor Online',
        'pdf-converter': 'PDF to Word Converter',
        'meme-maker': 'Meme Maker Online',
        'video-converter': 'Video to MP3 Converter'
    };
    
    const toolName = toolNames[toolId] || 'Unknown Tool';
    
    // Show alert message (to be replaced with actual tool functionality)
    alert(`${toolName} is coming soon!\n\nThis tool is currently under development. Check back soon for the launch.`);
    
    // For future implementation: 
    // This function can be easily modified to redirect to actual tool pages
    // or show modal with tool functionality
}

/**
 * Initialize tool cards with hover effects
 */
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Add data attribute for tracking
        card.dataset.viewed = 'false';
        
        // Add click tracking for analytics (future implementation)
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('use-tool-btn')) {
                const toolName = this.querySelector('.tool-name').textContent;
                console.log(`Card clicked: ${toolName}`);
                // Future: Add analytics tracking here
            }
        });
    });
}

/**
 * Add smooth scrolling to page
 */
function initSmoothScrolling() {
    // Smooth scroll for anchor links (if added in future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize animations on scroll
 */
function initScrollAnimations() {
    // Simple fade-in animation for elements
    const fadeElements = document.querySelectorAll('.tool-card, .feature');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(el);
    });
}

/**
 * Initialize tool button event listeners
 */
function initToolButtons() {
    const toolButtons = document.querySelectorAll('.use-tool-btn');
    
    toolButtons.forEach(button => {
        // Remove any existing click handlers to avoid duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Get tool ID from parent card or button text
        const toolCard = newButton.closest('.tool-card');
        let toolId = '';
        
        if (toolCard.querySelector('.card-icon').textContent.includes('🖼️')) {
            toolId = 'image-compressor';
        } else if (toolCard.querySelector('.card-icon').textContent.includes('📄')) {
            toolId = 'pdf-converter';
        } else if (toolCard.querySelector('.card-icon').textContent.includes('😂')) {
            toolId = 'meme-maker';
        } else if (toolCard.querySelector('.card-icon').textContent.includes('🎵')) {
            toolId = 'video-converter';
        }
        
        // Add click event
        newButton.addEventListener('click', () => openTool(toolId));
        
        // Add keyboard accessibility
        newButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openTool(toolId);
            }
        });
    });
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitor() {
    // Log page load performance
    window.addEventListener('load', () => {
        // Check if the page is loaded and interactive
        if (document.readyState === 'complete') {
            const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
            console.log(`AI Free Tools loaded in ${loadTime}ms`);
            
            // Future: Send to analytics
        }
    });
}

/**
 * Initialize the entire application
 */
function initApp() {
    console.log('AI Free Tools initialized');
    
    // Initialize all components
    initToolCards();
    initSmoothScrolling();
    initScrollAnimations();
    initToolButtons();
    initPerformanceMonitor();
    
    // Add a small visual effect to the header
    const header = document.querySelector('.header');
    if (header) {
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Make functions available globally (for future ad integration)
window.AIFreeTools = {
    openTool,
    initApp
};
