// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

// Load images function - optimized for performance
function loadImages() {
    const images = {
        'artwork1': 'images/ritratto-famiglia.webp',
        'artwork2': 'images/avventure-famiglia.webp', 
        'artwork3': 'images/volpe-nove-code.webp',
        'artwork4': 'images/studio-ritratto.webp',
        'artwork5': 'images/mare.webp',
        'artwork6': 'images/ritratto.webp',
        'artwork7': 'images/cavalluccio.webp',
        'artwork8': 'images/fumetto.webp',
        'artwork9': 'images/fumetto2.webp',
        'artwork10': 'images/fumetto3.webp',
        'artwork11': 'images/fumetto4.webp',
        'artwork12': 'images/fumetto5.webp',
        'artwork13': 'images/immersione.webp',
        'artwork14': 'images/summer.webp',
        'artwork15': 'images/pokemon.webp',
        'artwork16': 'images/comunione.webp',
        'artwork17': 'images/festadellaliberta.webp',
        'artwork18': 'images/telefilm.webp',
        'artwork19': 'images/avventura egitto.webp',
        'artwork20': 'images/astronauta.webp',
        'artwork21': 'images/fermata.webp',
        'artwork22': 'images/balcone.webp',
        'artwork23': 'images/avventura nella preistoria.webp',
        'artwork24': 'images/wow.webp',
        'artwork25': 'images/bimbi.webp',
        'artwork26': 'images/donna.webp',
        'artwork27': 'images/luna.webp',
        'artwork28': 'images/me.webp',
        'artwork29': 'images/relax.webp',
        'artwork30': 'images/natura.webp',
        'artwork31': 'images/bosco.webp',
        'artwork32': 'images/fiori.webp',
        'artwork33': 'images/GallegioBlu.webp',
        'artwork34': 'images/SalutoFestoso.webp',
        'artwork35': 'images/GuerrieraEterea.webp',
        'artwork36': 'images/GiardinoIncantato.webp',
        'qr-code': 'images/qr-instagram.webp',
        'gmail-icon': 'images/gmail-icon.webp',
        'paypal-icon': 'images/paypal-icon.webp'
    };

    const imageEntries = Object.entries(images);
    let index = 0;

    const processImage = (id, src) => {
        const element = document.getElementById(id);
        if (!element) return;

        if (element.classList.contains('placeholder-image')) {
            const img = document.createElement('img');
            img.id = id;
            img.src = src;
            img.alt = element.textContent.trim().replace(/<small>.*<\/small>/, '').replace(/<br>/g, ' ');
            img.loading = 'lazy';
            element.replaceWith(img);
        } else if (element.classList.contains('qr-code')) {
            element.innerHTML = `<img src="${src}" alt="QR Code" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" loading="lazy" width="150" height="150" />`;
        }
    };

    function scheduleLoad() {
        if (index >= imageEntries.length) return;

        const [id, src] = imageEntries[index];
        processImage(id, src);
        index++;
        
        if ('requestIdleCallback' in window) {
            requestIdleCallback(scheduleLoad);
        } else {
            setTimeout(scheduleLoad, 16); // fallback
        }
    }
    
    if ('requestIdleCallback' in window) {
        requestIdleCallback(scheduleLoad);
    } else {
        setTimeout(scheduleLoad, 16);
    }
}

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// --- Modal Logic ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const prevBtn = modal.querySelector('.modal-prev');
const nextBtn = modal.querySelector('.modal-next');
const closeBtn = modal.querySelector('.modal-close');
let artworks = [];
let currentIndex = -1;

function showImage(index) {
    if (index >= 0 && index < artworks.length) {
        const img = artworks[index];
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        currentIndex = index;
    }
}

function openModal(startIndex) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    showImage(startIndex);
    document.addEventListener('keydown', keydownHandler);
}

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.removeEventListener('keydown', keydownHandler);
}

const keydownHandler = function(ev) {
    if (ev.key === 'ArrowLeft') prevBtn.click();
    if (ev.key === 'ArrowRight') nextBtn.click();
    if (ev.key === 'Escape') closeModal();
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    // Pre-cache artwork elements after they are loaded
    setTimeout(() => {
        artworks = Array.from(document.querySelectorAll('.gallery .artwork img'));
    }, 1000); // Delay to ensure images are loaded by the script
});

// Combined and optimized event listener for clicks
document.addEventListener('click', function(e) {
    // Gallery modal logic
    const clickedArtwork = e.target.closest('.artwork');
    if (clickedArtwork && artworks.length > 0) {
        const img = clickedArtwork.querySelector('img');
        if (img) {
            const startIndex = artworks.indexOf(img);
            if (startIndex !== -1) {
                openModal(startIndex);
            }
        }
    }
    
    // Close mobile menu when clicking outside
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuIcon = document.querySelector('.mobile-menu');
    if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !mobileMenuIcon.contains(e.target)) {
        closeMobileMenu();
    }
});

// Modal event listeners
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', () => showImage((currentIndex - 1 + artworks.length) % artworks.length));
nextBtn.addEventListener('click', () => showImage((currentIndex + 1) % artworks.length));
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Touch navigation for modal
let touchStartX = null;
modal.addEventListener('touchstart', function(event) {
    if (event.touches.length === 1) {
        touchStartX = event.touches[0].clientX;
    }
});
modal.addEventListener('touchend', function(event) {
    if (touchStartX !== null && event.changedTouches.length === 1) {
        let touchEndX = event.changedTouches[0].clientX;
        let diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) { // Swipe threshold
            if (diff > 0) { // Swipe right
                prevBtn.click();
            } else { // Swipe left
                nextBtn.click();
            }
        }
        touchStartX = null;
    }
}); 