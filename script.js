// Smooth scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
}
//Toggle theme
// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconPath = document.getElementById('menu-icon-path');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        menuIconPath.setAttribute('d', 'M5 5l10 10M15 5L5 15');
    } else {
        menuIconPath.setAttribute('d', 'M3 6h14M3 10h14M3 14h14');
    }
}

menuToggle.addEventListener('click', toggleMobileMenu);

// Intersection Observer for active nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserverOptions = {
    threshold: 0.4
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeSectionId = entry.target.id;
            navLinks.forEach(link => {
                if (link.getAttribute('data-section') === activeSectionId) {
                    link.classList.add('nav-active');
                    // Add underline if desktop
                    if (!link.querySelector('.nav-underline') && link.closest('ul').id !== 'mobile-menu') {
                        const underline = document.createElement('span');
                        underline.className = 'nav-underline';
                        link.appendChild(underline);
                    }
                } else {
                    link.classList.remove('nav-active');
                    const underline = link.querySelector('.nav-underline');
                    if (underline) underline.remove();
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => navObserver.observe(section));

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Intro name animation (character by character)
const charReveals = document.querySelectorAll('.char-reveal');
charReveals.forEach((char, index) => {
    char.style.opacity = '0';
    char.style.transform = 'translateY(100px)';
    char.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    char.style.transitionDelay = `${0.4 + (index * 0.06)}s`;
    
    // Trigger animation after a small delay
    setTimeout(() => {
        char.style.opacity = '1';
        char.style.transform = 'translateY(0)';
    }, 100);
});

// Mouse move effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/*
// Down-scroll assist: if next section is more than half visible, settle to it.
// Up-scroll remains free (no snapping).
const mainSections = Array.from(document.querySelectorAll('main > section'));
let lastScrollY = window.scrollY;
let isAutoSnappingDown = false;

function maybeSnapDownToNextSection() {
    if (isAutoSnappingDown) return;

    const currentY = window.scrollY;
    const scrollingDown = currentY > lastScrollY;
    lastScrollY = currentY;

    if (!scrollingDown) return;

    const viewportHalf = window.innerHeight * 0.5;

    for (let i = 1; i < mainSections.length; i++) {
        const section = mainSections[i];
        const rect = section.getBoundingClientRect();

        // Trigger only when the next section top crosses the 50% viewport line.
        if (rect.top > 0 && rect.top <= viewportHalf) {
            isAutoSnappingDown = true;
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                isAutoSnappingDown = false;
                lastScrollY = window.scrollY;
            }, 550);
            break;
        }
    }
}

window.addEventListener('scroll', maybeSnapDownToNextSection, { passive: true });
*/
