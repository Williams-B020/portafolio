document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

  // ===== NAVBAR =====
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbar = document.getElementById('navbar');

  navLinks.forEach((link, i) => {
    gsap.from(link, { x: i % 2 === 0 ? 100 : -100, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
  });

  window.addEventListener('scroll', () => navbar.classList.toggle('sticky', window.scrollY > 50));

  gsap.to(".nav-link", {
    color: "white",
    ease: "none",
    scrollTrigger: { trigger: ".navbar", start: "top top", end: "+=100", scrub: true }
  });

  // ===== HERO =====
  gsap.from(".hero-img", { y: 200, opacity: 0, duration: 1, ease: "power3.out" });

  gsap.utils.toArray(".humo").forEach(el => {
    gsap.from(el, {
      x: gsap.utils.random(-400, 400),
      y: gsap.utils.random(-400, 400),
      opacity: 0,
      duration: 2,
      delay: 1.2,
      ease: "power2.out"
    });
  });

 const smokes = document.querySelectorAll(".icon");

// Detect if screen is mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// 🎯 Desktop paths
const desktopPaths = [
  [
    { x: 0, y: 0 },
    { x: 0, y: -150 },
    { x: 350, y: -320 }
  ],
  [
    { x: 0, y: 0 },
    { x: -100, y: -100 },
    { x: -350, y: -320 }
  ],
  [
    { x: 0, y: 0 },
    { x: -50, y: -150 },
    { x: -50, y: -150 }
  ]
];

// 📱 Mobile paths (smaller movement so they stay in frame)
const mobilePaths = [
  [
    { x: 0, y: 0 },
    { x: 0, y: -80 },
    { x: 80, y: -230 }
  ],
  [
    { x: 0, y: 0 },
    { x: -50, y: -70 },
    { x: -100, y: -220 }
  ],
  [
    { x: 0, y: 0 },
    { x: -20, y: -50 },
    { x: -20, y: -50 }
  ]
];

// Choose the correct paths
const paths = isMobile ? mobilePaths : desktopPaths;

// 🚀 Animate each smoke element along its path
smokes.forEach((smoke, i) => {
  gsap.timeline({
    defaults: { ease: "power1.inOut" },
    onComplete: () => float(smoke)
  }).to(smoke, {
    duration: 2,
    delay: 0.7,
    opacity: 1,
    motionPath: {
      curviness: 1.25,
      path: paths[i % paths.length]
    }
  });
});

// 🌬 Gentle random floating loop
function float(target) {
  function animate() {
    gsap.to(target, {
      x: "+=" + gsap.utils.random(-25, 25),
      y: "+=" + gsap.utils.random(-20, 20),
      rotation: gsap.utils.random(-8, 8),
      duration: gsap.utils.random(3, 6),
      ease: "sine.inOut",
      onComplete: animate
    });
  }

  // Slight random delay to desync motions
  gsap.delayedCall(gsap.utils.random(0, 1.5), animate);
}

  gsap.from(".section-hero background-image", { y: -200, opacity: 0, scale: 0.5, duration: 1, delay: 0.5, ease: "power3.out" });
  gsap.from(".hero-text", { y: 200, opacity: 0, scale: 0.5, duration: 1, delay: 0.5, ease: "power3.out" });
  gsap.to(".section-hero", {
    scale: 0.8,
    borderRadius: "75px",
    ease: "none",
    scrollTrigger: { trigger: ".section-hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  
  // ===== SCROLLTRIGGER TEXT =====
window.addEventListener("load", () => {
  
  const isMobile = window.innerWidth < 768;

  // Kill old split on reload (desktop only)
  if (!isMobile && window.splitInstance) {
    window.splitInstance.revert();
  }

  if (isMobile) {
    console.log("Mobile animation active");

    // SIMPLE MOBILE ANIMATION (NO SplitText, NO pin)
    gsap.from([".title-about", ".scroll-about"], {
      y: 30,
      autoAlpha: 0,
      duration: 1,
      delay: 0.1,     // ⏳ Small delay before animation starts
      stagger: 0.5,   // H1 first, then paragraph
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",   // triggers earlier on mobile
        toggleActions: "play none none reverse"
      }
    });

    ScrollTrigger.refresh();
    return; // stop desktop animation from running
  }

  // ===========================
  // DESKTOP ANIMATION (original)
  // ===========================
  console.log("Desktop animation active");

  // Create split AFTER layout stable
  const split = window.splitInstance = new SplitText(".scroll-about", {
    type: "lines"
  });

  gsap.set(".scroll-about", { autoAlpha: 1 });

  gsap.from(split.lines, {
    yPercent: 0,
    autoAlpha: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 0%",
      end: "bottom 0%",
      pin: true,
      scrub: true,
    }
  });

  ScrollTrigger.refresh();
});


  // ===== MOUSE POINTER =====
  const cursor = document.querySelector('.cursor');
  const workItems = document.querySelectorAll('.work-item');
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // ===== WORK ITEMS =====
  workItems.forEach(item => {
    // Lazy hover image
    const hoverImg = item.querySelector('.hover-img');
    const hoverImages = item.dataset.hoverImages ? item.dataset.hoverImages.split(',') : [hoverImg.src];
    let index = 0;
    const changeImage = () => { hoverImg.src = hoverImages[index]; index = (index + 1) % hoverImages.length; };
    item.addEventListener('mouseenter', () => { changeImage(); item.hoverInterval = setInterval(changeImage, 500); });
    item.addEventListener('mouseleave', () => clearInterval(item.hoverInterval));

    // Noise canvas only when in viewport
    const canvas = item.querySelector('.noise-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        onEnter: () => {
          canvas.width = item.clientWidth;
          canvas.height = item.clientHeight;
          (function generateNoise() {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
              const value = Math.random() * 255;
              imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = value;
              imageData.data[i+3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(generateNoise);
          })();
        }
      });
    }

    // Hover card animation
    const hoverCard = item.querySelector('.hover-card');
    item.addEventListener('mouseenter', () => {
      gsap.fromTo(hoverCard, { y: 50, scale: 0.9 }, { y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(hoverCard, { y: 50, scale: 0.9, duration: 0.25, ease: "power3.in" });
    });

    // Card tilt effect
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 15;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
      item.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; });
  });
});


    // HERO ---- WEB ---- FOTO ---- ILUST ----

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(ticker => {
    const inner = ticker.querySelector('.group');
    const content = inner.querySelector('.text');
    const duration = ticker.getAttribute('data-duration') || 8;

    // Clone for seamless loop
    inner.append(content.cloneNode(true));

    const isOutline = ticker.classList.contains('outline-text');

    // If it's the outline version, animate the opposite direction or slower
    const animations = [];
    inner.querySelectorAll('.text').forEach(element => {
      const animation = gsap.to(element, {
        x: isOutline ? "-100%" : "-100%", // opposite direction
        repeat: -1,
        duration: isOutline ? duration : duration, // slightly slower
        ease: "linear"
      });
      animations.push(animation);
    });
  });
});
