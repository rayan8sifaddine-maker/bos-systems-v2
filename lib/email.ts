import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM = 'BOS Systems <noreply@bossystems.ma>'

function formatDateFr(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
function formatTimeFr(date: Date | string) {
  return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const baseStyle = `
  font-family: Inter, system-ui, sans-serif;
  background: #F7F8FA;
  padding: 32px 16px;
`
function emailWrapper(content: string) {
  return `
    <div style="${baseStyle}">
      <div style="max-width:520px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(12,14,18,0.08);">
        <div style="background:linear-gradient(135deg,#0C0E12,#141A30);padding:24px 32px;display:flex;align-items:center;gap:12px;">
          <div style="width:32px;height:32px;background:rgba(255,255,255,0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;color:white;letter-spacing:1px;">B</div>
          <span style="color:white;font-weight:700;font-size:14px;letter-spacing:0.05em;">BOS SYSTEMS</span>
        </div>
        <div style="padding:32px;">
          ${content}
        </div>
        <div style="padding:16px 32px;border-top:1px solid #F0F2F5;text-align:center;">
          <p style="font-size:11px;color:#B0B5C3;margin:0;">© 2026 BOS Systems · Casablanca, Maroc</p>
        </div>
      </div>
    </div>
  `
}

export async function sendAppointmentConfirmation(opts: {
  to: string
  patientName: string
  clinicName: string
  datetime: Date | string
  type: string
}) {
  if (!resend) return
  const date = formatDateFr(opts.datetime)
  const time = formatTimeFr(opts.datetime)
  await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `Confirmation de votre rendez-vous — ${opts.clinicName}`,
    html: emailWrapper(`
      <h2 style="font-size:20px;font-weight:700;color:#0C0E12;margin:0 0 8px;">Votre rendez-vous est confirmé ✓</h2>
      <p style="font-size:14px;color:#7A7F8E;margin:0 0 24px;">Bonjour ${opts.patientName},</p>
      <div style="background:#F7F8FA;border-radius:12px;padding:20px;margin:0 0 24px;">
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <span style="font-size:12px;color:#7A7F8E;width:80px;">Établissement</span>
          <span style="font-size:14px;font-weight:600;color:#0C0E12;">${opts.clinicName}</span>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <span style="font-size:12px;color:#7A7F8E;width:80px;">Date</span>
          <span style="font-size:14px;font-weight:600;color:#0C0E12;">${date}</span>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <span style="font-size:12px;color:#7A7F8E;width:80px;">Heure</span>
          <span style="font-size:14px;font-weight:600;color:#0C0E12;">${time}</span>
        </div>
        <div style="display:flex;gap:12px;">
          <span style="font-size:12px;color:#7A7F8E;width:80px;">Type</span>
          <span style="font-size:14px;font-weight:600;color:#0C0E12;">${opts.type}</span>
        </div>
      </div>
      <p style="font-size:13px;color:#7A7F8E;margin:0;">Un rappel vous sera envoyé 24h avant votre rendez-vous.</p>
    `),
  })
}

export async function sendAppointmentReminder(opts: {
  to: string
  patientName: string
  clinicName: string
  datetime: Date | string
  type: string
  hoursBeforeLabel: string
}) {
  if (!resend) return
  const date = formatDateFr(opts.datetime)
  const time = formatTimeFr(opts.datetime)
  await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `Rappel — Votre rendez-vous ${opts.hoursBeforeLabel} chez ${opts.clinicName}`,
    html: emailWrapper(`
      <h2 style="font-size:20px;font-weight:700;color:#0C0E12;margin:0 0 8px;">Rappel de rendez-vous ⏰</h2>
      <p style="font-size:14px;color:#7A7F8E;margin:0 0 24px;">Bonjour ${opts.patientName}, votre rendez-vous est ${opts.hoursBeforeLabel}.</p>
      <div style="background:#EEF2FF;border-radius:12px;padding:20px;margin:0 0 24px;border-left:3px solid #1A56FF;">
        <div style="font-size:14px;font-weight:700;color:#0C0E12;margin-bottom:4px;">${opts.clinicName}</div>
        <div style="font-size:13px;color:#3A3D45;">${date} à ${time} · ${opts.type}</div>
      </div>
      <p style="font-size:13px;color:#7A7F8E;margin:0;">Pour annuler ou modifier, contactez-nous directement.</p>
    `),
  })
}

export async function sendTeamInvitation(opts: {
  to: string
  name: string
  invitedBy: string
  clinicName: string
  role: string
}) {
  if (!resend) return
  const roleLabels: Record<string, string> = { ADMIN: 'Administrateur', MANAGER: 'Manager', AGENT: 'Agent', VIEWER: 'Lecteur' }
  await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `Invitation à rejoindre ${opts.clinicName} sur BOS Systems`,
    html: emailWrapper(`
      <h2 style="font-size:20px;font-weight:700;color:#0C0E12;margin:0 0 8px;">Vous êtes invité(e) !</h2>
      <p style="font-size:14px;color:#7A7F8E;margin:0 0 24px;">
        Bonjour ${opts.name},<br><br>
        <strong>${opts.invitedBy}</strong> vous invite à rejoindre l'espace <strong>${opts.clinicName}</strong> sur BOS Systems en tant que <strong>${roleLabels[opts.role] ?? opts.role}</strong>.
      </p>
      <a href="https://app.bossystems.ma/connexion" style="display:inline-block;background:linear-gradient(135deg,#1A56FF,#7C3AED);color:white;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;margin:0 0 24px;">
        Accéder à mon espace →
      </a>
      <p style="font-size:12px;color:#B0B5C3;margin:0;">Si vous n'attendiez pas cet email, vous pouvez l'ignorer.</p>
    `),
  })
}

export async function sendWelcomeEmail(opts: {
  to: string
  clinicName: string
  plan: string
}) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `Bienvenue sur BOS Systems, ${opts.clinicName} !`,
    html: emailWrapper(`
      <h2 style="font-size:20px;font-weight:700;color:#0C0E12;margin:0 0 8px;">Bienvenue sur BOS Systems 🎉</h2>
      <p style="font-size:14px;color:#7A7F8E;margin:0 0 24px;">
        Votre espace <strong>${opts.clinicName}</strong> est prêt. Plan <strong>${opts.plan}</strong> activé.
      </p>
      <div style="background:#F7F8FA;border-radius:12px;padding:20px;margin:0 0 24px;">
        <p style="font-size:13px;color:#3A3D45;margin:0 0 12px;font-weight:600;">Par où commencer :</p>
        <div style="margin-bottom:8px;font-size:13px;color:#3A3D45;">→ Configurez votre assistant IA avec vos horaires et services</div>
        <div style="margin-bottom:8px;font-size:13px;color:#3A3D45;">→ Importez vos clients existants dans le CRM</div>
        <div style="font-size:13px;color:#3A3D45;">→ Activez les automatisations de rappels</div>
      </div>
      <a href="https://app.bossystems.ma/dashboard" style="display:inline-block;background:#0C0E12;color:white;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
        Accéder à mon dashboard →
      </a>
    `),
  })
}
