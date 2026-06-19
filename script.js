// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Department Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn[data-department]');
const departmentContents = document.querySelectorAll('.department-content');

if (tabBtns.length && departmentContents.length) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            departmentContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const departmentId = btn.getAttribute('data-department');
            const departmentEl = document.getElementById(departmentId);
            if (departmentEl) {
                departmentEl.classList.add('active');
                
                // Smooth scroll to section on mobile
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        departmentEl.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        });
    });
}

// Card Links for Service Overview
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const departmentId = link.getAttribute('data-department');
        if (departmentId) {
            const targetBtn = document.querySelector(`.tab-btn[data-department="${departmentId}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageTextarea = this.querySelector('textarea');
        
        const name = nameInput ? nameInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const message = messageTextarea ? messageTextarea.value : '';
        
        if (name && email && message) {
            // Show success message
            alert(`Merci ${name}! Votre message a été envoyé. Nous vous répondrons bientôt à ${email}.`);
            
            // Reset form
            this.reset();
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// Carousel functionality
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (track && prevBtn && nextBtn) {
    let currentPosition = 0;
    let cardWidth = 0;
    
    function updateCarousel() {
        const cards = document.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;
        
        cardWidth = cards[0].offsetWidth + 32; // width + gap
        const maxPosition = Math.max(0, (cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth)) * cardWidth);
        
        currentPosition = Math.max(-maxPosition, Math.min(0, currentPosition));
        track.style.transform = `translateX(${currentPosition}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentPosition = Math.min(currentPosition + cardWidth, 0);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        currentPosition = Math.max(currentPosition - cardWidth, -maxScroll);
        updateCarousel();
    });
    
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    updateCarousel();
}

// Gallery overlay click handler
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Open image in modal (you can implement a proper modal here)
            window.open(img.src, '_blank');
        }
    });
});

// Portfolio overlay click handler
document.querySelectorAll('.portfolio-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        const portfolioItem = overlay.closest('.portfolio-item');
        if (portfolioItem) {
            // Open project details (you can implement a modal here)
            console.log('Open project details');
        }
    });
});

// Add animation on scroll (simple reveal)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.value-card, .service-overview-card, .portfolio-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Play overlay functionality
const playOverlay = document.querySelector('.play-overlay');
const heroVideo = document.querySelector('.hero-video');

if (playOverlay && heroVideo) {
    playOverlay.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play();
            playOverlay.style.opacity = '0';
        } else {
            heroVideo.pause();
            playOverlay.style.opacity = '1';
        }
    });
    
    heroVideo.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play();
            playOverlay.style.opacity = '0';
        } else {
            heroVideo.pause();
            playOverlay.style.opacity = '1';
        }
    });
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize tooltips (simple version)
document.querySelectorAll('[title]').forEach(el => {
    el.setAttribute('data-title', el.getAttribute('title'));
});

console.log('SAMPRO Consulting website loaded successfully!');





// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
}

