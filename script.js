const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

const updateActiveLink = () => {
    let currentId = '';
    const scrollLine = window.scrollY + 140;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollLine >= top && scrollLine < top + height) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href === `#${currentId}`);
    });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

const revealElements = document.querySelectorAll('.timeline-item, .project-card, .tag-grid span, .contact-box, .profile-panel');
revealElements.forEach((element) => element.classList.add('reveal'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));
