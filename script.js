// ============================================
// INTRO SCREEN
// ============================================
window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    
    // Check if user has seen intro before
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro) {
        introScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            introScreen.style.animation = 'fadeOut 0.8s ease forwards';
            setTimeout(() => {
                introScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('hasSeenIntro', 'true');
            }, 800);
        }, 3000);
    }
});

// ============================================
// MODAL SYSTEM
// ============================================
const loginModal = document.getElementById('login-modal');
const productModal = document.getElementById('product-modal');
const closeBtns = document.querySelectorAll('.modal-close');

// Open Login Modal
document.querySelectorAll('.btn-login').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
});

// Product buttons configuration
const productButtons = {
    'Solicitar ahora': {
        title: 'Tarjeta de Crédito Express',
        description: 'Completa el formulario para solicitar tu tarjeta',
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
            <rect x="4" y="12" width="40" height="24" rx="3" fill="currentColor"/>
        </svg>`
    },
    'Abrir cuenta gratis': {
        title: 'Cuenta Express Plus',
        description: 'Abre tu cuenta 100% digital en minutos',
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
            <circle cx="24" cy="24" r="20" fill="currentColor"/>
        </svg>`
    },
    'Invertir ahora': {
        title: 'CDT Express',
        description: 'Comienza a invertir con nosotros',
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 4L4 14v10c0 12.5 8.33 24.17 20 27.5 11.67-3.33 20-15 20-27.5V14L24 4z" fill="currentColor"/>
        </svg>`
    }
};

// Open Product Modal
document.querySelectorAll('.btn-product, .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonText = btn.textContent.trim();
        
        // Find matching product
        let productConfig = null;
        for (const [key, value] of Object.entries(productButtons)) {
            if (buttonText.includes(key) || key.includes(buttonText.split('\n')[0].trim())) {
                productConfig = value;
                break;
            }
        }
        
        if (productConfig) {
            document.getElementById('modal-title').textContent = productConfig.title;
            document.getElementById('modal-description').textContent = productConfig.description;
            document.getElementById('modal-icon').innerHTML = productConfig.icon;
            openModal(productModal);
        }
    });
});

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(productModal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
    if (e.target === productModal) {
        closeModal(productModal);
    }
});

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// FORM SUBMISSIONS
// ============================================

// Login Form
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const docType = loginForm.querySelector('select').value;
        const docNumber = loginForm.querySelectorAll('input')[0].value;
        const password = loginForm.querySelectorAll('input')[1].value;
        
        if (!docType || !docNumber || !password) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Simulate login
        showNotification('Iniciando sesión...', 'success');
        
        setTimeout(() => {
            showNotification('¡Bienvenido! Redirigiendo a tu cuenta...', 'success');
            closeModal(loginModal);
            loginForm.reset();
        }, 1500);
    });
}

// Product Form
const productForm = document.querySelector('.product-form');
if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(productForm);
        const name = productForm.querySelectorAll('input')[0].value;
        const email = productForm.querySelectorAll('input')[1].value;
        const phone = productForm.querySelectorAll('input')[2].value;
        const docType = productForm.querySelector('select').value;
        const docNumber = productForm.querySelectorAll('input')[3].value;
        
        // Validation
        if (!name || !email || !phone || !docType || !docNumber) {
            showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor ingresa un correo válido', 'error');
            return;
        }
        
        // Simulate submission
        showNotification('Procesando tu solicitud...', 'success');
        
        setTimeout(() => {
            showNotification('¡Solicitud enviada! Te contactaremos pronto.', 'success');
            closeModal(productModal);
            productForm.reset();
        }, 1500);
    });
}

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !phone || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor ingresa un correo válido', 'error');
            return;
        }
        
        showNotification('¡Mensaje enviado! Nos contactaremos contigo pronto.', 'success');
        contactForm.reset();
    });
}

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('es-CO');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('es-CO');
        }
    };
    
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// FADE-IN ANIMATIONS
// ============================================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// ACTIVE NAV LINKS
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                ${type === 'success' 
                    ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
                    : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 24px;
            background: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInNotif 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #00B894;
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-success svg {
            color: #00B894;
        }
        
        .notification-error svg {
            color: #ef4444;
        }
        
        .notification span {
            color: #111827;
            font-weight: 500;
            font-size: 15px;
        }
        
        @keyframes slideInNotif {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutNotif {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 16px;
                left: 16px;
                top: 80px;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutNotif 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCards = document.querySelectorAll('.hero-card');
    
    heroCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.2);
        if (scrolled < 800) {
            card.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

console.log('🏦 Banco Cúcuta Express - Sistema cargado correctamente');
console.log('✅ Modales funcionales');
console.log('✅ Formularios validados');
console.log('✅ Animaciones activas');
