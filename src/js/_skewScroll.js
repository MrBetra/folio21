const items = document.querySelectorAll(".skew");
let currentPixel = window.pageYOffset

const skewAnim = function () {

  if (!items) return

  const newPixel = window.pageYOffset;
  const diff = newPixel - currentPixel
  const speed = diff * -0.35;


  items.forEach( item => {
    item.style.transform = "skewY(" + speed + "deg) rotateY(" + speed / 5 + "deg)" 
  })
  
  currentPixel = newPixel;
  
  requestAnimationFrame(skewAnim)
}

skewAnim();