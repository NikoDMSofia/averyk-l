
const menu=document.querySelector('.menu'), nav=document.querySelector('.navlinks');
if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  const p=max>0?scrollY/max*100:0;
  const el=document.querySelector('.progress'); if(el) el.style.width=p+'%';
},{passive:true});
const lb=document.querySelector('.lightbox'), lbImg=lb?.querySelector('img');
document.querySelectorAll('.memory img').forEach(img=>img.addEventListener('click',()=>{lbImg.src=img.src;lb.classList.add('open')}));
lb?.addEventListener('click',e=>{if(e.target===lb||e.target.tagName==='BUTTON')lb.classList.remove('open')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb?.classList.remove('open')});
