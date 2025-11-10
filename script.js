// ============================================
// BANCO CÚCUTA EXPRESS WEBSITE FUNCTIONALITY
// ============================================

// Global state management
const BankingApp = {
    user: null,
    isLoggedIn: false,
    currentSection: 'inicio',
    notifications: [],
    transactions: [],
    accounts: []
};

// ============================================
// ENHANCED INTRO SCREEN
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
        
        // Effect simulation (visual feedback)
        const loaderBar = document.querySelector('.loader-bar');
        if (loaderBar) {
            loaderBar.addEventListener('animationend', () => {
                // Add a subtle pulse when loading completes
                loaderBar.style.animation = 'none';
                setTimeout(() => {
                    loaderBar.style.animation = 'pulse 0.5s ease';
                }, 10);
            });
        }
        
        // Hide intro after animation completes
        setTimeout(() => {
            introScreen.style.animation = 'fadeOut 1s ease forwards';
            setTimeout(() => {
                introScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('hasSeenIntro', 'true');
                
                // Trigger welcome animation on main content
                triggerWelcomeAnimation();
            }, 1000);
        }, 4500);
    }
});

// Welcome animation for main content
function triggerWelcomeAnimation() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hero.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ============================================
// MODAL SYSTEM
// ============================================
const loginModal = document.getElementById('login-modal');
const productModal = document.getElementById('product-modal');
const closeBtns = document.querySelectorAll('.modal-close');

// Open Login Modal (from navbar)
document.querySelectorAll('.btn-login').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        // Si el href es #ingresar, hacer scroll suave, si no, abrir modal
        if (href === '#ingresar') {
            // Dejar que el navegador haga el scroll suave
            return;
        } else {
            e.preventDefault();
            openModal(loginModal);
        }
    });
});

