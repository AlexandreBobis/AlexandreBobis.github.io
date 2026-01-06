// Navigation mobile toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70; // Height of fixed navbar
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cache portfolio data (skills)
let portfolioDataPromise = null;

async function getPortfolioData() {
    if (!portfolioDataPromise) {
        portfolioDataPromise = (async () => {
            const res = await fetch('./portfolio.json');
            if (!res.ok) throw new Error('Impossible de charger portfolio.json');
            return res.json();
        })();
    }
    return portfolioDataPromise;
}

// Charger et afficher les compétences
async function loadSkills() {
    try {
        const data = await getPortfolioData();
        const skillsContainer = document.getElementById('skillsContainer');

        if (skillsContainer && data.skills) {
            skillsContainer.innerHTML = data.skills.map(skill => `
                <div class="skill-item">
                    <span class="skill-name">${skill.name}</span>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des compétences:', error);
    }
}

// Handle contact form submission via Formspree
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            try {
                // Disable button during submission
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoi en cours...';
                
                // Send form data to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Merci pour votre message ! Je vous répondrai bientôt.');
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                alert('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

// Charger tout au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
});
