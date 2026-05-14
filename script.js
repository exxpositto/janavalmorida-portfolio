// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = ["Turning Ideas into Visual Impact", "Crafting Digital Experiences", "Building Meaningful Brands", "Design that Connects & Converts"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Background Particles
function createParticles() {
    const container = document.getElementById('bg-animation');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        const size = Math.random() * 300 + 100;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        
        animateParticle(particle);
    }
}

function animateParticle(p) {
    const duration = Math.random() * 20000 + 10000;
    const xMove = Math.random() * 200 - 100;
    const yMove = Math.random() * 200 - 100;
    
    p.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xMove}px, ${yMove}px)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn-pill');
const showcaseItems = document.querySelectorAll('.showcase-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        showcaseItems.forEach(item => {
            const isMatch = item.getAttribute('data-category') === category;
            const isMasonry = item.classList.contains('fun-projects-masonry');
            const isStandard = item.classList.contains('project-showcase');

            if (isMatch) {
                // Determine display type based on class
                if (isMasonry) {
                    item.style.display = 'grid'; // Masonry uses grid container
                    // Trigger masonry resize after display
                    setTimeout(() => {
                        resizeAllMasonryItems();
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else if (isStandard) {
                    item.style.display = 'grid';
                } else {
                    item.style.display = 'block';
                }
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => item.style.display = 'none', 400);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

function setupLightbox() {
    // Standard showcased items (with content)
    document.querySelectorAll('.project-showcase').forEach(item => {
        const imgWrapper = item.querySelector('.showcase-img-wrapper');
        const img = imgWrapper.querySelector('img');
        const title = item.querySelector('.project-large-title').textContent;
        const desc = item.querySelector('.content-block p').textContent;

        imgWrapper.addEventListener('click', () => {
            openLightbox(img.src, title, desc);
        });
    });

    // Fun projects (tiles only with data attributes)
    document.querySelectorAll('.fun-tile').forEach(tile => {
        const img = tile.querySelector('img');
        const title = tile.getAttribute('data-title') || "Experimental Piece";
        const desc = tile.getAttribute('data-desc') || "A personal exploration into digital forms and lighting.";

        tile.addEventListener('click', () => {
            openLightbox(img.src, title, desc);
        });
    });

    // Certification cards
    document.querySelectorAll('.cert-card').forEach(card => {
        const img = card.querySelector('img');
        const title = card.getAttribute('data-title') || card.querySelector('.cert-title').textContent;
        const desc = card.getAttribute('data-desc') || "";

        card.addEventListener('click', () => {
            openLightbox(img.src, title, desc);
        });
    });
}

function openLightbox(src, title, desc) {
    lightbox.style.display = 'block';
    lightboxImg.src = src;
    lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    document.body.style.overflow = 'hidden'; // Stop scrolling
}

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

// Masonry Grid Logic
function resizeMasonryItem(item) {
    const grid = document.querySelector('.fun-projects-masonry');
    const rowHeight = 10; // Matches CSS grid-auto-rows
    const content = item.querySelector('.tile-inner');
    
    // Check if images in content are loaded
    const img = content.querySelector('img');
    if (img && !img.complete) {
        img.addEventListener('load', () => resizeMasonryItem(item));
        return;
    }

    // Dynamic span for horizontal images
    if (img && img.naturalWidth > img.naturalHeight * 1.3 && window.innerWidth > 768) {
        item.classList.add('wide');
    } else {
        item.classList.remove('wide');
    }

    const rowSpan = Math.ceil(content.getBoundingClientRect().height / rowHeight);
    item.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeAllMasonryItems() {
    const allItems = document.querySelectorAll('.fun-tile');
    allItems.forEach(item => {
        if (item.offsetParent !== null) { // Only calculate for visible items
            resizeMasonryItem(item);
        }
    });
}

window.addEventListener('resize', resizeAllMasonryItems);

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        emailjs.sendForm('service_w1ykbbq', 'template_3i5m75s', contactForm)
            .then(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                // If you had a special UI flow like hide form/show response, you can trigger it here
                // But instructions just say "reset the form after successful submission" and "show a success alert"
                // The existing logic hid the form, instructions said "Do NOT redesign or modify the visual appearance"
                // Let's stick to showing alerts and resetting as requested.
                btn.textContent = originalText;
                btn.disabled = false;
            }, (error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send message. Please try again later.');
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("hnC7Y-vqNwn4TSPuk");
    type();
    createParticles();
    reveal();
    setupLightbox();
    
    // Initial Filter (trigger first active button)
    const activeBtn = document.querySelector('.filter-btn-pill.active');
    if (activeBtn) activeBtn.click();
});
