// /api/contact.js
// Route serverless Vercel : traite le POST du formulaire de contact.
// Sur Vercel, tout fichier dans /api devient automatiquement une route :
// ce fichier répond aux requêtes envoyées à  https://votre-site.vercel.app/api/contact

// ---------------------------------------------------------------------------
// "Middleware" : petites fonctions de validation/protection réutilisables.
// Sur un serveur Express classique, un middleware s'insère dans la chaîne
// app.use(...). Ici, en serverless, le principe est le même : on isole des
// étapes (valider, filtrer le spam) qu'on appelle avant la logique métier.
// ---------------------------------------------------------------------------

function validateFields({ name, email, message }) {
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("L'adresse email est invalide.");
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères.');
  }
  if (message && message.length > 5000) {
    errors.push('Le message est trop long (5000 caractères maximum).');
  }

  return errors;
}

// Anti-spam "pot de miel" : un champ caché (nommé "company") que seuls les
// robots remplissent automatiquement — un humain ne le voit jamais dans le
// formulaire (voir assets/style.css → .hp-field). S'il est rempli, on fait
// semblant d'accepter sans rien envoyer, pour ne pas alerter le bot.
function isHoneypotTriggered(body) {
  return Boolean(body.company && body.company.trim() !== '');
}

// ---------------------------------------------------------------------------
// Handler principal (la "route")
// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const body = req.body || {};

  if (isHoneypotTriggered(body)) {
    return res.status(200).json({ ok: true });
  }

  const errors = validateFields(body);
  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const { name, email, message } = body;

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY manquante dans les variables d\'environnement Vercel.');
    return res.status(500).json({ error: "Le serveur n'est pas configuré pour l'envoi d'emails." });
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // "onboarding@resend.dev" fonctionne sans configuration mais uniquement
        // pour des tests. Pour la production, vérifiez votre propre domaine
        // sur resend.com/domains et remplacez cette adresse (voir README).
        from: 'Portfolio <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL_TO || 'joe.kimbuya@outlook.com',
        reply_to: email,
        subject: `Nouveau message de ${name} via le portfolio`,
        text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`
      })
    });

    if (!emailResponse.ok) {
      const detail = await emailResponse.text();
      console.error('Erreur Resend :', detail);
      return res.status(502).json({ error: "L'envoi de l'email a échoué." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur inattendue.' });
  }
}
