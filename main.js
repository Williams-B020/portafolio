// NAVBAR ANIMATION
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach((link, i) => {
    gsap.from(link, {
      x: i % 2 === 0 ? 100 : -100, // even links from left, odd links from right
      opacity: 0,
      duration: 0.8,
      delay: 0.2, // stagger animation
      ease: "power3.out"
    });
  });
  
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

gsap.registerPlugin(ScrollTrigger);
// Change nav links color on scroll
gsap.to(".nav-link", {
  color: "white",
  ease: "none",
  scrollTrigger: {
    trigger: ".navbar",
    start: "top top",
    end: "+=100",
    scrub: true,
  }
});

// HERO ANIMATION
gsap.from(".hero-img", {
    y: -200,      // start above
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

gsap.from(".hero-text", {
    y: -200,       // start below
    opacity: 0,
    duration: 1,
    scale: 0.5,
    delay: 0.5,   // slight delay after image
    ease: "power3.out"
  });

gsap.registerPlugin(ScrollTrigger);
gsap.to(".section-hero", {
  scale: 0.8, // zoom out to 90%
  ease: "none",
  borderRadius: "75px",  // round corners
  scrollTrigger: {
    trigger: ".section-hero",
    start: "top top",   // when section top hits top of viewport
    end: "bottom top",  // when section bottom hits top of viewport
    scrub: 1         // makes the animation follow the scroll
  }
});

// SCROLLTRIGGER TEXT ANIMATION
 gsap.registerPlugin(ScrollTrigger, SplitText);
 let split = new SplitText(".scroll-about", { type: "lines" });

 function makeItHappen() {
 split.lines.forEach((target) => {
   gsap.to(target, {
     backgroundPositionX: 0,
     opacity: 1,
     ease: "none",
     scrollTrigger: {
       trigger: target,
       scrub: 1,
       start: "top 80%",
       end: "bottom 80%"
     }
   });
 });
 }

 let someDelay = gsap.delayedCall(0.2, newTriggers).pause();
window.addEventListener("resize", () => someDelay.restart(true));

function newTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill();
  });
  split.split();
  makeItHappen();
}
makeItHappen();
  /* */
  
  /* */

// MOUSE POINTER
const cursor = document.querySelector('.cursor');
const workItems = document.querySelectorAll('.work-item');

// Cursor exactly follows mouse
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Hover image randomizer (optional if you want multiple hover images)
workItems.forEach(item => {
  const hoverImg = item.querySelector('.hover-img');
  const hoverImages = item.dataset.hoverImages ? item.dataset.hoverImages.split(',') : [hoverImg.src];
  let index = 0;

  const changeImage = () => {
    hoverImg.src = hoverImages[index];
    index = (index + 1) % hoverImages.length;
  };

  item.addEventListener('mouseenter', () => {
    changeImage();
    item.hoverInterval = setInterval(changeImage, 500);
  });

  item.addEventListener('mouseleave', () => {
    clearInterval(item.hoverInterval);
  });
});

// NOISE ANIMATION
workItems.forEach(item => {
  const canvas = item.querySelector('.noise-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = item.clientWidth;
  canvas.height = item.clientHeight;

  function generateNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255;
      imageData.data[i] = value;
      imageData.data[i + 1] = value;
      imageData.data[i + 2] = value;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(generateNoise);
  }
  generateNoise();
});

// CARD INSIDE BLURRY IMAGE
workItems.forEach(item => {
  const hoverCard = item.querySelector('.hover-card');
  item.addEventListener('mouseenter', () => {
    gsap.fromTo(hoverCard, 
      { y: 50, scale: 0.9 },           // start slightly below and smaller
      { y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" } // slide up with bounce
    );
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(hoverCard, { 
      y: 50, 
      scale: 0.9, 
      duration: 0.25, 
      ease: "power3.in"               // quick, snappy exit
    });
  });
});

const cards = document.querySelectorAll('.work-item');
cards.forEach((container) => {
  const card = container;
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  container.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
