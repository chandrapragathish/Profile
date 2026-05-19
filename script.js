// ========================================
// WAIT FOR DOM TO LOAD
// ========================================
// ========================================
// GLOBAL SCROLL FUNCTION (Fix for Buttons)
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Calculate position offset for the fixed navbar
        const yOffset = -70; 
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        // Smooth scroll to the section
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    } else {
        console.error("Could not find section with ID:", sectionId);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing...');
    
    // ========================================
    // BUTTON CLICK HANDLERS
    // ========================================
    const contactBtn = document.getElementById('contactBtn');
    const projectsBtn = document.getElementById('projectsBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const yOffset = -70;
                const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }
    
    if (projectsBtn) {
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const yOffset = -70;
                const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            console.log('Resume download clicked');
        });
    }
    
    // ========================================
    // GLOBAL VARIABLES
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // SMOOTH SCROLLING FOR NAV LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
                
                const yOffset = -70;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // SCROLL FUNCTIONALITY
    // ========================================
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
    });
    
    // ========================================
    // TYPING EFFECT
    // ========================================
    const roles = [
        "Senior Software Engineer",
        "Full Stack Developer",
        ".NET Core Specialist",
        "Azure Cloud Developer",
        "Problem Solver"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
        const roleText = document.querySelector('.role-text');
        if (!roleText) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    typeRole();
    
    // ========================================
    // SKILLS ANIMATION
    // ========================================
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        setTimeout(() => {
                            bar.style.width = progress + '%';
                        }, 100);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });
        
        skillsObserver.observe(skillsSection);
    }
    
    // ========================================
    // STATS COUNTER
    // ========================================
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statItems = entry.target.querySelectorAll('.stat-item');
                    statItems.forEach(item => {
                        const target = parseFloat(item.getAttribute('data-count'));
                        const statNumber = item.querySelector('.stat-number');
                        if (!statNumber) return;
                        
                        let count = 0;
                        const increment = target / 50;
                        const isDecimal = target % 1 !== 0;
                        
                        const updateCount = () => {
                            if (count < target) {
                                count += increment;
                                if (isDecimal) {
                                    statNumber.textContent = count.toFixed(1) + '+';
                                } else {
                                    statNumber.textContent = Math.ceil(count) + '+';
                                }
                                setTimeout(updateCount, 30);
                            } else {
                                if (isDecimal) {
                                    statNumber.textContent = target.toFixed(1) + '+';
                                } else {
                                    statNumber.textContent = target + '+';
                                }
                            }
                        };
                        
                        updateCount();
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ========================================
    // FORM SUBMISSION
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Thank you, ${name}! Your message has been sent successfully.</span>
            `;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
            
            contactForm.reset();
        });
    }
    
    // ========================================
    // GALLERY LIGHTBOX
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-overlay');
                const caption = overlay ? overlay.querySelector('h3').textContent : '';
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = caption;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ========================================
    // BACK TO TOP
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // PARTICLES
    // ========================================
    function createParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;
        
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${left}%;
                top: ${top}%;
                animation: float-random-${i} ${duration}s infinite ease-in-out;
                animation-delay: ${delay}s;
            `;
            heroParticles.appendChild(particle);
        }
    }
    
    const particleStyle = document.createElement('style');
    let particleAnimations = '';
    
    for (let i = 0; i < 20; i++) {
        const translateX1 = Math.random() * 100 - 50;
        const translateY1 = Math.random() * 100 - 50;
        const translateX2 = Math.random() * 100 - 50;
        const translateY2 = Math.random() * 100 - 50;
        const translateX3 = Math.random() * 100 - 50;
        const translateY3 = Math.random() * 100 - 50;
        
        particleAnimations += `
            @keyframes float-random-${i} {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(${translateX1}px, ${translateY1}px) scale(1.2);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(${translateX2}px, ${translateY2}px) scale(0.8);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(${translateX3}px, ${translateY3}px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
    }
    
    particleStyle.textContent = particleAnimations + `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    createParticles();
    
    // ========================================
    // PROJECT CARDS TILT
    // ========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ========================================
    // EDUCATION CARDS
    // ========================================
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.education-icon');
            if (icon) {
                icon.style.transform = 'rotateY(360deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.education-icon');
            if (icon) {
                icon.style.transform = 'rotateY(0)';
            }
        });
    });
    
    // ========================================
    // TIMELINE ANIMATION
    // ========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    console.log('All initializations complete!');
});

// ========================================
// CONSOLE MESSAGES
// ========================================
console.log('%c👋 Hello, Developer!', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to my portfolio website!', 'color: #6b7280; font-size: 16px;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #10b981; font-size: 14px;');
console.log('%cFeel free to reach out: chandruvelan17@gmail.com', 'color: #2563eb; font-size: 14px;');
