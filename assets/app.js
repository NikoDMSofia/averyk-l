
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


// Private visit counter: authenticated Avery is recorded as Avery; all other public visitors as Guest.
// Niki's own authenticated visits are ignored by the backend.
(async()=>{
  if(!window.supabase) return;
  const VISIT_SB_URL="https://rmwivkbsyelztrllxoed.supabase.co";
  const VISIT_SB_KEY="sb_publishable_8wESBdceigGNxLODM5jT_w_dLF8eUo9";
  const visitSb=window.supabase.createClient(VISIT_SB_URL,VISIT_SB_KEY);
  let browserId=localStorage.getItem("our_site_browser_id");
  if(!browserId){
    browserId=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
    localStorage.setItem("our_site_browser_id",browserId);
  }
  try{
    await visitSb.rpc("log_site_visit",{
      p_page_path:location.pathname.split("/").pop()||"index.html",
      p_page_title:document.title||"",
      p_browser_id:browserId
    });
  }catch(_e){}
})();
