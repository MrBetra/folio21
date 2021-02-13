import { gsap } from "gsap";
import imagesLoaded from 'imagesloaded'


// works :
const works = document.querySelector('.works');
const worksLeft = document.querySelectorAll('.works__item.left');
const worksRight = document.querySelectorAll('.works__item.right');

// parcours :
const parcoursItem = document.querySelectorAll('.col__item');



function init() {
  //if (window.innerWidth < 768) return;

  introAnim();

  worksLeft.forEach(addTweenLeft);
  worksRight.forEach(addTweenLeft);
  parcoursItem.forEach(addTweenUp);
}
init();

function introAnim() {

  const intro = document.querySelector('.intro');
  const introNav = intro.querySelector('.intro__nav ul');
  const introH1 = intro.querySelector('.intro__header h1');
  const introH2 = intro.querySelector('.paralax-title');
  const introScroll = intro.querySelector('.scroll');
  const introBg = intro.querySelector('.intro_img');
  const imgBg = intro.querySelector('.img_bg');

  let tl = gsap.timeline();
  tl.addLabel('start');
  
  imagesLoaded( '.img_bg', () => {
    tl.from(introBg, { yPercent: -100, duration: 3, ease: "expo.inOut" }, "start")
    .from(imgBg, { yPercent: 100, duration: 3, ease: "expo.inOut" }, "start")
  });
  tl.from([introH1,introNav,introH2,introScroll], { y: -20, opacity: 0, duration: .3, ease: "power1.inOut", stagger: .2 }, "1")
  
  // .from(introNav, { x: -50, opacity: 0, duration: .5, ease: "power1.out" }, "1.3")
  // .from(introH2, { x: -50, opacity: 0, duration: 1, ease: "power1.out" }, "1.5")
  // .from(introScroll, { x: -50, opacity: 0, duration: .5, ease: "power1.out" }, "1.3")
}


function addTweenLeft(job) { 
  
  let header = job.children[0];
  let imgContainer = job.children[1];
  let innerImg = imgContainer.children[0];

  let tl = new gsap.timeline({ paused: true, ease: "expo.out" });

  tl.from(header, { yPercent: -25, opacity: 0, duration: .5 })
    .from(imgContainer, { xPercent: -100, duration: 1  }, '0')
    .from(innerImg, { xPercent: 100, duration: 1 }, '0')

  let options = {
    threshold: 0.5
  };

  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {
        tl.play();
        observer.disconnect();
      }
    });
  }, options);
  io.POLL_INTERVAL = 100;
  io.observe(job);
}

function addTweenUp(job) {

  let elems = job.children;
  console.log(job.children);

  let tl = new gsap.timeline({ paused: true, ease: "expo.out" });

  tl.from(elems, { yPercent: -20, opacity: 0, duration: .5, stagger: 0.15 })

  let options = {
    threshold: 0.5
  };

  const io = new IntersectionObserver( (entries, observer) => {
    entries.forEach( entry => {
      if (entry.isIntersecting) {
        tl.play();
        observer.disconnect();
      }
    });
  }, options);
  io.POLL_INTERVAL = 100;
  io.observe(job);
}