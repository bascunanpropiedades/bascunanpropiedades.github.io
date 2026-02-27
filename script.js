// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with reveal or fade-in-up classes
document.querySelectorAll('.reveal, .fade-in-up').forEach((el) => observer.observe(el));

// Property filtering
function filterProperties(type) {
    const cards = document.querySelectorAll('.property-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
buttons.forEach(btn => {

    btn.classList.remove(
        'active',
        'bg-black',
        'text-white'
    );

    btn.classList.add(
        'bg-white',
        'text-slate-600'
    );

    if (btn.dataset.filter === type) {
        btn.classList.add(
            'active',
            'bg-black',
            'text-white'
        );
        btn.classList.remove(
            'bg-white',
            'text-slate-600'
        );
    }
});
    
    // Filter cards with animation
    cards.forEach((card, index) => {
        const cardType = card.dataset.type;
        
        if (type === 'all' || cardType === type) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add loading state to WhatsApp buttons
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add a subtle pulse effect when clicked
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Form validation if any forms are added later (placeholder)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Lazy loading for images (if native lazy loading isn't sufficient)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Track WhatsApp clicks (analytics placeholder)
function trackWhatsAppClick(location) {
    console.log(`WhatsApp clicked from: ${location}`);
    // Here you could add Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'WhatsApp',
            'event_label': location
        });
    }
}

// Add click tracking to all WhatsApp links
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const location = link.closest('section')?.id || 'header';
        trackWhatsAppClick(location);
    });
});

// Initialize tooltips or other interactive elements if needed
function initTooltips() {
    // Placeholder for future tooltip functionality
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate layouts if needed
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
        }
    }, 250);
});

// Console greeting
console.log('%c🏠 Bascuñan Propiedades', 'font-size: 20px; font-weight: bold; color: #0f172a;');

console.log('%c¿Buscas vender o arrendar en Chillán? ¡Contáctanos!', 'font-size: 14px; color: #64748b;');
// ==========================
// CARRUSEL DE PROPIEDADES
// ==========================

const imageCollections = {
    prop1: ["assets/img/propiedades/casa1/1.jpg", "assets/img/propiedades/casa1/2.jpg", "assets/img/propiedades/casa1/3.jpg"],
    prop2: ["assets/img/propiedades/casa2/1.jpg", "assets/img/propiedades/casa2/2.jpg", "assets/img/propiedades/casa2/3.jpg"],
    prop3: ["assets/img/propiedades/casa3/1.jpg", "assets/img/propiedades/casa3/2.jpg", "assets/img/propiedades/casa3/3.jpg"],
    prop4: ["assets/img/propiedades/casa4/1.jpg", "assets/img/propiedades/casa4/2.jpg", "assets/img/propiedades/casa4/3.jpg"],
    prop5: ["assets/img/propiedades/casa5/1.jpg", "assets/img/propiedades/casa5/2.jpg", "assets/img/propiedades/casa5/3.jpg"],
    prop6: ["assets/img/propiedades/casa6/1.jpg", "assets/img/propiedades/casa6/2.jpg", "assets/img/propiedades/casa6/3.jpg"],
};

const imageIndexes = {
    prop1: 0,
    prop2: 0,
    prop3: 0,
    prop4: 0,
    prop5: 0,
    prop6: 0,
};

function showImage(id) {
    const img = document.getElementById(id);
    img.src = imageCollections[id][imageIndexes[id]];
}

function nextImage(id) {
    imageIndexes[id]++;
    if (imageIndexes[id] >= imageCollections[id].length) {
        imageIndexes[id] = 0;
    }
    showImage(id);
}

function prevImage(id) {
    imageIndexes[id]--;
    if (imageIndexes[id] < 0) {
        imageIndexes[id] = imageCollections[id].length - 1;
    }
    showImage(id);
}

