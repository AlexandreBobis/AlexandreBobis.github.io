// Dark mode toggle functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    // Set initial dark mode state
    const isDark = savedMode === 'true' || (savedMode === null && prefersDark);
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    updateToggleState(isDark);
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            updateToggleState(isDarkMode);
        });
    }
}

function updateToggleState(isDarkMode) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const thumbIcon = document.getElementById('toggleThumbIcon');
    const leftIcon = document.querySelector('.toggle-icon-left .toggle-img');
    const rightIcon = document.querySelector('.toggle-icon-right .toggle-img');
    
    if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-checked', isDarkMode ? 'true' : 'false');
    }
    if (thumbIcon) {
        thumbIcon.src = isDarkMode ? './images/icons/dark_mode_white.png' : './images/icons/light_mode_white.png';
        thumbIcon.alt = isDarkMode ? 'Mode sombre' : 'Mode clair';
    }
    if (leftIcon) {
        leftIcon.src = isDarkMode ? './images/icons/light_mode_white.png' : './images/icons/light_mode_black.png';
    }
    if (rightIcon) {
        rightIcon.src = isDarkMode ? './images/icons/dark_mode_white.png' : './images/icons/dark_mode_black.png';
    }
}

function updateToggleIcon(isDarkMode) {
    updateToggleState(isDarkMode);
}

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

// Cache portfolio data (projects + skills)
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

// Build the star display (numeric format with icon)
function renderStars(count) {
    const safeCount = Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
    return `${safeCount} ⭐`;
}

// Extract owner/repo from a GitHub URL
function extractRepoInfoFromUrl(url) {
    try {
        const parsed = new URL(url);
        const parts = parsed.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
            return { owner: parts[0], repo: parts[1] };
        }
    } catch (e) {
        return null;
    }
    return null;
}

// Fetch star count from GitHub API with graceful fallback
async function fetchRepoStars(projectUrl, fallback = 0) {
    const info = extractRepoInfoFromUrl(projectUrl);
    if (!info) return fallback;

    try {
        const res = await fetch(`https://api.github.com/repos/${info.owner}/${info.repo}`);
        if (!res.ok) return fallback;
        const json = await res.json();
        return Number.isFinite(json.stargazers_count) ? json.stargazers_count : fallback;
    } catch (err) {
        return fallback;
    }
}

// Charger et afficher les projets depuis portfolio.json
async function loadProjects() {
    try {
        const data = await getPortfolioData();
        const projectsContainer = document.querySelector('.projects-container');
        
        if (projectsContainer && data.projectsList) {
            // Récupérer les étoiles GitHub pour chaque projet en parallèle
            const projectsWithStars = await Promise.all(
                data.projectsList.map(async project => {
                    // Essayer de récupérer les étoiles depuis GitHub, sinon utiliser la valeur du JSON
                    const stars = await fetchRepoStars(project.url, project.stars || 0);
                    return { ...project, stars };
                })
            );

            projectsContainer.innerHTML = projectsWithStars.map(project => {
                const starsDisplay = renderStars(project.stars);
                const languagesHTML = project.languages && project.languages.length > 0 
                    ? `<div class="tech-used">
                        ${project.languages.map(lang => `<span>${lang}</span>`).join('')}
                       </div>`
                    : '';
                
                return `
                <article class="project-card">
                    <div class="project-image-wrapper" style="background-image: url('${project.image}')">
                        <img src="${project.image}" alt="${project.title}" class="project-image">
                    </div>
                    <div class="project-content">
                        <h2 class="project-title">${project.title}</h2>
                        <p class="project-subtitle">${project.subtitle}</p>
                        ${languagesHTML}
                        <div class="project-footer">
                            <a href="${project.url}" target="_blank" class="project-link">Voir le projet</a>
                            <span class="project-stars" title="${project.stars} étoile(s)">${starsDisplay}</span>
                        </div>
                    </div>
                </article>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
}

// Charger et afficher les compétences
async function loadSkills() {
    try {
        const data = await getPortfolioData();
        const skillsContainer = document.getElementById('skillsContainer');

        if (skillsContainer && data.skills) {
            skillsContainer.innerHTML = data.skills.map(skill => `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%"></div>
                    </div>
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
    loadProjects();
    loadSkills();
    initDarkMode();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
});
