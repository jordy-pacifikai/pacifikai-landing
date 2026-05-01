const BREVO_KEY = process.env.BREVO_API_KEY;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://gwakatahiti.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS });
}

type Payload = {
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  date?: string;
  prestation?: string;
  personnes?: string;
  message?: string;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Payload;
    const { prenom, nom, email, telephone, date, prestation, personnes, message } = body;

    const required = { prenom, nom, email, telephone, date, prestation, personnes };
    for (const [field, value] of Object.entries(required)) {
      if (!value || !String(value).trim()) {
        return Response.json(
          { error: `${field} required` },
          { status: 400, headers: CORS_HEADERS },
        );
      }
    }

    if (!BREVO_KEY) {
      return Response.json(
        { error: "email service unavailable" },
        { status: 500, headers: CORS_HEADERS },
      );
    }

    const fullName = `${prenom!.trim()} ${nom!.trim()}`;
    const subject = `[GWAKA] Demande devis ${prestation} — ${fullName} (${personnes} pers.)`;
    const html = `
      <h2 style="color:#4A7C3F">Nouvelle demande de devis GWAKA</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Nom</b></td><td>${fullName}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td><b>Telephone</b></td><td><a href="tel:${telephone}">${telephone}</a></td></tr>
        <tr><td><b>Date evenement</b></td><td>${date}</td></tr>
        <tr><td><b>Type</b></td><td>${prestation}</td></tr>
        <tr><td><b>Nombre de personnes</b></td><td>${personnes}</td></tr>
      </table>
      ${message?.trim() ? `<h3>Message</h3><p style="white-space:pre-wrap">${message.trim().replace(/</g, "&lt;")}</p>` : ""}
      <hr>
      <p style="color:#888;font-size:12px">Envoye depuis gwakatahiti.com</p>
    `;

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "GWAKA", email: "contact@gwakatahiti.com" },
        to: [{ email: "jordy@pacifikai.com", name: "Jordy TEST" }],
        replyTo: { email: email!.trim(), name: fullName },
        subject,
        htmlContent: html,
      }),
    });

    if (!brevoRes.ok) {
      const err = await brevoRes.text();
      console.error("Brevo error:", brevoRes.status, err);
      return Response.json(
        { error: "email send failed" },
        { status: 502, headers: CORS_HEADERS },
      );
    }

    return Response.json({ success: true }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("gwaka-contact error:", error);
    return Response.json(
      { error: "internal error" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
