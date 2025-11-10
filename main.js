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
// 🎯 Define unique paths for each smoke element
const paths = [
  [
    { x: 0, y: 0 },     
    { x: 0, y: -150 },  
    { x: 150, y: -300 } 
  ],
  [
    { x: 0, y: 0 },      // start (bottom center)
    { x: -100, y: -100 }, // control point — goes up and right
    { x: -100, y: -350 }  // end point (top right)
  ],
  [
    { x: 0, y: 0 },      // start (bottom center)
    { x: -50, y: -150 }, // control point — goes up and right
    { x: -50, y: -150 }  // end point (top right)
  ]
];

// 🚀 Animate each smoke element along its path
smokes.forEach((smoke, i) => {
  gsap.timeline({
    defaults: { ease: "power1.inOut" },
    onComplete: () => float(smoke)
  }).to(smoke, {
    duration: 2,
    opacity: 0.8,
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
  const split = new SplitText(".scroll-about", { type: "lines" });
  function animateLines() {
    split.lines.forEach(target => {
      gsap.to(target, {
        backgroundPositionX: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: target, scrub: 1, start: "top 80%", end: "bottom 80%" }
      });
    });
  }
  animateLines();

  const delayedResize = gsap.delayedCall(0.2, () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    split.split();
    animateLines();
  }).pause();
  window.addEventListener("resize", () => delayedResize.restart(true));

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