// Theme toggle click handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            if (themeToggle) {
                themeToggle.style.transform = '';
            }
        }, 300);
    });
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Optional: Add smooth transition for theme change
const style = document.createElement('style');
style.textContent = `
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// Optional: Add theme change animation for key elements
function animateThemeChange() {
    const elements = document.querySelectorAll('.value-card, .service-overview-card, .portfolio-item, .testimonial-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transform = 'scale(0.98)';
            setTimeout(() => {
                el.style.transform = '';
            }, 150);
        }, index * 50);
    });
}

// Listen for theme changes
const observerTheme = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
            animateThemeChange();
        }
    });
});

observerTheme.observe(document.documentElement, {
    attributes: true
});

// Optional: Add keyboard shortcut (Ctrl/Cmd + Shift + D) for theme toggle
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Optional: Add console message for theme
console.log('Theme system initialized. Use Ctrl/Cmd + Shift + D to toggle theme');





// Video Background Loading and Management
const videoBackground = document.querySelector('.hero-video-background');
const bgVideo = document.querySelector('.bg-video');

if (bgVideo) {
    // Add loading state
    if (videoBackground) {
        videoBackground.classList.add('video-loading');
    }
    
    // Handle video loaded
    bgVideo.addEventListener('loadeddata', () => {
        if (videoBackground) {
            videoBackground.classList.remove('video-loading');
        }
        console.log('Background video loaded successfully');
    });
    
    // Handle video error
    bgVideo.addEventListener('error', (e) => {
        console.error('Background video failed to load:', e);
        if (videoBackground) {
            videoBackground.classList.remove('video-loading');
            // Fallback to gradient background
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.background = 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)';
            }
        }
    });
    
    // Handle video play issues (autoplay policies)
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay was prevented:', error);
            // Show a play button overlay
            const hero = document.querySelector('.hero');
            if (hero && !document.querySelector('.video-play-prompt')) {
                const playPrompt = document.createElement('div');
                playPrompt.className = 'video-play-prompt';
                playPrompt.innerHTML = `
                    <button class="play-video-btn">
                        <i class="fas fa-play"></i>
                        Activer la vidéo
                    </button>
                `;
                playPrompt.style.position = 'absolute';
                playPrompt.style.top = '50%';
                playPrompt.style.left = '50%';
                playPrompt.style.transform = 'translate(-50%, -50%)';
                playPrompt.style.zIndex = '10';
                playPrompt.style.background = 'rgba(0,0,0,0.7)';
                playPrompt.style.padding = '1rem 2rem';
                playPrompt.style.borderRadius = '3rem';
                playPrompt.style.cursor = 'pointer';
                playPrompt.style.border = '2px solid var(--secondary)';
                
                const btn = playPrompt.querySelector('.play-video-btn');
                if (btn) {
                    btn.style.background = 'none';
                    btn.style.border = 'none';
                    btn.style.color = 'white';
                    btn.style.fontSize = '1rem';
                    btn.style.cursor = 'pointer';
                    btn.style.display = 'flex';
                    btn.style.alignItems = 'center';
                    btn.style.gap = '0.5rem';
                    
                    btn.addEventListener('click', () => {
                        bgVideo.play();
                        playPrompt.remove();
                    });
                }
                
                hero?.appendChild(playPrompt);
            }
        });
    }
}

// Optional: Pause video when not in viewport to save resources
const heroSection = document.querySelector('.hero');

if (heroSection && bgVideo) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bgVideo.play().catch(e => console.log('Video play prevented:', e));
            } else {
                bgVideo.pause();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
}

// Optional: Add smooth scroll parallax effect
let lastScrollY = 0;
if (bgVideo) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const diff = scrollY - lastScrollY;
        const currentTransform = bgVideo.style.transform || 'translateX(-50%) translateY(-50%) scale(1)';
        
        if (scrollY < window.innerHeight) {
            const scale = 1 + (scrollY * 0.0005);
            bgVideo.style.transform = `translateX(-50%) translateY(-50%) scale(${scale})`;
        }
        
        lastScrollY = scrollY;
    });
}



// YouTube Background Integration
let youtubePlayer = null;
let youtubeInterval = null;

function initYouTubeBackground(videoId, options = {}) {
    const youtubeContainer = document.getElementById('youtubeBg');
    if (!youtubeContainer) return;
    
    // Options par défaut
    const defaultOptions = {
        autoplay: 1,
        mute: 1,
        loop: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
        playsinline: 1
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    if (finalOptions.loop && !finalOptions.list && !finalOptions.playlist) {
        finalOptions.playlist = videoId;
    }
    
    // Construire l'URL de l'iframe
    let params = [];
    for (let [key, value] of Object.entries(finalOptions)) {
        params.push(`${key}=${value}`);
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.join('&')}`;
    
    // Créer l'iframe
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "absolute";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.minWidth = "100%";
    iframe.style.minHeight = "100%";
    
    // Ajouter un conteneur pour l'iframe
    const container = document.createElement('div');
    container.className = 'youtube-container';
    container.appendChild(iframe);
    
    youtubeContainer.innerHTML = '';
    youtubeContainer.appendChild(container);
    
    // Gérer le chargement
    iframe.addEventListener('load', () => {
        console.log('YouTube background loaded');
        if (youtubeContainer.parentElement) {
            youtubeContainer.parentElement.classList.remove('video-loading');
        }
    });
    
    // Pour le loop sur YouTube, on doit parfois recharger
    if (finalOptions.loop) {
        let loopCount = 0;
        const checkLoop = setInterval(() => {
            if (iframe.contentWindow) {
                // Envoyer un message pour vérifier l'état (optionnel)
                loopCount++;
                if (loopCount > 100) clearInterval(checkLoop);
            }
        }, 1000);
    }
}

