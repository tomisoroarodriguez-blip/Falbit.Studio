import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

// Endpoint de recepción. NO envía nada por sí mismo: reenvía a CONTACT_WEBHOOK_URL (servicio propio del cliente)
// y, mientras esa variable no exista, responde 503 para que la interfaz no simule un envío que no ocurrió.
export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > 12_000) return NextResponse.json({ error: "too_large" }, { status: 413 });

  let body: Partial<ContactInput> & { web?: string };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  // Campo trampa para bots: si viene completo, se ignora en silencio.
  if (body.web) return NextResponse.json({ ok: true });

  const data: ContactInput = {
    nombre: String(body.nombre ?? ""),
    empresa: String(body.empresa ?? ""),
    correo: String(body.correo ?? ""),
    tipo: String(body.tipo ?? ""),
    descripcion: String(body.descripcion ?? ""),
  };
  const errors = validateContact(data);
  if (Object.keys(errors).length) return NextResponse.json({ error: "invalid", errors }, { status: 422 });

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, origen: "falbit-web", fecha: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
