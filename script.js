// Typed.js initialization
const typed = new Typed("#element", {
  strings: [
    "Full Stack Developer",
    "Creative Problem Solver",
    "MERN Stack Specialist",
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  showCursor: true,
  cursorChar: "|",
});

// Real-time clock with sleek formatting
function displayTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const timeElement = document.getElementById("time");
  if (timeElement) {
    timeElement.innerHTML = timeString;
  }
}

setInterval(displayTime, 1000);
displayTime();

// Navbar Glassmorphism Effect on Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.padding = "0.8rem 0";
    navbar.style.background = "rgba(15, 23, 42, 0.95)";
    navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.padding = "1.2rem 0";
    navbar.style.background = "rgba(15, 23, 42, 0.8)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Contact form handling with premium feel
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showNotification(
        "Message sent! I'll reach out to you shortly.",
        "success",
      );
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Modern Notification System
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `;

  notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === "success" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "rgba(30, 41, 59, 0.9)"};
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 16px;
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        z-index: 9999;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateY(0)";
    notification.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateY(100px)";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// Download resume placeholder
const resumeBtn = document.getElementById("downloadResume");
if (resumeBtn) {
  resumeBtn.addEventListener("click", (e) => {
    showNotification("Preparing your download...", "info");
  });
}
