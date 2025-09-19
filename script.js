// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mouse Following Circles - Similar to Pierre.io
class MouseCircles {
    constructor() {
        this.circles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMoving = false;
        this.moveTimeout = null;
        
        this.init();
    }
    
    init() {
        // Create multiple circles with different sizes
        const circleSizes = [
            { size: 'large', delay: 0 },
            { size: 'medium', delay: 50 },
            { size: 'small', delay: 100 }
        ];
        
        circleSizes.forEach(({ size, delay }) => {
            const circle = document.createElement('div');
            circle.className = `mouse-circle ${size}`;
            circle.style.left = '50%';
            circle.style.top = '50%';
            circle.style.transform = 'translate(-50%, -50%)';
            circle.style.opacity = '0';
            document.body.appendChild(circle);
            
            this.circles.push({
                element: circle,
                delay: delay,
                x: 0,
                y: 0
            });
        });
        
        // Add event listeners
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Start animation loop
        this.animate();
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.isMoving = true;
        
        // Clear existing timeout
        if (this.moveTimeout) {
            clearTimeout(this.moveTimeout);
        }
        
        // Set timeout to stop movement after 100ms of no movement
        this.moveTimeout = setTimeout(() => {
            this.isMoving = false;
        }, 100);
    }
    
    handleMouseEnter() {
        this.circles.forEach(circle => {
            circle.element.style.opacity = '1';
        });
    }
    
    handleMouseLeave() {
        this.circles.forEach(circle => {
            circle.element.style.opacity = '0';
        });
        this.isMoving = false;
    }
    
    animate() {
        this.circles.forEach((circle, index) => {
            if (this.isMoving) {
                // Calculate target position with delay
                const targetX = this.mouseX;
                const targetY = this.mouseY;
                
                // Smooth interpolation
                circle.x += (targetX - circle.x) * 0.1;
                circle.y += (targetY - circle.y) * 0.1;
                
                // Apply position with delay
                setTimeout(() => {
                    circle.element.style.left = circle.x + 'px';
                    circle.element.style.top = circle.y + 'px';
                    circle.element.style.transform = 'translate(-50%, -50%)';
                }, circle.delay);
            }
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize mouse circles
const mouseCircles = new MouseCircles();

// Typed.js initialization
var typed = new Typed('#element', {
    strings: ['Web Developer', 'Software Developer'],
    
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Real-time clock
function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('time').innerHTML = timeString;
}

// Update time every second
setInterval(displayTime, 1000);
displayTime(); // Initial call

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when skills section is in view
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Download resume functionality
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Resume download feature coming soon!', 'info');
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Skill cards hover effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Floating animation for profile image
function addFloatingAnimation() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.animation = 'float 6s ease-in-out infinite';
    }
}

// Initialize floating animation
addFloatingAnimation();

// Mobile menu toggle
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .navbar-nav .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .navbar-nav .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-info {
        background: #4299e1 !important;
    }
`;
document.head.appendChild(style); 