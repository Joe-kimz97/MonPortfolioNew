// Navigation mobile (sidebar tiroir)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.topbar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const scrim = document.querySelector('.scrim');

  function closeNav(){
    sidebar.classList.remove('open');
    scrim.classList.remove('show');
  }

  if (toggle && sidebar && scrim){
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      scrim.classList.toggle('show');
    });
    scrim.addEventListener('click', closeNav);
    sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }

  // Lien de navigation actif selon la page courante
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

  // Animation des chiffres clés (KPI) au défilement
  const kpis = document.querySelectorAll('.kpi-figure[data-target]');
  if (kpis.length){
    const animate = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 900;
      const start = performance.now();
      const isInt = Number.isInteger(target);

      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      el.textContent = prefix + '0' + suffix; // point de départ, seulement une fois le JS confirmé actif
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    kpis.forEach(el => io.observe(el));
  }
});
