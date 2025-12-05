document.addEventListener("DOMContentLoaded", () => {

    // ===== MOUSE POINTER =====
  const cursor = document.querySelector('.cursor');
  const workItems = document.querySelectorAll('.work-item');
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, ScrambleTextPlugin,);

  

  window.addEventListener("load", () => {

    const circle = document.querySelector(".circle");

    const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" }
    });

    // 1. Stop pulse smoothly (remove infinite animation)
    tl.to(circle, {
        duration: 0.2,
        onStart: () => {
            circle.style.animation = "none"; // stops pulse after loading
        }
    });

    // 2. Expand circle to reveal page
    tl.to(circle, {
        width: 2000,
        height: 2000,
        duration: 1.3
    });

    // 3. Fade out loader
    tl.to("#loader", {
        opacity: 0,
        duration: 0.6
    }, "-=0.4")
    .set("#loader", { display: "none" });
});




window.addEventListener("load", () => {
  // run GSAP loader animation
  gsap.to(".loader", { opacity: 1, duration: 1 });

  setTimeout(() => {
    gsap.to(".loader", { opacity: 0, duration: 0.5 });
    document.getElementById("page").style.display = "block";
  }, 3000);
});



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

const humoElements = gsap.utils.toArray(".humo");

humoElements.forEach((el) => {
  let fromX = 0;
  let fromY = 0;

  // Direction based on class
  if (el.classList.contains("from-left")) {
    fromX = -400;
  } else if (el.classList.contains("from-right")) {
    fromX = 400;
  } else if (el.classList.contains("from-top")) {
    fromY = -400;
  } else if (el.classList.contains("from-bottom")) {
    fromY = 400;
  }

  // Random delay for a natural feel
  const randomDelay = gsap.utils.random(0, 1);

  gsap.from(el, {
    x: fromX,
    y: fromY,
    opacity: 0,
    duration: 2,
    delay: randomDelay,
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
    { x: 350, y: -250 }
  ],
  [
    { x: 0, y: 0 },
    { x: -90, y: -150 },
    { x: -350, y: -220 }
  ],
  [
    { x: 0, y: 0 },
    { x: -40, y: -140 },
    { x: -40, y: -140 }
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

  
gsap.registerPlugin(ScrambleTextPlugin);

document.querySelectorAll(".scramble-text").forEach((el) => {
    const originalText = el.textContent;

    el.addEventListener("mouseenter", () => {
        // Ensure the text is reset before animation
        el.textContent = originalText;

        gsap.to(el, {
            duration: 1,
            ease: "power3.out",
            scrambleText: {
                text: originalText,
                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ[{",
                speed: 0.3,
                revealDelay: 0.15
            }
        });
    });

    // Optional: reset text on mouseleave for repeated hover
    el.addEventListener("mouseleave", () => {
        gsap.to(el, {
            duration: 0.5,
            ease: "power1.out",
            textContent: originalText
        });
    });
});


const images = document.querySelectorAll('.web-image, .ilus-image, .foto-image');
const overlay = document.getElementById('overlay');
const bigImg = document.getElementById('bigImg');

// Open
images.forEach(img => {
  img.addEventListener('click', () => {
    bigImg.src = img.src;
    overlay.classList.add('open');
    document.body.classList.add('noscroll');
  });
});

// Close on click
overlay.addEventListener('click', () => {
  overlay.classList.remove('open');
  document.body.classList.remove('noscroll');
  setTimeout(() => bigImg.src = "", 200);
});

// Close with Esc
window.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    overlay.classList.remove('open');
    document.body.classList.remove('noscroll');
    setTimeout(() => bigImg.src = "", 200);
  }
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




document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.words').forEach(ticker => {
    const inner = ticker.querySelector('.group');
    const content = inner.querySelector('.text');
    const duration = ticker.getAttribute('data-duration') || 8;

    // Clone for seamless loop
function cloneContent(times) {
    for (let i = 0; i < times; i++) {
        inner.append(content.cloneNode(true));
    }
}

cloneContent(3); // clones it 3 times

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




gsap.defaults({ ease: "elastic(1.5, 0.3)" });

const svg  = document.getElementById("string-svg");
const path = document.getElementById("string-path");

let connected = false;
let snapDist = 120;

let p0 = { x: 0, y: 0 };   // left
let p1 = { x: 0, y: 0 };   // control (middle)
let p2 = { x: 0, y: 0 };   // right

function setupPoints() {
  const w = svg.clientWidth;
  const h = svg.clientHeight;

  const midY = h / 2;

  p0.x = 0;     p0.y = midY;
  p1.x = w/2;   p1.y = midY;
  p2.x = w;     p2.y = midY;
}

setupPoints();
window.addEventListener("resize", setupPoints);

svg.addEventListener("mousemove", onMove);
gsap.ticker.add(update);
update();

function update() {
  const d = `M${p0.x},${p0.y} Q${p1.x},${p1.y} ${p2.x},${p2.y}`;
  path.setAttribute("d", d);

  const restY = svg.clientHeight / 2;

  if (Math.abs(p1.y - restY) > snapDist) {
    connected = false;
    gsap.to(p1, { y: restY, duration: 1.5 });
  }
}

function onMove(e) {
  const rect = svg.getBoundingClientRect();
  const restY = svg.clientHeight / 2;

  if (!connected && e.target === path) {
    connected = true;
    gsap.killTweensOf(p1);
  }

  if (connected) {
    // Calculate mouse Y relative to SVG
    const mouseY = e.clientY - rect.top;

    // Pull the string *relative to center*
    const pull = (mouseY - restY) * 2;

    p1.y = restY + pull;
  }
}



