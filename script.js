// ===== PAGE NAVIGATION SYSTEM =====

// Initialize page system
function initPageSystem() {
    // Get all navigation links and buttons with data-page attribute
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateToPage(pageId);
            
            // Close mobile menu if open
            const navList = document.querySelector('.nav-list');
            const hamburger = document.querySelector('.hamburger');
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

// Navigate to a specific page
function navigateToPage(pageId) {
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(pageId);
    if (!targetPage || (currentPage && currentPage.id === pageId)) {
        return;
    }

    if (currentPage) {
        currentPage.classList.remove('active');
    }

    // Show target page
    targetPage.classList.add('active');
    window.scrollTo(0, 0);
    
    // Update active nav link
    document.querySelectorAll('[data-page]').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === pageId);
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initPageSystem();
    setupMobileMenu();
    setupModals();
    setupFormSubmission();
    setupScrollIndicator();
    setupHoverEffects();
});

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (!hamburger || !navList) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// ===== MODALS =====
function setupModals() {
    // Open modals
    document.querySelectorAll('[data-modal]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== FORM SUBMISSION =====
function setupFormSubmission() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Store in localStorage
        const messages = JSON.parse(localStorage.getItem('andaluciaVuelaMessages') || '[]');
        messages.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('andaluciaVuelaMessages', JSON.stringify(messages));

        alert('¡Gracias por tu mensaje! Hemos recibido tu consulta y te contactaremos pronto.');
        form.reset();
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function setupScrollIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== BUTTON HOVER EFFECTS =====
function setupHoverEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
}
