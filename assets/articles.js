// Rendu des pages Articles (liste + détail), à partir de assets/articles-data.js
document.addEventListener('DOMContentLoaded', () => {
  if (typeof ARTICLES === 'undefined') return;

  const categoryLabels = {
    recherche: 'Recherche',
    'etude-de-cas': 'Étude de cas',
    annonce: 'Annonce'
  };

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  // -----------------------------------------------------------------------
  // Page de liste (articles.html)
  // -----------------------------------------------------------------------
  const grid = document.getElementById('articles-grid');
  if (grid){
    const filterBar = document.getElementById('filter-bar');
    const emptyMsg = document.getElementById('articles-empty');

    const sorted = ARTICLES.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    function renderList(filter){
      grid.innerHTML = '';
      const items = filter === 'all' ? sorted : sorted.filter(a => a.category === filter);

      if (!items.length){
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
      }
      if (emptyMsg) emptyMsg.style.display = 'none';

      items.forEach((a, i) => {
        const card = document.createElement('article');
        card.className = 'article-card reveal-pending';
        card.style.animationDelay = (i * 0.08) + 's';
        card.innerHTML =
          '<span class="article-tag">' + escapeHtml(categoryLabels[a.category] || a.category) + '</span>' +
          '<span class="article-date">' + escapeHtml(a.dateLabel) + '</span>' +
          '<h3>' + escapeHtml(a.title) + '</h3>' +
          '<p class="article-excerpt">' + escapeHtml(a.excerpt) + '</p>' +
          '<a class="article-readmore" href="article.html?slug=' + encodeURIComponent(a.slug) + '">Lire l\u2019article &rarr;</a>';
        grid.appendChild(card);
      });

      const cards = grid.querySelectorAll('.article-card');
      if ('IntersectionObserver' in window){
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting){
              entry.target.classList.remove('reveal-pending');
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        cards.forEach(c => io.observe(c));
      } else {
        // Navigateur très ancien : on affiche directement, sans effet d'apparition
        cards.forEach(c => { c.classList.remove('reveal-pending'); c.classList.add('in-view'); });
      }
    }

    renderList('all');

    if (filterBar){
      filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList(btn.dataset.filter);
      });
    }
  }

  // -----------------------------------------------------------------------
  // Page de détail (article.html?slug=...)
  // -----------------------------------------------------------------------
  const detail = document.getElementById('article-detail');
  if (detail){
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const article = ARTICLES.find(a => a.slug === slug);

    if (!article){
      detail.innerHTML =
        '<a class="article-back" href="articles.html">&larr; Retour aux articles</a>' +
        '<p class="eyebrow">Article introuvable</p>' +
        '<h1 style="font-size:clamp(1.6rem,3vw,2.2rem);">Cet article n\u2019existe pas ou plus.</h1>';
      return;
    }

    document.title = article.title + ' — Joe Kimbuya Zola';

    const paragraphs = article.content.map(p => '<p>' + escapeHtml(p) + '</p>').join('');

    detail.innerHTML =
      '<a class="article-back" href="articles.html">&larr; Retour aux articles</a>' +
      '<p class="eyebrow">' + escapeHtml(categoryLabels[article.category] || article.category) + '</p>' +
      '<h1 style="font-size:clamp(1.7rem,3.2vw,2.5rem); margin-bottom:0.6rem;">' + escapeHtml(article.title) + '</h1>' +
      '<p class="article-detail-meta">' + escapeHtml(article.dateLabel) + ' · Joe Kimbuya Zola, PMP®</p>' +
      '<div class="article-detail-body">' + paragraphs + '</div>' +
      '<a class="article-back" href="articles.html" style="margin-top:1.5rem;">&larr; Retour aux articles</a>';
  }
});
