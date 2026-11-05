"use client";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  buildMessage,
  emptyContact,
  mailtoUrl,
  projectTypes,
  validateContact,
  whatsappUrl,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const field =
  "min-h-12 w-full rounded-xl border bg-carbon px-4 text-base text-ivory placeholder:text-ivory-dim/80 transition-colors focus:border-champagne focus:outline-none aria-[invalid=true]:border-red-400";

export function ContactForm() {
  const uid = useId();
  const params = useSearchParams();
  const [values, setValues] = useState<ContactInput>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Preselecciona el tipo de proyecto cuando se llega desde una tarjeta de servicio (?servicio=...).
  const servicio = params.get("servicio");
  useEffect(() => {
    if (servicio && projectTypes.some((t) => t.value === servicio)) setValues((v) => ({ ...v, tipo: servicio }));
  }, [servicio]);

  const set = (k: keyof ContactInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validateContact(next));
  };
  const blur = (k: keyof ContactInput) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateContact(values));
  };

  useEffect(() => {
    if (status !== "idle" && status !== "sending") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ nombre: true, correo: true, tipo: true, descripcion: true, empresa: true });
    const first = (Object.keys(errs) as (keyof ContactInput)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const web = (formRef.current?.elements.namedItem("web") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, web }),
      });
      if (res.ok) setStatus("sent");
      else if (res.status === 503) setStatus("unavailable");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const message = buildMessage(values);
  const wa = whatsappUrl(message);
  const mail = mailtoUrl("Consulta desde la web de FALBIT", message);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-3xl border border-champagne/40 bg-champagne/5 p-8 outline-none sm:p-10">
        <h3 className="text-2xl font-semibold">¡Mensaje recibido!</h3>
        <p className="mt-3 text-ivory-dim">Gracias, {values.nombre.trim()}. Te vamos a responder al correo {values.correo.trim()}.</p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyContact);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
          className="mt-6 min-h-11 rounded-full border border-champagne/50 px-6 text-sm font-semibold hover:bg-champagne hover:text-carbon"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-3xl border border-graphite bg-[#101010] p-8 outline-none sm:p-10">
        <h3 className="text-2xl font-semibold">Todavía no podemos recibir mensajes desde acá</h3>
        <p className="mt-3 text-ivory-dim">
          El envío directo del formulario aún no está activado, por eso <strong className="text-ivory">tu mensaje no fue enviado</strong>. Dejamos tu consulta lista para que la mandes por otro medio:
        </p>
        <label htmlFor={`${uid}-msg`} className="mt-6 block text-sm text-ivory-dim">
          Tu mensaje
        </label>
        <textarea id={`${uid}-msg`} readOnly value={message} rows={8} className={`${field} mt-1 border-graphite py-3`} />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={copy} className="min-h-12 rounded-full bg-champagne px-6 text-sm font-semibold text-carbon hover:bg-champagne-soft">
            {copied ? "¡Copiado!" : "Copiar mensaje"}
          </button>
          {mail && (
            <a href={mail} className="inline-flex min-h-12 items-center justify-center rounded-full border border-champagne/50 px-6 text-sm font-semibold hover:bg-champagne/10">
              Abrir en mi correo
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-champagne/50 px-6 text-sm font-semibold hover:bg-champagne/10">
              Enviar por WhatsApp
            </a>
          )}
          <button type="button" onClick={() => setStatus("idle")} className="min-h-12 rounded-full px-6 text-sm text-ivory-dim hover:text-ivory">
            Volver al formulario
          </button>
        </div>
        {!mail && !wa && <p className="mt-4 text-sm text-ivory-dim">Aún no hay correo ni WhatsApp configurados: copiá el mensaje y enviarlo por el medio que prefieras.</p>}
      </div>
    );
  }

  const err = (k: keyof ContactInput) => (touched[k] ? errors[k] : undefined);
  const a11y = (k: keyof ContactInput) => ({
    "aria-invalid": err(k) ? true : undefined,
    "aria-describedby": err(k) ? `${uid}-${k}-err` : undefined,
    onBlur: blur(k),
    onChange: set(k),
    name: k,
    id: `${uid}-${k}`,
    value: values[k],
  });
  const Err = ({ k }: { k: keyof ContactInput }) =>
    err(k) ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm text-red-300">
        {err(k)}
      </p>
    ) : null;
  const Label = ({ k, children, optional }: { k: keyof ContactInput; children: string; optional?: boolean }) => (
    <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-sm font-medium">
      {children} {optional && <span className="font-normal text-ivory-dim">(opcional)</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-3xl border border-graphite bg-[#101010] p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label k="nombre">Nombre</Label>
          <input {...a11y("nombre")} autoComplete="name" className={`${field} border-graphite`} />
          <Err k="nombre" />
        </div>
        <div>
          <Label k="empresa" optional>Empresa</Label>
          <input {...a11y("empresa")} autoComplete="organization" className={`${field} border-graphite`} />
        </div>
        <div>
          <Label k="correo">Correo electrónico</Label>
          <input {...a11y("correo")} type="email" autoComplete="email" inputMode="email" className={`${field} border-graphite`} />
          <Err k="correo" />
        </div>
        <div>
          <Label k="tipo">Tipo de proyecto</Label>
          <select {...a11y("tipo")} className={`${field} border-graphite`}>
            <option value="">Elegí una opción</option>
            {projectTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <Err k="tipo" />
        </div>
        <div className="sm:col-span-2">
          <Label k="descripcion">Descripción del proyecto</Label>
          <textarea {...a11y("descripcion")} rows={5} className={`${field} border-graphite py-3`} placeholder="¿Qué necesitás, para quién y para cuándo?" />
          <Err k="descripcion" />
        </div>
      </div>

      {/* Campo trampa anti-bots: invisible para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No completar
          <input name="web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 rounded-full bg-champagne px-8 text-sm font-semibold text-carbon transition-colors hover:bg-champagne-soft disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar consulta"}
        </button>
        <p className="text-xs leading-relaxed text-ivory-dim">Usamos tus datos solo para responder esta consulta.</p>
      </div>

      <div aria-live="polite" ref={statusRef} tabIndex={-1} className="outline-none">
        {status === "error" && (
          <p role="alert" className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">
            No pudimos enviar tu consulta. Revisá tu conexión e intentá de nuevo en unos minutos.
          </p>
        )}
      </div>
    </form>
  );
}
