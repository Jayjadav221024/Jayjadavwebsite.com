// script.js
const card = document.getElementById('convCard');

let bounds = card.getBoundingClientRect();

function update(e){
  const x = (e.clientX - bounds.left) / bounds.width;   // 0..1
  const y = (e.clientY - bounds.top) / bounds.height;    // 0..1

  // Map to tilt range
  const tiltX = (y - 0.5) * -12; // rotateX
  const tiltY = (x - 0.5) * 12;  // rotateY

  card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  card.style.setProperty('--mx', `${x*100}%`);
  card.style.setProperty('--my', `${y*100}%`);
}

function reset(){
  card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
}

window.addEventListener('resize', ()=>{ bounds = card.getBoundingClientRect(); });

card.addEventListener('mousemove', update);
card.addEventListener('mouseleave', reset);
card.addEventListener('touchmove', (e)=>{
  const t = e.touches[0];
  update({ clientX: t.clientX, clientY: t.clientY });
}, {passive:true});
card.addEventListener('touchend', reset);
