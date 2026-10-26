gsap.registerPlugin(ScrollTrigger);

    // plynulý scroll propojený s GSAP
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('.modal').forEach((modal) => {
      modal.addEventListener('show.bs.modal', () => lenis.stop());
      modal.addEventListener('hidden.bs.modal', () => lenis.start());
    });

    ScrollTrigger.create({
    trigger: 'footer',
    start: 'top 90%',              
    toggleClass: { targets: 'body', className: 'dark' }
    });

    // odkrytí obrázků
    document.querySelectorAll('.reveal').forEach((box) => {
    const delay = parseFloat(box.dataset.delay) || 0;

    gsap.fromTo(box,
      { y: 80, opacity: 0, filter: 'blur(12px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: { trigger: box, start: 'top 85%' }
      });
    });

    // jemný parallax
    document.querySelectorAll('.parallax img').forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    MouseFollower.registerGSAP(gsap);
    const cursor = new MouseFollower({
      visible: false,
      visibleOnState: true,
      speed: 0.55
    });