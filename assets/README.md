# Portfolio — Joe Kimbuya Zola, PMP®

Site CV / portfolio statique (HTML, CSS, JS — aucun framework, aucune étape de build).

## Structure du projet

```
portfolio/
├── index.html          → Accueil
├── experience.html      → Expérience professionnelle
├── skills.html          → Compétences & certifications
├── contact.html         → Contact
├── api/
│   └── contact.js        → Route serverless (Vercel) : reçoit et envoie le formulaire
└── assets/
    ├── style.css
    ├── script.js
    ├── contact-form.js   → Envoie le formulaire vers /api/contact
    └── img/
        └── joe-portrait.png
```

## Backend du formulaire de contact

Le formulaire n'utilise plus `mailto:` — il envoie les données en JSON à la route serverless `api/contact.js`, qui les valide puis envoie un email via [Resend](https://resend.com) (gratuit, 3000 emails/mois).

**Configuration obligatoire avant que ça fonctionne :**

1. Créez un compte gratuit sur https://resend.com
2. Dans le tableau de bord Resend, allez dans **API Keys** → **Create API Key**, copiez la clé (elle commence par `re_`)
3. Sur Vercel, ouvrez votre projet → **Settings → Environment Variables**, ajoutez :
   | Nom | Valeur |
   |---|---|
   | `RESEND_API_KEY` | votre clé Resend (`re_...`) |
   | `CONTACT_EMAIL_TO` | `joe.kimbuya@outlook.com` (l'adresse qui reçoit les messages) |
4. Redéployez le projet (Vercel → **Deployments** → **Redeploy**), ou faites simplement un nouveau `git push`.

Par défaut, les emails partent de `onboarding@resend.dev` — ça fonctionne tel quel pour tester, mais Resend recommande de vérifier votre propre domaine (**Domains** dans leur dashboard) pour un envoi en production plus fiable et moins susceptible d'atterrir en spam. Une fois votre domaine vérifié, remplacez `onboarding@resend.dev` par une adresse `@votredomaine.com` dans `api/contact.js` (champ `from`).

**Anti-spam** : le formulaire contient un champ caché ("pot de miel") invisible pour un humain ; s'il est rempli, c'est qu'un robot a soumis le formulaire, et la route l'ignore silencieusement.

**Note sur les sessions** : ce formulaire n'utilise pas de sessions ni de cookies — elles ne sont utiles que pour de l'authentification (garder un utilisateur "connecté"). Si un jour vous ajoutez une zone privée (ex. un espace admin pour éditer le contenu du site), c'est à ce moment-là qu'il faudrait introduire des sessions (ou plus simple sur Vercel : un token JWT ou `next-auth`/`@vercel/kv` pour du rate-limiting par IP).

## Tester en local

Les fonctions `/api` ne fonctionnent pas avec un simple `python3 -m http.server` (elles nécessitent l'environnement serverless de Vercel). Pour tester en local avec la fonction de contact active :
```bash
npm i -g vercel
vercel dev
```
Puis créez un fichier `.env.local` à la racine avec :
```
RESEND_API_KEY=re_votre_cle
CONTACT_EMAIL_TO=joe.kimbuya@outlook.com
```

## Personnaliser avant publication

1. **Liens sociaux** — dans chaque page, remplacez les `href="#"` de LinkedIn, Facebook et Credly (barre latérale + page Contact) par vos vraies URLs.
2. **Formulaire de contact** — déjà branché sur une route serverless (`api/contact.js`) qui envoie un vrai email via Resend. Voir la section "Backend du formulaire de contact" ci-dessus pour la configuration des clés.
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
