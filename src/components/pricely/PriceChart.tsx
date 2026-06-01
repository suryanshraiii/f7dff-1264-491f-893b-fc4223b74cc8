import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { formatINR } from "@/lib/products";

const ranges = ["30D", "90D", "1Y"] as const;
type Range = (typeof ranges)[number];

function seedRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function PriceChart({ product }: { product: Product }) {
  const [range, setRange] = useState<Range>("90D");
  const points = range === "30D" ? 12 : range === "90D" ? 18 : 24;

  const data = useMemo(() => {
    const rand = seedRandom(product.price);
    const arr: { online: number; offline: number; predicted?: number }[] = [];
    const base = product.price;
    const span = (product.highestPrice - product.lowestPrice) * 0.9;
    for (let i = 0; i < points; i++) {
      const wave = Math.sin(i * 0.6) * span * 0.35;
      const noise = (rand() - 0.5) * span * 0.25;
      const online = Math.round(base + wave + noise);
      const offline = Math.round(online + span * 0.08 + rand() * span * 0.1);
      arr.push({ online, offline });
    }
    arr[arr.length - 1].online = product.price;
    arr[arr.length - 1].offline = product.price + Math.round(span * 0.1);
    // predictions
    const future = 4;
    const drop = product.predictedDrop || span * 0.05;
    for (let i = 1; i <= future; i++) {
      arr.push({
        online: 0,
        offline: 0,
        predicted: Math.round(product.price - (drop * i) / future + (rand() - 0.5) * span * 0.05),
      });
    }
    return arr;
  }, [product, points]);

  const W = 700;
  const H = 220;
  const all = data.flatMap((d) => [d.online, d.offline, d.predicted].filter(Boolean) as number[]);
  const min = Math.min(...all) * 0.95;
  const max = Math.max(...all) * 1.05;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;

  const onlinePath = data
    .map((d, i) => (d.online ? `${i === 0 ? "M" : "L"}${x(i)},${y(d.online)}` : ""))
    .filter(Boolean)
    .join(" ");
  const offlinePath = data
    .map((d, i) => (d.offline ? `${i === 0 ? "M" : "L"}${x(i)},${y(d.offline)}` : ""))
    .filter(Boolean)
    .join(" ");
  const lastReal = data.findIndex((d) => d.predicted);
  const predictedPath = data
    .map((d, i) => {
      if (i === lastReal - 1) return `M${x(i)},${y(data[i].online)}`;
      if (d.predicted) return `L${x(i)},${y(d.predicted)}`;
      return "";
    })
    .filter(Boolean)
    .join(" ");

  return (
    <div className="rounded-2xl bg-gradient-card border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-lg">Price History & Predictions</h3>
          <p className="text-xs text-muted-foreground">AI-forecasted trajectory with {product.confidence}% confidence</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-full bg-muted">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-full transition-all",
                range === r ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs mb-3">
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-primary" /> Online Price</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-accent" /> Offline Price</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full border-2 border-dashed border-success" /> Predicted</span>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-auto">
          <defs>
            <linearGradient id="gradOnline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.52 0.24 280)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.52 0.24 280)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((p) => (
            <line key={p} x1="0" x2={W} y1={H * p} y2={H * p} stroke="oklch(0.92 0.015 280)" strokeDasharray="4 4" />
          ))}
          <path d={`${onlinePath} L${x(lastReal - 1)},${H} L0,${H} Z`} fill="url(#gradOnline)" />
          <path d={onlinePath} fill="none" stroke="oklch(0.52 0.24 280)" strokeWidth="2.5" strokeLinecap="round" />
          <path d={offlinePath} fill="none" stroke="oklch(0.7 0.2 320)" strokeWidth="2" strokeLinecap="round" />
          <path d={predictedPath} fill="none" stroke="oklch(0.62 0.18 152)" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" />
          {data.map((d, i) =>
            d.online ? <circle key={i} cx={x(i)} cy={y(d.online)} r="3" fill="oklch(0.52 0.24 280)" /> : null
          )}
        </svg>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-success/8 to-primary/8 border border-success/20">
        <p className="text-xs font-semibold text-success mb-1">📈 Price Prediction Insight</p>
        <p className="text-xs text-foreground/80 leading-relaxed">
          Based on historical data and market trends, our AI model forecasts savings of up to{" "}
          <span className="font-bold text-foreground">{formatINR(product.predictedDrop || 2000)}</span> within the next{" "}
          {product.waitDays || 7} days.
        </p>
      </div>
    </div>
  );
}