// Fonction pour extraire l'ID YouTube d'une URL
function getYouTubeId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&]+)/,
        /(?:youtu\.be\/)([^?]+)/,
        /(?:youtube\.com\/embed\/)([^?]+)/,
        /(?:youtube\.com\/v\/)([^?]+)/
    ];
    
    for (let pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// Initialiser avec votre vidéo YouTube
// Remplacez 'VIDEO_ID' par l'ID de votre vidéo YouTube
// Par exemple: 'tuPHm37D0h0'
// const YOUTUBE_VIDEO_ID = 'tuPHm37D0h0';
// const YOUTUBE_PLAYLIST_ID = 'PLdGJJ6BBahVodCt3Cet2bDmDSiRVJoE5G';

// // URL complète: https://www.youtube.com/embed/tuPHm37D0h0?list=PLdGJJ6BBahVodCt3Cet2bDmDSiRVJoE5G

// // Démarrer la vidéo YouTube
// if (document.getElementById('youtubeBg')) {
//     // Ajouter un indicateur de chargement
//     const videoBg = document.querySelector('.hero-video-background');
//     if (videoBg) videoBg.classList.add('video-loading');
    
//     // Initialiser avec l'ID YouTube
//     initYouTubeBackground(YOUTUBE_VIDEO_ID, {
//         autoplay: 1,
//         mute: 1,
//         loop: 1,
//         controls: 0,
//         modestbranding: 1,
//         showinfo: 0,
//         rel: 0,
//         playsinline: 1,
//         list: YOUTUBE_PLAYLIST_ID
//     });
// }



// Director section animation on scroll
const directorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const directorItems = entry.target.querySelectorAll('.timeline-item, .achievement-item, .director-badges .badge');
            directorItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

const directorSection = document.querySelector('.section-director');
if (directorSection) {
    // Set initial state for timeline items
    directorSection.querySelectorAll('.timeline-item, .achievement-item, .director-badges .badge').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    directorObserver.observe(directorSection);
}



// ============================================
// ANIMATIONS PROFESSIONNELLES AU SCROLL
// ============================================

// Configuration de l'observateur d'intersection
const animationOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Observateur principal pour les animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Ajouter un délai pour un effet en cascade
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                // Ajouter la classe d'animation
                entry.target.classList.add('animated');
                // Déclencher l'animation spécifique
                const animationType = entry.target.dataset.animation || 'fadeInUp';
                entry.target.classList.add(animationType);
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
            }, parseInt(delay));
        }
    });
}, animationOptions);

// Fonction pour initialiser les animations
function initAnimations() {
    // Sélectionner tous les éléments à animer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((el, index) => {
        // Définir un délai progressif
        if (!el.dataset.delay) {
            el.dataset.delay = (index % 5) * 100;
        }
        
        // Définir le type d'animation par défaut
        if (!el.dataset.animation) {
            const animations = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'fadeInDown'];
            el.dataset.animation = animations[index % animations.length];
        }
        
        // Observer l'élément
        animationObserver.observe(el);
    });
}

// ============================================
// DÉFINITION DES ANIMATIONS CSS
// ============================================

