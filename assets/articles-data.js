// ============================================================================
// DONNÉES DES ARTICLES
// ============================================================================
// Pour publier un nouvel article, copiez un bloc { ... } ci-dessous,
// collez-le dans le tableau ARTICLES (juste après "ARTICLES = [") et modifiez
// les champs. Aucune autre modification n'est nécessaire : la page
// articles.html et les pages de détail se mettent à jour automatiquement.
//
// Champs :
//   slug        → identifiant unique dans l'URL, sans espaces ni accents
//                 (ex: "mon-nouvel-article"). Utilisé dans le lien
//                 article.html?slug=mon-nouvel-article
//   title       → titre affiché
//   category    → une des 3 valeurs : "recherche", "etude-de-cas", "annonce"
//   date        → format AAAA-MM-JJ (sert uniquement à trier, du plus récent
//                 au plus ancien)
//   dateLabel   → date affichée telle quelle (ex: "15 juin 2026")
//   excerpt     → résumé court affiché sur la page de liste (1-2 phrases)
//   content     → le corps de l'article : un tableau de paragraphes.
//                 Chaque élément entre guillemets = un paragraphe.
//                 Ajoutez ou retirez des lignes librement.
// ============================================================================

const ARTICLES = [
  {
    slug: "gouvernance-it-secteur-bancaire-rdc",
    title: "Gouvernance IT dans le secteur bancaire : retour d'expérience terrain en RD Congo",
    category: "recherche",
    date: "2026-06-20",
    dateLabel: "20 juin 2026",
    excerpt: "Comment aligner disponibilité des systèmes critiques, gestion des risques IT et continuité de service dans un contexte bancaire à haute exigence opérationnelle.",
    content: [
      "Dans le cadre de mes missions de conseil auprès d'institutions bancaires en République Démocratique du Congo, j'ai été amené à observer de près les défis spécifiques que pose la gouvernance des systèmes d'information dans un environnement à haute criticité opérationnelle : disponibilité des guichets automatiques, continuité des solutions de gestion des flux clients, et résilience des infrastructures réseau.",
      "Un constat revient systématiquement : la performance des systèmes ne dépend pas uniquement de la robustesse technique des équipements, mais surtout de la qualité des processus de gouvernance qui les entourent — supervision proactive, gestion structurée des incidents, et boucles de retour d'expérience courtes entre les équipes techniques et les métiers.",
      "Sur les missions menées pour Ecobank RDC et Access Bank RDC, la mise en place d'un suivi rigoureux des indicateurs de disponibilité, combinée à une analyse systématique des causes racines des incidents récurrents, a permis de maintenir un taux de disponibilité supérieur à 99,8 % sur les solutions critiques, tout en réduisant de 30 % le volume d'incidents récurrents.",
      "Ces résultats confirment une conviction que je défends dans chacune de mes missions de conseil : la gouvernance IT n'est pas un exercice de conformité administrative, mais un véritable levier de performance opérationnelle et de création de valeur pour l'organisation."
    ]
  },
  {
    slug: "digitalisation-parcours-patient-etude-de-cas",
    title: "Étude de cas — Digitalisation du parcours patient : le projet Cliniques Promedis",
    category: "etude-de-cas",
    date: "2026-01-10",
    dateLabel: "10 janvier 2026",
    excerpt: "Retour sur un projet de digitalisation de la prise de rendez-vous médicaux mené sur un réseau de 7 établissements de santé, et les enseignements clés pour des projets similaires.",
    content: [
      "Le projet de transformation digitale du parcours patient mené avec les Cliniques Promedis entre février et décembre 2024 visait un objectif clair : simplifier et fiabiliser la prise de rendez-vous médicaux sur un réseau de plus de 7 établissements de santé, tout en améliorant l'expérience des patients comme celle des équipes soignantes.",
      "La démarche a débuté par une analyse fonctionnelle complète, formalisée dans un cahier des charges de plus de 20 pages, puis par l'animation de plus de 12 ateliers métiers réunissant équipes médicales, techniques et administratives — une étape que je considère non négociable pour tout projet de digitalisation dans le secteur de la santé, où l'adhésion du personnel soignant conditionne directement le succès du déploiement.",
      "La gestion du backlog (plus de 80 User Stories) et le suivi de 10 indicateurs clés de performance ont permis de garder le cap sur les objectifs métiers tout au long du projet, tandis que la formation de plus de 25 utilisateurs et un accompagnement au changement structuré ont assuré une adoption complète de la solution.",
      "Résultat : une réduction de 40 % du temps de traitement des rendez-vous et une adoption de la solution par 100 % des utilisateurs ciblés. Le principal enseignement de ce projet reste la place centrale de la conduite du changement : la meilleure solution technique ne vaut que par l'adhésion réelle de ceux qui l'utilisent au quotidien."
    ]
  },
  {
    slug: "annonce-preparation-pmi-acp",
    title: "Annonce — Préparation à la certification PMI-ACP®",
    category: "annonce",
    date: "2026-07-05",
    dateLabel: "5 juillet 2026",
    excerpt: "Je poursuis actuellement ma préparation à la certification PMI-ACP® (Agile Certified Practitioner) du Project Management Institute, avec un examen déjà planifié.",
    content: [
      "Je suis heureux d'annoncer que je poursuis actuellement ma préparation à la certification PMI-ACP® (Agile Certified Practitioner), délivrée par le Project Management Institute, avec un examen déjà planifié dans les prochains mois.",
      "Cette certification vient renforcer mes compétences en gestion de projet agile, en complément de ma certification PMP® déjà obtenue, et s'inscrit dans une démarche continue de montée en compétences que je mène en parallèle de mes missions de conseil en transformation digitale.",
      "Je partagerai naturellement une mise à jour sur cette page une fois la certification obtenue."
    ]
  }
];
