# Portfolio — Joe Kimbuya Zola, PMP®

Site CV / portfolio statique (HTML, CSS, JS — aucun framework, aucune étape de build).

## Structure du projet

```
portfolio/
├── index.html          → Accueil
├── experience.html      → Expérience professionnelle
├── skills.html          → Compétences & certifications
├── contact.html         → Contact
└── assets/
    ├── style.css
    ├── script.js
    └── img/
        └── joe-portrait.png
```

## Personnaliser avant publication

1. **Liens sociaux** — dans chaque page, remplacez les `href="#"` de LinkedIn, Facebook et Credly (barre latérale + page Contact) par vos vraies URLs.
2. **Formulaire de contact** — le formulaire de `contact.html` ouvre actuellement le client mail (`mailto:`). Pour recevoir les messages directement sans que le visiteur ait un logiciel mail configuré, connectez-le à un service gratuit comme [Formspree](https://formspree.io) ou [EmailJS](https://www.emailjs.com) : il suffit de changer l'attribut `action` du `<form>`.
3. **Couleurs** — les couleurs sont centralisées en haut de `assets/style.css` (variables `--forest`, `--gold`, `--cream`, etc.) si vous voulez ajuster la palette.
4. **Photo** — pour la remplacer, déposez votre image dans `assets/img/` et mettez à jour les balises `<img src="...">`.

## Héberger le code sur GitHub

1. Créez un compte GitHub si vous n'en avez pas : https://github.com/signup
2. Créez un nouveau dépôt (bouton **New repository**), nommez-le par exemple `portfolio` — laissez-le vide (sans README).
3. Sur votre ordinateur, dans le dossier `portfolio/` :
   ```bash
   git init
   git add .
   git commit -m "Premier commit : portfolio"
   git branch -M main
   git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/portfolio.git
   git push -u origin main
   ```
   (Remplacez `VOTRE-NOM-UTILISATEUR` par votre identifiant GitHub. GitHub vous demandera de vous authentifier — utilisez un [token d'accès personnel](https://github.com/settings/tokens) si le mot de passe est refusé.)

   *Alternative sans ligne de commande* : sur la page du dépôt vide, cliquez sur **uploading an existing file** et glissez-déposez tous les fichiers/dossiers.

## Déployer sur Vercel

1. Créez un compte sur https://vercel.com (vous pouvez vous connecter directement avec votre compte GitHub).
2. Cliquez sur **Add New... → Project**.
3. Sélectionnez le dépôt `portfolio` que vous venez de créer.
4. Vercel détecte un site statique automatiquement — aucune configuration nécessaire (laissez "Framework Preset" sur **Other**, "Build Command" et "Output Directory" vides).
5. Cliquez sur **Deploy**. Après quelques secondes, votre site est en ligne sur une adresse du type `portfolio-votrenom.vercel.app`.
6. À chaque `git push` sur `main`, Vercel redéploie automatiquement le site.

Vous pouvez aussi ajouter un nom de domaine personnalisé depuis l'onglet **Domains** du projet Vercel.

## Aperçu en local

Ouvrez simplement `index.html` dans un navigateur, ou lancez un petit serveur local :
```bash
python3 -m http.server 8000
```
puis ouvrez `http://localhost:8000`.
