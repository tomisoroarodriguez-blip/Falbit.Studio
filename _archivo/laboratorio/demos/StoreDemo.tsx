"use client";
import { useMemo, useState } from "react";
import { Segmented } from "./shared";

type Product = { id: string; name: string; cat: string; price: number; hue: number };

// Catálogo ficticio solo para la demostración.
const products: Product[] = [
  { id: "p1", name: "Reloj Aurora", cat: "Accesorios", price: 4890, hue: 38 },
  { id: "p2", name: "Billetera Cuero", cat: "Accesorios", price: 1950, hue: 25 },
  { id: "p3", name: "Mochila Urbana", cat: "Bolsos", price: 3290, hue: 200 },
  { id: "p4", name: "Bolso Viaje", cat: "Bolsos", price: 5490, hue: 160 },
  { id: "p5", name: "Lentes Sol", cat: "Accesorios", price: 2790, hue: 12 },
  { id: "p6", name: "Tote Lino", cat: "Bolsos", price: 1490, hue: 330 },
];
const money = (n: number) => `$ ${n.toLocaleString("es-UY")}`;

export function StoreDemo() {
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState("rel");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const list = useMemo(() => {
    const l = products.filter((p) => cat === "Todos" || p.cat === cat);
    if (sort === "asc") l.sort((a, b) => a.price - b.price);
    if (sort === "desc") l.sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);

  const items = products.filter((p) => cart[p.id]);
  const count = items.reduce((s, p) => s + cart[p.id], 0);
  const total = items.reduce((s, p) => s + cart[p.id] * p.price, 0);

  const change = (id: string, d: number) => {
    setDone(false);
    setCart((c) => {
      const q = (c[id] ?? 0) + d;
      const n = { ...c };
      if (q <= 0) delete n[id];
      else n[id] = q;
      return n;
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <Segmented
            label="Categoría"
            value={cat}
            onChange={setCat}
            options={["Todos", "Accesorios", "Bolsos"].map((v) => ({ value: v, label: v }))}
          />
          <label className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-ivory-dim">
            <span className="mb-2 block">Ordenar</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="min-h-11 rounded-full border border-graphite bg-carbon px-4 text-sm font-normal normal-case tracking-normal text-ivory"
            >
              <option value="rel">Relevancia</option>
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </label>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => (
            <li key={p.id} className="flex flex-col rounded-2xl border border-graphite bg-[#121212] p-4">
              <div
                className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, hsl(${p.hue} 45% 28%), hsl(${p.hue} 40% 14%))` }}
                aria-hidden="true"
              >
                <span className="size-14 rounded-full" style={{ background: `hsl(${p.hue} 55% 62% / .85)` }} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-ivory-dim">{p.cat}</p>
              <h4 className="mt-1 font-semibold">{p.name}</h4>
              <p className="mt-1 text-champagne">{money(p.price)}</p>
              <button
                type="button"
                onClick={() => change(p.id, 1)}
                className="mt-4 min-h-11 rounded-full border border-champagne/50 text-sm font-semibold transition-colors hover:bg-champagne hover:text-carbon"
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      </div>

      <aside aria-label="Carrito de compras" className="h-fit rounded-2xl border border-graphite bg-[#121212] p-5 lg:sticky lg:top-28">
        <h4 className="flex items-center justify-between font-semibold">
          Carrito
          <span aria-live="polite" className="rounded-full bg-champagne px-3 py-0.5 text-xs font-bold text-carbon">
            {count} {count === 1 ? "ítem" : "ítems"}
          </span>
        </h4>

        {items.length === 0 ? (
          <p className="mt-5 text-sm text-ivory-dim">{done ? "Compra simulada completada. No se procesó ningún pago." : "Todavía no agregaste productos."}</p>
        ) : (
          <>
            <ul className="mt-4 divide-y divide-graphite">
              {items.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span>
                    {p.name}
                    <span className="block text-ivory-dim">{money(p.price * cart[p.id])}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <button type="button" aria-label={`Quitar una unidad de ${p.name}`} onClick={() => change(p.id, -1)} className="size-9 rounded-full border border-graphite hover:border-champagne">
                      −
                    </button>
                    <span className="w-6 text-center tabular-nums">{cart[p.id]}</span>
                    <button type="button" aria-label={`Agregar una unidad de ${p.name}`} onClick={() => change(p.id, 1)} className="size-9 rounded-full border border-graphite hover:border-champagne">
                      +
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-graphite pt-4 font-semibold">
              <span>Total</span>
              <span className="text-champagne">{money(total)}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setCart({});
                setDone(true);
              }}
              className="mt-5 min-h-12 w-full rounded-full bg-champagne text-sm font-semibold text-carbon hover:bg-champagne-soft"
            >
              Finalizar compra (simulación)
            </button>
          </>
        )}
        <p className="mt-4 text-xs leading-relaxed text-ivory-dim">Demostración: los productos son ficticios y no se realiza ningún pago.</p>
      </aside>
    </div>
  );
}
