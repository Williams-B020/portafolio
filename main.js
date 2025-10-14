/* 
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


 gsap.from(".header-img", {
    y: -200,      // start above
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate text from bottom
  gsap.from("header h1", {
    y: 100,       // start below
    opacity: 0,
    duration: 1,
    delay: 0.5,   // slight delay after image
    ease: "power3.out"
  });


  */