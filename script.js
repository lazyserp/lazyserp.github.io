document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimation();
  initScrollAnimations();
});

// 1. The Original Hero H1 Animation (Letter by Letter)
function initHeroAnimation() {
  const header = document.querySelector("h1");
  if (!header) return;

  const text = header.innerText;
  header.innerHTML = "";
  
  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;
    // Keep existing CSS animation for H1
    span.style.animationDelay = `${index * 0.05}s`; 
    header.appendChild(span);
  });
}

// 2. The Scroll Observer (Triggers animations when seen)
function initScrollAnimations() {
  // Config: Trigger when 15% of the element is visible
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the class to start animation
        entry.target.classList.add("is-visible");
        
        // Use a stagger effect for children if it's a paragraph
        if (entry.target.classList.contains("split-para")) {
            animateWords(entry.target);
        }
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // A. Target Paragraphs for "Blurry Line by Line" effect
  // We add a specific class to paragraphs we want to split
  const paragraphs = document.querySelectorAll(".bio, .project-description, .sub-headline");
  paragraphs.forEach(p => {
    p.classList.add("split-para"); // Mark for splitting
    prepareParagraph(p); // Wrap words in spans immediately
    observer.observe(p);
  });

  // B. Target Sections/Cards for general Fade Up
  const sections = document.querySelectorAll(".hero-image, .btn-container, .project-card, .navBar");
  sections.forEach(sec => {
    sec.classList.add("fade-up");
    observer.observe(sec);
  });
}

// Helper: Wraps every word in a span so we can animate them 1 by 1
function prepareParagraph(element) {
  const text = element.innerText;
  // Clear text and replace with spans
  element.innerHTML = text.split(" ").map(word => {
    return `<span class="word-span">${word}</span>`;
  }).join(" ");
}

// Helper: Triggers the visible class on words with a delay
function animateWords(element) {
  const words = element.querySelectorAll(".word-span");
  words.forEach((word, index) => {
    setTimeout(() => {
      word.classList.add("is-visible");
    }, index * 30); // 30ms delay between each word
  });
}