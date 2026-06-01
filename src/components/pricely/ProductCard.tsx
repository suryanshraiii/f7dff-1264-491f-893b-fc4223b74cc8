import { Heart, Star, TrendingDown } from "lucide-react";
import { formatINR, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const recoStyles: Record<Product["recommendation"], { label: string; cls: string }> = {
  buy_online: { label: "Buy Online Now", cls: "bg-success/15 text-success border-success/30" },
  buy_offline: { label: "Buy Offline Now", cls: "bg-primary/10 text-primary border-primary/25" },
  wait: { label: "Wait for Better Deal", cls: "bg-warning/20 text-warning-foreground border-warning/40" },
};

interface Props {
  product: Product;
  selected?: boolean;
  onSelect?: () => void;
}

export function ProductCard({ product, selected, onSelect }: Props) {
  const savings = product.originalPrice - product.price;
  const pct = Math.round((savings / product.originalPrice) * 100);
  const reco = recoStyles[product.recommendation];

  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full text-left rounded-2xl bg-gradient-card border p-5 transition-all duration-300",
        "hover:shadow-lift hover:-translate-y-1",
        selected ? "border-primary/60 shadow-glow ring-2 ring-primary/20" : "border-border shadow-soft"
      )}
    >
      {pct > 0 && (
        <div className="absolute -top-2 -left-2 bg-gradient-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-glow">
          -{pct}%
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="shrink-0 size-16 rounded-xl bg-gradient-to-br from-secondary to-muted grid place-items-center text-3xl group-hover:scale-110 transition-transform">
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{product.shortName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
            </div>
            <Heart className="size-4 text-muted-foreground hover:text-destructive hover:fill-destructive transition-colors shrink-0" />
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Star className="size-3.5 fill-warning text-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString("en-IN")})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight">{formatINR(product.price)}</span>
        <span className="text-sm text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs">
        <span className="font-semibold text-success flex items-center gap-1">
          <TrendingDown className="size-3" /> Save {formatINR(savings)}
        </span>
        <span className="text-muted-foreground">• Lowest: {formatINR(product.lowestPrice)}</span>
      </div>

      <div className={cn("mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border", reco.cls)}>
        <span className="size-1.5 rounded-full bg-current animate-pulse" />
        {reco.label}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.badges.map((b) => (
          <span key={b} className="text-[10px] font-medium px-2 py-1 rounded-md bg-primary/8 text-primary border border-primary/15">
            {b}
          </span>
        ))}
      </div>
    </button>
  );
}