// Ajouter les styles d'animation dynamiquement
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Base - État initial des éléments animés */
    .animate-on-scroll {
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, opacity;
    }
    
    /* Animations disponibles */
    .fadeInUp {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .fadeInDown {
        animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .fadeInLeft {
        animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .fadeInRight {
        animation: fadeInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .zoomIn {
        animation: zoomIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .zoomOut {
        animation: zoomOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .slideUp {
        animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .slideDown {
        animation: slideDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .scaleIn {
        animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .rotateIn {
        animation: rotateIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* Keyframes */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(60px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-60px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-60px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(60px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes zoomOut {
        from {
            opacity: 0;
            transform: scale(1.2);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(100px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-100px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.7);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes rotateIn {
        from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.8);
        }
        to {
            opacity: 1;
            transform: rotate(0) scale(1);
        }
    }
    
    /* Effet de révélation de texte */
    .text-reveal {
        overflow: hidden;
        display: inline-block;
    }
    
    .text-reveal .word {
        display: inline-block;
        opacity: 0;
        transform: translateY(30px);
        animation: wordReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes wordReveal {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Stagger effect pour les enfants */
    .stagger-children > * {
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .stagger-children.animated > * {
        opacity: 1;
    }
    
    .stagger-children.animated > *:nth-child(1) { transition-delay: 0.05s; }
    .stagger-children.animated > *:nth-child(2) { transition-delay: 0.15s; }
    .stagger-children.animated > *:nth-child(3) { transition-delay: 0.25s; }
    .stagger-children.animated > *:nth-child(4) { transition-delay: 0.35s; }
    .stagger-children.animated > *:nth-child(5) { transition-delay: 0.45s; }
    .stagger-children.animated > *:nth-child(6) { transition-delay: 0.55s; }
    .stagger-children.animated > *:nth-child(7) { transition-delay: 0.65s; }
    .stagger-children.animated > *:nth-child(8) { transition-delay: 0.75s; }
    
    /* Effet de parallaxe léger */
    .parallax {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .parallax:hover {
        transform: translateY(-5px);
    }
`;

document.head.appendChild(animationStyles);

// ============================================
// INITIALISATION DES ANIMATIONS
// ============================================

// Attendre le chargement complet du DOM
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

// ============================================
// ANIMATION DES TITRES ET TEXTES
// ============================================

function animateTexts() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, p, .section-tag');
    textElements.forEach(el => {
        if (!el.closest('.animate-on-scroll')) {
            el.classList.add('animate-on-scroll');
            // Texte en fondu pour les paragraphes
            if (el.tagName === 'P') {
                el.dataset.animation = 'fadeInUp';
            }
        }
    });
}

// ============================================
// ANIMATION DES CARTES ET ÉLÉMENTS VISUELS
// ============================================

function animateCards() {
    const cardSelectors = [
        '.value-card',
        '.service-overview-card',
        '.testimonial-card',
        '.portfolio-item',
        '.gallery-item',
        '.stat-card',
        '.digital-card',
        '.design-item',
        '.print-item',
        '.conseil-card',
        '.marketing-card',
        '.achievement-item',
        '.partner-item'
    ];
    
    cardSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                // Animation différente selon le type
                if (selector === '.value-card' || selector === '.testimonial-card') {
                    el.dataset.animation = 'scaleIn';
                } else if (selector === '.gallery-item') {
                    el.dataset.animation = 'zoomIn';
                } else {
                    el.dataset.animation = 'fadeInUp';
                }
            }
        });
    });
}

// ============================================
// ANIMATION DES SECTIONS AVEC STAGGER
// ============================================

function initStaggerSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Ajouter stagger aux enfants des sections
        const children = section.querySelectorAll('.value-card, .service-overview-card, .testimonial-card, .portfolio-item, .gallery-item');
        if (children.length > 1) {
            const wrapper = document.createElement('div');
            wrapper.className = 'stagger-children animate-on-scroll';
            wrapper.dataset.animation = 'fadeInUp';
            
            // Remplacer le parent direct
            const parent = children[0].parentElement;
            if (parent && !parent.classList.contains('stagger-children')) {
                // Créer un conteneur pour les enfants
                const container = document.createElement('div');
                container.className = 'stagger-container';
                container.style.display = 'grid';
                container.style.gridTemplateColumns = 'inherit';
                container.style.gap = 'inherit';
                
                // Déplacer les enfants dans le conteneur
                const items = [];
                children.forEach(child => {
                    items.push(child.cloneNode(true));
                    child.remove();
                });
                items.forEach(item => container.appendChild(item));
                parent.appendChild(container);
                
                // Appliquer stagger au conteneur
                container.classList.add('stagger-children', 'animate-on-scroll');
                container.dataset.animation = 'fadeInUp';
                
                // Ajouter les classes d'animation aux éléments
                container.querySelectorAll('*').forEach((el, index) => {
                    el.style.transitionDelay = `${(index * 0.1)}s`;
                    el.classList.add('animate-on-scroll');
                    el.dataset.animation = 'fadeInUp';
                    el.dataset.delay = (index * 100);
                });
            }
        }
    });
}

// ============================================
// ANIMATION DE RÉVÉLATION DE TEXTE (MODIFIÉE)
// ============================================

function initTextReveal() {
    const headings = document.querySelectorAll('h1, h2, h3, .section-tag');
    headings.forEach(heading => {
        // EXCLURE les titres de la hero section
        if (heading.closest('.hero')) {
            return; // Ne pas appliquer l'animation de révélation sur la hero
        }
        
        if (!heading.classList.contains('text-reveal')) {
            heading.classList.add('text-reveal');
            
            // Diviser le texte en mots
            const words = heading.textContent.split(' ');
            heading.innerHTML = words.map((word, index) => {
                return `<span class="word" style="animation-delay: ${index * 0.08}s">${word}</span>`;
            }).join(' ');
            
            heading.style.overflow = 'hidden';
            
            // Observer pour déclencher l'animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        heading.querySelectorAll('.word').forEach(word => {
                            word.style.animation = 'wordReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                        });
                        observer.unobserve(heading);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(heading);
        }
    });
}

// ============================================
// EFFET DE PARALLAXE LÉGER SUR LES IMAGES
// ============================================

function initParallaxImages() {
    const images = document.querySelectorAll('.about-image, .department-image, .photo-frame, .gallery-item img');
    images.forEach(img => {
        img.classList.add('parallax-image');
        img.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(img);
    });
}

// ============================================
// EFFET DE SURVOL SUR LES CARTES (AMÉLIORÉ)
// ============================================

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.value-card, .service-overview-card, .testimonial-card, .digital-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// ============================================
// ANIMATION DES BOUTONS
// ============================================

function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('animated-btn');
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
    });
    
    // Ajouter les styles des boutons animés
    const btnStyles = document.createElement('style');
    btnStyles.textContent = `
        .animated-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animated-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .animated-btn:hover::after {
            width: 300px;
            height: 300px;
        }
        
        .animated-btn:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(btnStyles);
}

// ============================================
// INITIALISATION COMPLÈTE
// ============================================

// Lancer toutes les animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateTexts();
        animateCards();
        initStaggerSections();
        initTextReveal();
        initParallaxImages();
        initCardHoverEffects();
        initButtonAnimations();
        initAnimations();
    }, 100);
});

// Réinitialiser les animations lors d'un changement de thème
document.addEventListener('themeChanged', () => {
    document.querySelectorAll('.animated').forEach(el => {
        el.classList.remove('animated');
        // Re-déclencher l'animation après un court délai
        setTimeout(() => {
            const animation = el.dataset.animation || 'fadeInUp';
            el.classList.add('animated', animation);
        }, 50);
    });
});

console.log('✨ Animations professionnelles activées avec succès !');

// ============================================
// CARROUSEL DE TÉMOIGNAGES - AUTOMATIQUE
// ============================================

// ============================================
// NOUVEAU CARROUSEL DE TÉMOIGNAGES
// ============================================

function initTestimonialCarousel() {
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let intervalId = null;
    const DELAY = 4000; // 4 secondes
    let isTransitioning = false;
    
    if (items.length === 0) return;
    
    // Fonction pour afficher un témoignage
    function showTestimonial(index) {
        if (isTransitioning) return;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        if (index === currentIndex) return;
        
        isTransitioning = true;
        
        // Cacher l'ancien
        const oldItem = items[currentIndex];
        oldItem.classList.remove('active');
        oldItem.classList.add('exit');
        
        // Afficher le nouveau
        const newItem = items[index];
        newItem.classList.remove('exit');
        newItem.classList.add('active');
        
        // Mettre à jour les dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        
        // Réinitialiser l'état de transition
        setTimeout(() => {
            isTransitioning = false;
            // Nettoyer les classes
            items.forEach(item => {
                item.classList.remove('exit');
            });
        }, 700);
    }
    
    // Passer au suivant
    function nextTestimonial() {
        if (isTransitioning) return;
        showTestimonial((currentIndex + 1) % items.length);
    }
    
    // Passer au précédent
    function prevTestimonial() {
        if (isTransitioning) return;
        showTestimonial((currentIndex - 1 + items.length) % items.length);
    }
    
    // Démarrer l'autoplay
    function startAutoplay() {
        stopAutoplay();
        intervalId = setInterval(nextTestimonial, DELAY);
    }
    
    // Arrêter l'autoplay
    function stopAutoplay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    
    // Réinitialiser l'autoplay
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Événements sur les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentIndex) {
                showTestimonial(index);
                resetAutoplay();
            }
        });
    });
    
    // Événements sur les boutons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetAutoplay();
        });
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
            resetAutoplay();
        }
    });
    
    // Support du swipe
    let touchStartX = 0;
    let touchEndX = 0;
    const container = document.querySelector('.testimonial-container');
    
    if (container) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
                resetAutoplay();
            }
        }, { passive: true });
    }
    
    // Pause au survol
    const showcase = document.querySelector('.testimonials-showcase');
    if (showcase) {
        showcase.addEventListener('mouseenter', stopAutoplay);
        showcase.addEventListener('mouseleave', startAutoplay);
    }
    
    // Démarrer
    showTestimonial(0);
    startAutoplay();
    
    // Nettoyer si la section n'est pas visible
    const section = document.querySelector('#testimonials');
    if (section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    }
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initTestimonialCarousel, 300);
});

// Initialiser le carrousel au chargement
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initTestimonialCarousel();
    }, 500);
});