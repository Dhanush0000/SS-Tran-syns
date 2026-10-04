// Default OS cursor in use

// Nav
const nav=document.getElementById('nav'),btop=document.getElementById('btop');
window.addEventListener('scroll',()=>{
  const stuck = scrollY>80;
  nav.classList.toggle('light-nav', stuck);
  btop.classList.toggle('on',scrollY>500);

});

// Burger
const burg=document.getElementById('burg'),mnav=document.getElementById('mnav');
burg.addEventListener('click',()=>mnav.classList.add('on'));
document.getElementById('mnav-x').addEventListener('click',()=>mnav.classList.remove('on'));
function cm(){mnav.classList.remove('on')}

// Reveal
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});

// Panel bars animate
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.querySelectorAll('.pr-fill').forEach(el=>{
      const w=el.style.width;el.style.width='0';
      setTimeout(()=>{el.style.width=w},200);
    });
  },700);
});

// ── Blog reader ──
function openBlog(idx) {
  // Hide all articles
  document.querySelectorAll('.blog-article').forEach(a => a.style.display = 'none');
  // Show the selected one
  const target = document.getElementById('blog-' + idx);
  if (target) target.style.display = 'block';
  // Show the resources section
  const sec = document.getElementById('resources');
  sec.style.display = 'block';
  // Smooth scroll to top of resources
  setTimeout(() => sec.scrollIntoView({behavior:'smooth', block:'start'}), 80);
  // Update URL hash without jumping
  history.pushState(null, '', '#resources');
}

function closeBlog() {
  document.getElementById('resources').style.display = 'none';
  history.pushState(null, '', '#blog');
  document.getElementById('blog').scrollIntoView({behavior:'smooth', block:'start'});
}

// Handle direct URL #resources access
if(window.location.hash === '#resources') {
  openBlog(0);
}

// Contact form
function handleFormSubmit(form){
  const btn=form.querySelector('.sub-btn');
  const status=form.querySelector('#form-status');
  btn.disabled=true;
  btn.textContent='Sending…';
  status.textContent='';
  return true; // Submit to contact.php on GoDaddy
}

// ── Legal modals ──
function openLegal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLegal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
// Close on overlay click (outside modal box)
document.querySelectorAll('.legal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLegal(overlay.id);
  });
});
// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.legal-overlay.open').forEach(o => closeLegal(o.id));
  }
});
