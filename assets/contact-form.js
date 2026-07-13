// Soumission du formulaire de contact vers /api/contact (fonction serverless Vercel)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      company: form.company ? form.company.value : '' // champ piège, doit rester vide
    };

    if (submitBtn){
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
    }
    if (status){
      status.textContent = '';
      status.className = 'form-status';
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (res.ok) {
        if (status){
          status.textContent = 'Message envoyé avec succès. Merci, je vous répondrai rapidement.';
          status.classList.add('success');
        } else {
          alert('Message envoyé avec succès. Merci, je vous répondrai rapidement.');
        }
        form.reset();
      } else {
        const msg = result.error || "Une erreur est survenue. Merci de réessayer.";
        if (status){
          status.textContent = msg;
          status.classList.add('error');
        } else {
          alert(msg);
        }
      }
    } catch (err) {
      const msg = "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.";
      if (status){
        status.textContent = msg;
        status.classList.add('error');
      } else {
        alert(msg);
      }
    } finally {
      if (submitBtn){
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';
      }
    }
  });
});
