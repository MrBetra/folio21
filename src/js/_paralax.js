import gsap from 'gsap';

function parallax() {
  
  const img = document.querySelector('.img_bg');
  const title = document.querySelector('.paralax-title');

  window.addEventListener('scroll', (event) => {
    let scrolled = window.pageYOffset;
    //gsap.to(img, { scale:  1 - (scrolled * -0.00015) });
    //gsap.to(title, { yPercent: 1 * scrolled * 0.2, ease: "expo.out" });
  })
}
parallax();