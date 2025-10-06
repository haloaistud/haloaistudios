import { initThree } from './three-init.js';

const threeControls = initThree('#canvas-3d');

const tabs = Array.from(document.querySelectorAll('.tab'));
const contents = Array.from(document.querySelectorAll('.content'));

tabs.forEach(tab => tab.addEventListener('click', ()=>{
  const target = tab.dataset.tab;
  tabs.forEach(t=>t.classList.toggle('active', t===tab));
  contents.forEach(c=>c.classList.toggle('active', c.id===target));
  tabs.forEach(t=>t.setAttribute('aria-current', t===tab ? 'true' : 'false'));
}));

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
  });
},{threshold:0.12});
reveals.forEach(el=>io.observe(el));

function typeCycle(el, phrases=[], delay=2400){
  if(!el || !phrases.length) return;
  let i=0, j=0, forward=true;
  function step(){
    const full = phrases[i];
    el.textContent = full.slice(0,j);
    if(forward){ j++; if(j>full.length){ forward=false; setTimeout(step, delay); return; }} else { j--; if(j<=0){ forward=true; i=(i+1)%phrases.length; }}
    setTimeout(step, forward?60:30);
  }
  step();
}
const sub = document.querySelector('.hero-subtitle');
if(sub){ const p = (sub.dataset.text||"").split(',').map(s=>s.trim()).filter(Boolean); typeCycle(sub,p); }

document.addEventListener('keydown', (e)=>{
  if(!['ArrowLeft','ArrowRight'].includes(e.key)) return;
  const activeIndex = tabs.findIndex(t=>t.classList.contains('active'));
  if(activeIndex === -1) return;
  let next = activeIndex;
  if(e.key==='ArrowLeft') next = Math.max(0, activeIndex-1);
  if(e.key==='ArrowRight') next = Math.min(tabs.length-1, activeIndex+1);
  tabs[next].click();
  tabs[next].focus();
});

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(prefersReduced){ document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view')); }

export default {};