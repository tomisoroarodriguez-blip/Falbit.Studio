"use client";
import { useId, useState, type FormEvent } from "react";

const STATUSES = ["Pendiente", "En proceso", "Entregado"] as const;
type Status = (typeof STATUSES)[number];
type Order = { id: number; client: string; amount: number; status: Status };

// Datos ficticios solo para la demostración.
const seed: Order[] = [
  { id: 1001, client: "Cliente A", amount: 4200, status: "Entregado" },
  { id: 1002, client: "Cliente B", amount: 1850, status: "En proceso" },
  { id: 1003, client: "Cliente C", amount: 6900, status: "Pendiente" },
  { id: 1004, client: "Cliente D", amount: 3100, status: "Entregado" },
  { id: 1005, client: "Cliente E", amount: 2450, status: "Pendiente" },
];
const money = (n: number) => `$ ${n.toLocaleString("es-UY")}`;
const tone: Record<Status, string> = {
  Pendiente: "border-amber-400/50 text-amber-200",
  "En proceso": "border-sky-400/50 text-sky-200",
  Entregado: "border-emerald-400/50 text-emerald-200",
};

export function AdminDemo() {
  const [orders, setOrders] = useState<Order[]>(seed);
  const [filter, setFilter] = useState<"Todos" | Status>("Todos");
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const uid = useId();

  const shown = orders.filter((o) => filter === "Todos" || o.status === filter);
  const revenue = orders.filter((o) => o.status === "Entregado").reduce((s, o) => s + o.amount, 0);
  const pending = orders.filter((o) => o.status === "Pendiente").length;
  const max = Math.max(1, ...orders.map((o) => o.amount));

  const cycle = (id: number) =>
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status: STATUSES[(STATUSES.indexOf(o.status) + 1) % STATUSES.length] } : o)));

  const add = (e: FormEvent) => {
    e.preventDefault();
    const n = Number(amount);
    if (client.trim().length < 2) return setError("Ingresá el nombre del cliente (mínimo 2 letras).");
    if (!Number.isFinite(n) || n <= 0) return setError("Ingresá un monto mayor a 0.");
    setError("");
    setOrders((os) => [{ id: Math.max(1000, ...os.map((o) => o.id)) + 1, client: client.trim(), amount: Math.round(n), status: "Pendiente" }, ...os]);
    setClient("");
    setAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Ingresos cobrados", money(revenue)],
          ["Pedidos totales", String(orders.length)],
          ["Pendientes", String(pending)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-graphite bg-[#121212] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-ivory-dim">{k}</p>
            <p className="mt-2 text-2xl font-semibold text-champagne tabular-nums">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-graphite bg-[#121212] p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-semibold">Pedidos</h4>
            <label className="text-sm text-ivory-dim">
              <span className="sr-only">Filtrar por estado</span>
              <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="min-h-11 rounded-full border border-graphite bg-carbon px-4 text-ivory">
                <option>Todos</option>
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <caption className="sr-only">Pedidos de demostración</caption>
              <thead className="text-xs uppercase tracking-[0.15em] text-ivory-dim">
                <tr>
                  <th className="pb-3 font-medium">N°</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Monto</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite">
                {shown.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 tabular-nums text-ivory-dim">#{o.id}</td>
                    <td className="py-3">{o.client}</td>
                    <td className="py-3 tabular-nums">{money(o.amount)}</td>
                    <td className="py-3">
                      <button type="button" onClick={() => cycle(o.id)} title="Cambiar estado" aria-label={`Estado del pedido ${o.id}: ${o.status}. Activar para cambiar`} className={`min-h-9 rounded-full border px-3 text-xs ${tone[o.status]}`}>
                        {o.status}
                      </button>
                    </td>
                    <td className="py-3 text-right">
                      <button type="button" aria-label={`Eliminar pedido ${o.id}`} onClick={() => setOrders((os) => os.filter((x) => x.id !== o.id))} className="size-9 rounded-full text-ivory-dim hover:bg-white/5 hover:text-ivory">
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shown.length === 0 && <p className="py-6 text-center text-sm text-ivory-dim">No hay pedidos con este filtro.</p>}
          </div>
        </div>

        <div className="space-y-6">
          <form onSubmit={add} noValidate className="rounded-2xl border border-graphite bg-[#121212] p-5">
            <h4 className="mb-4 font-semibold">Nuevo pedido</h4>
            <label htmlFor={`${uid}-c`} className="text-sm text-ivory-dim">Cliente</label>
            <input id={`${uid}-c`} value={client} onChange={(e) => setClient(e.target.value)} className="mb-3 mt-1 min-h-11 w-full rounded-xl border border-graphite bg-carbon px-4" />
            <label htmlFor={`${uid}-a`} className="text-sm text-ivory-dim">Monto</label>
            <input id={`${uid}-a`} inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-graphite bg-carbon px-4" />
            {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
            <button type="submit" className="mt-4 min-h-11 w-full rounded-full bg-champagne text-sm font-semibold text-carbon hover:bg-champagne-soft">Agregar pedido</button>
          </form>

          <div className="rounded-2xl border border-graphite bg-[#121212] p-5">
            <h4 className="mb-4 font-semibold">Monto por pedido</h4>
            <ul className="space-y-2" aria-label="Gráfico de montos">
              {orders.slice(0, 6).map((o) => (
                <li key={o.id} className="grid grid-cols-[3.2rem_1fr] items-center gap-3 text-xs text-ivory-dim">
                  <span className="tabular-nums">#{o.id}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-graphite">
                    <span className="block h-full rounded-full bg-champagne transition-[width] duration-500" style={{ width: `${(o.amount / max) * 100}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-xs text-ivory-dim">Demostración: datos ficticios, no se guardan ni se envían a ningún servidor.</p>
    </div>
  );
}
