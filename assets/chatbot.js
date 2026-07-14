/* ==========================================================================
   KZ IA — Assistant virtuel du portfolio de Joe Kimbuya Zola
   Widget de chat flottant, 100% client (aucun serveur requis).
   Répond par correspondance de mots-clés à partir d'une base de
   connaissances éditable ci-dessous (voir KZ_IA_KB).
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1) BASE DE CONNAISSANCES
     Pour enrichir les réponses du bot, ajoutez des entrées ici :
     { keywords: [...mots-clés en minuscules, sans accents...], reply: "..." }
     La première entrée dont un mot-clé est trouvé dans la question
     du visiteur est utilisée. L'ordre compte : mettez les plus
     spécifiques en premier.
     ------------------------------------------------------------------ */
  var KB = [
    {
      keywords: ['bonjour', 'salut', 'hello', 'bonsoir', 'coucou'],
      reply: "Bonjour 👋 Je suis KZ IA, l'assistant virtuel de Joe Kimbuya Zola. Vous pouvez me poser des questions sur son expérience, ses compétences, ses certifications ou comment le contacter."
    },
    {
      keywords: ['merci', 'super', 'parfait', 'top'],
      reply: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions, ou consultez la page Contact pour joindre Joe directement."
    },
    {
      keywords: ['qui es tu', 'qui est tu', 'tu es qui', 'c est quoi kz ia', 'qu est ce que kz ia'],
      reply: "Je suis KZ IA, l'assistant virtuel du portfolio de Joe Kimbuya Zola. Je peux répondre à des questions simples sur son profil, mais pour toute demande précise, le mieux reste de le contacter directement."
    },
    {
      keywords: ['qui est joe', 'qui est-il', 'presente', 'presentation', 'profil', 'a propos', 'biographie'],
      reply: "Joe Kimbuya Zola est un Project Management Professional (PMP®) basé à Kinshasa, RD Congo. Il accompagne les organisations dans la conduite de projets de transformation numérique, de la gouvernance IT au déploiement opérationnel, avec des réalisations dans la santé, la finance et les ONG."
    },
    {
      keywords: ['pmp', 'certification', 'certifications', 'capm', 'itil', 'acp', 'credly', 'diplome', 'diplomes'],
      reply: "Joe est certifié PMP® et CAPM® par le PMI®, ainsi que Google Project Management, AWS Cloud Practitioner et AWS Well-Architected. Il prépare actuellement le PMI-ACP® et l'ITIL® 5. Tous les badges sont vérifiables sur son profil Credly (lien dans le menu)."
    },
    {
      keywords: ['experience', 'parcours', 'carriere', 'projet', 'projets', 'realisation', 'realisations'],
      reply: "Parmi ses projets clés : la modernisation IT du bâtiment Paul Panda Farnana (10+ services, 200+ équipements), la digitalisation du parcours patient pour les Cliniques Promedis (7 établissements, -40% de temps de traitement) et une plateforme digitale pour Save Life in Africa. Voir la page Expérience pour le détail complet."
    },
    {
      keywords: ['competence', 'competences', 'skill', 'skills', 'expertise', 'savoir faire', 'maitrise'],
      reply: "Ses domaines d'expertise couvrent la gestion de projet, la gouvernance IT, les infrastructures et le support informatique, le cloud (AWS, Google Cloud) ainsi que l'optimisation des processus métier. Voir la page Compétences pour la liste détaillée."
    },
    {
      keywords: ['article', 'articles', 'blog', 'publication'],
      reply: "Joe partage régulièrement des articles sur la gestion de projet et la transformation digitale. Vous les trouverez dans la section Articles du menu."
    },
    {
      keywords: ['contact', 'contacter', 'joindre', 'email', 'mail', 'e-mail', 'telephone', 'numero', 'appel'],
      reply: "Vous pouvez contacter Joe par email à joe.kimbuya@outlook.com ou par téléphone au +243 825 288 332. Un formulaire est aussi disponible sur la page Contact."
    },
    {
      keywords: ['disponible', 'disponibilite', 'dispo', 'mission', 'freelance', 'embauche', 'recrutement'],
      reply: "Joe est disponible immédiatement et mobile pour des missions en dehors de Kinshasa. Le mieux est de lui écrire via la page Contact pour discuter de vos besoins."
    },
    {
      keywords: ['ou', 'localisation', 'kinshasa', 'adresse', 'pays', 'ville', 'base'],
      reply: "Joe est basé à Kinshasa, en République Démocratique du Congo."
    },
    {
      keywords: ['tarif', 'tarifs', 'prix', 'cout', 'couts', 'budget', 'devis'],
      reply: "Les tarifs dépendent de la nature et de la durée de la mission. Le plus simple est de décrire votre besoin via la page Contact — Joe vous répondra avec une proposition adaptée."
    },
    {
      keywords: ['linkedin', 'reseau', 'reseaux', 'facebook'],
      reply: "Retrouvez Joe sur LinkedIn et Credly — les liens sont disponibles dans le menu latéral et sur la page Contact."
    }
  ];

  var FALLBACK_REPLIES = [
    "Je n'ai pas encore de réponse précise à ce sujet. Le mieux est de contacter Joe directement via la page Contact — il vous répondra rapidement.",
    "Je ne suis pas sûr de bien comprendre votre question. Vous pouvez me demander son expérience, ses compétences, ses certifications, sa disponibilité ou comment le contacter."
  ];

  /* ------------------------------------------------------------------
     2) Normalisation et recherche de mots-clés
     ------------------------------------------------------------------ */
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // retire les accents
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findReply(userText) {
    var norm = ' ' + normalize(userText) + ' ';
    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        if (norm.indexOf(' ' + entry.keywords[j] + ' ') !== -1) {
          return entry.reply;
        }
      }
    }
    return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
  }

  /* ------------------------------------------------------------------
     3) Construction du widget (injecté dans toutes les pages)
     ------------------------------------------------------------------ */
  function buildWidget() {
    var wrap = document.createElement('div');
    wrap.className = 'kzia-widget';
    wrap.innerHTML =
      '<button class="kzia-fab" id="kzia-fab" aria-expanded="false" aria-controls="kzia-panel" aria-label="Ouvrir l\'assistant KZ IA">' +
        '<span class="kzia-fab-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
        '</span>' +
        '<span class="kzia-fab-label">KZ IA</span>' +
      '</button>' +
      '<div class="kzia-panel" id="kzia-panel" role="dialog" aria-modal="false" aria-labelledby="kzia-title" hidden>' +
        '<div class="kzia-header">' +
          '<div class="kzia-header-id">' +
            '<span class="kzia-avatar">KZ</span>' +
            '<div>' +
              '<p class="kzia-title" id="kzia-title">KZ IA</p>' +
              '<p class="kzia-subtitle">Assistant virtuel · Joe Kimbuya Zola</p>' +
            '</div>' +
          '</div>' +
          '<button class="kzia-close" id="kzia-close" aria-label="Fermer l\'assistant">✕</button>' +
        '</div>' +
        '<div class="kzia-messages" id="kzia-messages" role="log" aria-live="polite"></div>' +
        '<form class="kzia-inputbar" id="kzia-form">' +
          '<input type="text" id="kzia-input" class="kzia-input" placeholder="Écrivez votre question…" autocomplete="off" aria-label="Votre message">' +
          '<button type="submit" class="kzia-send" aria-label="Envoyer">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>' +
          '</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(wrap);

    var fab = wrap.querySelector('#kzia-fab');
    var panel = wrap.querySelector('#kzia-panel');
    var closeBtn = wrap.querySelector('#kzia-close');
    var form = wrap.querySelector('#kzia-form');
    var input = wrap.querySelector('#kzia-input');
    var messages = wrap.querySelector('#kzia-messages');
    var opened = false;
    var greeted = false;

    function addMessage(text, who) {
      var row = document.createElement('div');
      row.className = 'kzia-msg kzia-msg-' + who;
      var bubble = document.createElement('div');
      bubble.className = 'kzia-bubble';
      bubble.textContent = text;
      row.appendChild(bubble);
      messages.appendChild(row);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping(callback) {
      var row = document.createElement('div');
      row.className = 'kzia-msg kzia-msg-bot kzia-typing-row';
      row.innerHTML = '<div class="kzia-bubble kzia-typing"><span></span><span></span><span></span></div>';
      messages.appendChild(row);
      messages.scrollTop = messages.scrollHeight;
      setTimeout(function () {
        row.remove();
        callback();
      }, 500 + Math.random() * 400);
    }

    function openPanel() {
      panel.hidden = false;
      fab.setAttribute('aria-expanded', 'true');
      opened = true;
      if (!greeted) {
        greeted = true;
        showTyping(function () {
          addMessage("Bonjour 👋 Je suis KZ IA, l'assistant virtuel de Joe Kimbuya Zola. Posez-moi une question sur son expérience, ses compétences, ses certifications ou pour le contacter.", 'bot');
        });
      }
      setTimeout(function () { input.focus(); }, 50);
    }

    function closePanel() {
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
      opened = false;
    }

    fab.addEventListener('click', function () {
      if (opened) { closePanel(); } else { openPanel(); }
    });
    closeBtn.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && opened) closePanel();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      var reply = findReply(text);
      showTyping(function () { addMessage(reply, 'bot'); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
