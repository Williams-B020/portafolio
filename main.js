document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

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
  gsap.from(".hero-img", { y: -200, opacity: 0, duration: 1, ease: "power3.out" });
  gsap.from(".hero-text", { y: -200, opacity: 0, scale: 0.5, duration: 1, delay: 0.5, ease: "power3.out" });
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