// Product buttons configuration
const productButtons = {
    'Solicitar ahora': {
        title: 'Solicitud de Producto',
        description: 'Completa el formulario y nos contactaremos contigo',
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
            <rect x="4" y="12" width="40" height="24" rx="3" fill="currentColor"/>
        </svg>`
    },
    'Abrir cuenta gratis': {
        title: 'Apertura de Cuenta',
        description: 'Abre tu cuenta 100% digital en minutos',
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
            <circle cx="24" cy="24" r="20" fill="currentColor"/>
        </svg>`
    },
    'Invertir ahora': {
        title: 'Solicitud de Inversión',
        description: 'Comienza a invertir con nosotros',
        icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 4L4 14v10c0 12.5 8.33 24.17 20 27.5 11.67-3.33 20-15 20-27.5V14L24 4z" fill="currentColor"/>
        </svg>`
    }
};

// Handle all action buttons (from new sections)
document.addEventListener('click', (e) => {
    // Botones de abrir cuenta
    if (e.target.closest('.btn-open-account')) {
        e.preventDefault();
        document.getElementById('modal-title').textContent = 'Apertura de Cuenta Digital';
        document.getElementById('modal-description').textContent = 'Completa tus datos para abrir tu cuenta';
        document.getElementById('modal-icon').innerHTML = productButtons['Abrir cuenta gratis'].icon;
        document.getElementById('producto-solicitado').value = 'Cuenta Digital';
        openModal(productModal);
    }
    
    // Botones de invertir
    if (e.target.closest('.btn-invest')) {
        e.preventDefault();
        const productName = e.target.closest('.invest-card')?.querySelector('h3')?.textContent || 'Inversión';
        document.getElementById('modal-title').textContent = 'Solicitud de Inversión';
        document.getElementById('modal-description').textContent = 'Completa el formulario para comenzar a invertir';
        document.getElementById('modal-icon').innerHTML = productButtons['Invertir ahora'].icon;
        document.getElementById('producto-solicitado').value = productName;
        openModal(productModal);
    }
    
    // Botones de solicitar
    if (e.target.closest('.btn-request')) {
        e.preventDefault();
        const productName = e.target.closest('.request-card')?.querySelector('h3')?.textContent || 'Producto Financiero';
        document.getElementById('modal-title').textContent = 'Solicitud de Producto Financiero';
        document.getElementById('modal-description').textContent = 'Completa tus datos y te contactaremos pronto';
        document.getElementById('modal-icon').innerHTML = productButtons['Solicitar ahora'].icon;
        document.getElementById('producto-solicitado').value = productName;
        openModal(productModal);
    }
});

// Open Product Modal (legacy support)
document.querySelectorAll('.btn-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonText = btn.textContent.trim();
        const productName = btn.closest('.product-card')?.querySelector('h3')?.textContent || 'Producto';
        
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
            document.getElementById('producto-solicitado').value = productName;
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

// Login Form (Modal)
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

// Login Form (Section)
const loginFormMain = document.querySelector('.login-form-main');
if (loginFormMain) {
    loginFormMain.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const docType = loginFormMain.querySelector('select').value;
        const docNumber = loginFormMain.querySelectorAll('input[type="text"]')[0].value;
        const password = loginFormMain.querySelector('input[type="password"]').value;
        
        if (!docType || !docNumber || !password) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Simulate login
        showNotification('Iniciando sesión...', 'success');
        
        setTimeout(() => {
            showNotification('¡Bienvenido! Redirigiendo a tu cuenta...', 'success');
            loginFormMain.reset();
            
            // Scroll to top after login
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    });
}

// Register button
const btnRegister = document.querySelector('.btn-register');
if (btnRegister) {
    btnRegister.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to abrir cuenta section
        const abrirCuentaSection = document.getElementById('abrir-cuenta');
        if (abrirCuentaSection) {
            abrirCuentaSection.scrollIntoView({ behavior: 'smooth' });
            showNotification('Completa el formulario para crear tu cuenta', 'success');
        }
    });
}

// Product Form
const productForm = document.querySelector('.product-form');
if (productForm) {
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = productForm.querySelector('input[name="nombre"]').value;
        const email = productForm.querySelector('input[name="email"]').value;
        const phone = productForm.querySelector('input[name="telefono"]').value;
        const docType = productForm.querySelector('select[name="tipo_documento"]').value;
        const docNumber = productForm.querySelector('input[name="numero_documento"]').value;
        
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
        
        // Show loading notification
        showNotification('Enviando tu solicitud...', 'success');
        
        try {
            // Submit to Formspree
            const response = await fetch(productForm.action, {
                method: 'POST',
                body: new FormData(productForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('¡Solicitud enviada exitosamente! Te contactaremos pronto.', 'success');
                closeModal(productModal);
                productForm.reset();
            } else {
                showNotification('Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.', 'error');
            }
        } catch (error) {
            showNotification('Error de conexión. Por favor verifica tu internet e intenta de nuevo.', 'error');
        }
    });
}

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="nombre"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const phone = contactForm.querySelector('input[name="telefono"]').value;
        const message = contactForm.querySelector('textarea[name="mensaje"]').value;
        
        if (!name || !email || !phone || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor ingresa un correo válido', 'error');
            return;
        }
        
        // Show loading notification
        showNotification('Enviando tu mensaje...', 'success');
        
        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('¡Mensaje enviado exitosamente! Nos contactaremos contigo pronto.', 'success');
                contactForm.reset();
            } else {
                showNotification('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.', 'error');
            }
        } catch (error) {
            showNotification('Error de conexión. Por favor verifica tu internet e intenta de nuevo.', 'error');
        }
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
// NAVBAR SCROLL EFFECT - Enhanced
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
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


// ============================================
// DASHBOARD FUNCTIONALITY
// ============================================

// Show dashboard after successful login
function showDashboard() {
    const dashboardSection = document.getElementById('dashboard');
    const loginSection = document.getElementById('ingresar');
    
    if (dashboardSection && loginSection) {
        // Hide login section
        loginSection.style.display = 'none';
        
        // Show dashboard
        dashboardSection.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Initialize charts
        setTimeout(() => {
            initializeCharts();
        }, 300);
    }
}

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const dashboardSection = document.getElementById('dashboard');
        const loginSection = document.getElementById('ingresar');
        
        if (dashboardSection && loginSection) {
            dashboardSection.style.display = 'none';
            loginSection.style.display = 'block';
            
            showNotification('Sesión cerrada correctamente', 'success');
            
            // Scroll to login section
            loginSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize Charts
function initializeCharts() {
    // Finances Chart (Line Chart)
    const financesCanvas = document.getElementById('financesChart');
    if (financesCanvas) {
        const ctx = financesCanvas.getContext('2d');
        
        // Simple line chart implementation
        const width = financesCanvas.width = financesCanvas.offsetWidth;
        const height = financesCanvas.height = 200;
        
        // Sample data
        const incomeData = [1200, 1900, 1500, 2200, 1800, 2400, 2100, 2800, 2300, 2600];
        const outcomeData = [800, 1200, 1000, 1400, 1100, 1600, 1300, 1800, 1500, 1700];
        
        // Draw grid
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw income line
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        incomeData.forEach((value, index) => {
            const x = (width / (incomeData.length - 1)) * index;
            const y = height - (value / 3000) * height;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw outcome line
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        outcomeData.forEach((value, index) => {
            const x = (width / (outcomeData.length - 1)) * index;
            const y = height - (value / 3000) * height;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
    }
    
    // Expenses Chart (Donut Chart)
    const expensesCanvas = document.getElementById('expensesChart');
    if (expensesCanvas) {
        const ctx = expensesCanvas.getContext('2d');
        const width = expensesCanvas.width = expensesCanvas.offsetWidth;
        const height = expensesCanvas.height = 200;
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        const innerRadius = radius * 0.6;
        
        // Data
        const data = [
            { label: 'Shopping', value: 35, color: '#3B82F6' },
            { label: 'Workspace', value: 25, color: '#8B5CF6' },
            { label: 'Food', value: 20, color: '#EC4899' },
            { label: 'Entertainment', value: 20, color: '#F59E0B' }
        ];
        
        let currentAngle = -Math.PI / 2;
        
        data.forEach(item => {
            const sliceAngle = (item.value / 100) * 2 * Math.PI;
            
            // Draw outer arc
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
}

// Update login form to show dashboard
const loginFormMainDash = document.querySelector('.login-form-main');
if (loginFormMainDash) {
    loginFormMainDash.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const docType = loginFormMainDash.querySelector('select').value;
        const docNumber = loginFormMainDash.querySelectorAll('input[type="text"]')[0].value;
        const password = loginFormMainDash.querySelector('input[type="password"]').value;
        
        if (!docType || !docNumber || !password) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Simulate login
        showNotification('Iniciando sesión...', 'success');
        
        setTimeout(() => {
            showNotification('¡Bienvenido a tu dashboard!', 'success');
            loginFormMainDash.reset();
            
            // Show dashboard
            showDashboard();
        }, 1500);
    });
}

console.log('🎨 Dashboard cargado correctamente');

// ============================================
// DARK/LIGHT THEME SYSTEM
// ============================================

// Theme management
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get saved theme or use system preference
function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update VAPI widget theme if it exists
    const vapiWidget = document.querySelector('vapi-widget');
    if (vapiWidget) {
        vapiWidget.setAttribute('theme', theme);
        vapiWidget.setAttribute('base-bg-color', theme === 'dark' ? '#1E293B' : '#FFFFFF');
        vapiWidget.setAttribute('accent-color', '#14B8A6');
        vapiWidget.setAttribute('cta-button-color', theme === 'dark' ? '#14B8A6' : '#000000');
        vapiWidget.setAttribute('cta-button-text-color', theme === 'dark' ? '#0F172A' : '#FFFFFF');
    }
    
    // Update navbar immediately if scrolled
    if (window.pageYOffset > 0) {
        updateNavbarOnScroll();
    }
    
    // Update any existing notifications
    const existingNotificationStyle = document.querySelector('style[data-notification]');
    if (existingNotificationStyle) {
        existingNotificationStyle.remove();
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    
    // Add a subtle animation feedback
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
    
    // Show notification
    showNotification(
        `Tema ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 
        'success'
    );
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const initialTheme = getTheme();
    applyTheme(initialTheme);
    
    // Add theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});

// Update existing functions to work with themes
showNotification = function(message, type = 'success') {
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
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${currentTheme === 'dark' ? '#1E293B' : '#FFFFFF'};
            color: ${currentTheme === 'dark' ? '#FFFFFF' : '#111827'};
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, ${currentTheme === 'dark' ? '0.6' : '0.15'});
            z-index: 10000;
            animation: slideInNotif 0.3s ease;
            border: 1px solid ${currentTheme === 'dark' ? '#334155' : '#E5E7EB'};
        }
        
        .notification-success {
            border-left: 4px solid #10B981;
        }
        
        .notification-error {
            border-left: 4px solid #EF4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-success svg {
            color: #10B981;
        }
        
        .notification-error svg {
            color: #EF4444;
        }
        
        .notification span {
            font-weight: 500;
            font-size: 15px;
            color: ${currentTheme === 'dark' ? '#FFFFFF' : '#111827'};
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
    } else {
        document.querySelector('style[data-notification]').textContent = style.textContent;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutNotif 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
};

// Theme-aware scroll effects - Update the existing scroll listener
function updateNavbarOnScroll() {
    const currentScroll = window.pageYOffset;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = currentTheme === 'dark' 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.6)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(30, 41, 59, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = currentTheme === 'dark' 
            ? '0 1px 2px 0 rgba(0, 0, 0, 0.5)' 
            : '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(30, 41, 59, 0.95)' 
            : '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
}

// Replace the existing scroll listener
window.removeEventListener('scroll', updateNavbarOnScroll);
window.addEventListener('scroll', updateNavbarOnScroll);

console.log('🌙 Sistema de tema claro/oscuro activado');