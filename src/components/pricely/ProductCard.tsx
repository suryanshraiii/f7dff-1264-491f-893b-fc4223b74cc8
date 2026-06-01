import { Link } from "@tanstack/react-router";
import { ChevronDown, Download, FileText, Heart, Star, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { buildSpecSheet, formatINR, getDescription, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";

const recoStyles: Record<Product["recommendation"], { label: string; cls: string }> = {
  buy_online: { label: "Buy Online Now", cls: "bg-success/15 text-success border-success/30" },
  buy_offline: { label: "Buy Offline Now", cls: "bg-primary/10 text-primary border-primary/25" },
  wait: { label: "Wait for Better Deal", cls: "bg-warning/20 text-warning-foreground border-warning/40" },
};

interface Props {
  product: Product;
  selected?: boolean;
  expanded?: boolean;
  onSelect?: () => void;
  onToggleExpand?: () => void;
}

function downloadSpec(p: Product) {
  const blob = new Blob([buildSpecSheet(p)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pricely-${p.id}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadJSON(p: Product) {
  const payload = { ...p, description: getDescription(p), exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pricely-${p.id}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ProductCard({ product, selected, expanded, onSelect, onToggleExpand }: Props) {
  const savings = product.originalPrice - product.price;
  const pct = Math.round((savings / product.originalPrice) * 100);
  const reco = recoStyles[product.recommendation];
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const description = getDescription(product);

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-gradient-card border transition-all duration-300 overflow-hidden",
        "hover:shadow-lift hover:-translate-y-1",
        selected ? "border-primary/60 shadow-glow ring-2 ring-primary/20" : "border-border shadow-soft",
        expanded && "sm:col-span-2",
      )}
    >
      {pct > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-glow">
          -{pct}% OFF
        </div>
      )}
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const nowWished = toggle(product.id);
          toast.success(nowWished ? "Added to wishlist" : "Removed from wishlist", {
            description: product.shortName,
          });
        }}
        className="absolute top-3 right-3 z-10 size-9 grid place-items-center rounded-full bg-background/90 backdrop-blur border border-border hover:border-destructive transition-colors"
      >
        <Heart className={cn("size-4 transition-colors", wished ? "fill-destructive text-destructive" : "text-muted-foreground")} />
      </button>

      <button
        onClick={() => {
          onSelect?.();
          onToggleExpand?.();
        }}
        aria-expanded={expanded}
        className="block w-full text-left"
      >
        <div className={cn("overflow-hidden bg-gradient-to-br from-secondary to-muted relative", expanded ? "aspect-[16/7]" : "aspect-[4/3]")}>
          <img
            src={product.image}
            alt={product.shortName}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-md bg-background/80 backdrop-blur font-medium">
            {product.emoji} {product.category}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn("font-semibold text-foreground flex-1", !expanded && "line-clamp-1")}>{product.shortName}</h3>
            <ChevronDown className={cn("size-4 text-muted-foreground shrink-0 mt-1 transition-transform", expanded && "rotate-180")} />
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="size-3.5 fill-warning text-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString("en-IN")})</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight">{formatINR(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-success flex items-center gap-1">
              <TrendingDown className="size-3" /> Save {formatINR(savings)}
            </span>
          </div>

          <div className={cn("mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border", reco.cls)}>
            <span className="size-1.5 rounded-full bg-current animate-pulse" />
            {reco.label}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">About this product</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <Stat label="Lowest ever" value={formatINR(product.lowestPrice)} />
            <Stat label="Highest ever" value={formatINR(product.highestPrice)} />
            <Stat label="AI confidence" value={`${product.confidence}%`} />
            <Stat label="Predicted drop" value={product.predictedDrop ? formatINR(product.predictedDrop) : "—"} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key features</p>
            <div className="flex flex-wrap gap-1.5">
              {product.features.map((f) => (
                <span key={f} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Download className="size-4 text-primary" />
              <p className="text-sm font-bold">Download this product</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Take the full breakdown with you — pricing, AI verdict, and specs in a single file.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadSpec(product);
                  toast.success("Spec sheet downloaded", { description: `pricely-${product.id}.txt` });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <FileText className="size-3.5" /> Spec sheet (.txt)
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadJSON(product);
                  toast.success("Data downloaded", { description: `pricely-${product.id}.json` });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/70 transition-colors border border-border"
              >
                <Download className="size-3.5" /> Raw data (.json)
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-semibold hover:border-primary hover:text-primary transition-colors ml-auto"
              >
                Full details →
              </Link>
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="px-4 pb-4 -mt-2 flex gap-2">
          <button
            onClick={() => {
              onSelect?.();
              onToggleExpand?.();
            }}
            className="flex-1 text-xs font-semibold py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors"
          >
            Quick view
          </button>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="flex-1 text-xs font-semibold py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-center"
          >
            Details →
          </Link>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-background/60 border border-border px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className="text-sm font-bold mt-0.5">{value}</div>
    </div>
  );
}
