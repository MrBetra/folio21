// Source : https://codepen.io/ReGGae/pen/NXqjpo
// Author : Jesper Landberg
// ------------------------

import gsap from 'gsap';

const canvas = document.querySelector('.js-canvas')
const ctx = canvas.getContext('2d')

let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight

let mouseX = width / 2;
let mouseY = height / 2;

let circle = {
  radius: 13,
  lastX: mouseX,
  lastY: mouseY
}

const elems = [...document.querySelectorAll('[data-hover]')]

function onResize () {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
}

function render () {
  circle.lastX = lerp(circle.lastX, mouseX, 0.25)
  circle.lastY = lerp(circle.lastY, mouseY, 0.25)
  
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = "#1436f7"
  ctx.fill()
  ctx.closePath()
  
  requestAnimationFrame(render)
}

function init () {

  if (window.innerWidth < 800) return;

  requestAnimationFrame(render)
  
  window.addEventListener('mousemove', function(e) {
    mouseX = e.pageX - window.scrollX;
    mouseY = e.pageY - window.scrollY;
  })

  window.addEventListener('resize', onResize, false)
  
  let tl = gsap.timeline({ paused: true })
  tl.to(circle, {
    radius: circle.radius * 3.5,
    ease: "power4.inOut",
    duration: 0.5
  })
  
  elems.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      tl.play()
    }, false)
    el.addEventListener('mouseleave', () => {
      tl.reverse()
    }, false)
  })
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

init()