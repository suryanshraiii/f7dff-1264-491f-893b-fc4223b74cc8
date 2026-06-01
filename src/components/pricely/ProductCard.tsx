import { Link } from "@tanstack/react-router";
import { Heart, Star, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { formatINR, type Product } from "@/lib/products";
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
  onSelect?: () => void;
}

export function ProductCard({ product, selected, onSelect }: Props) {
  const savings = product.originalPrice - product.price;
  const pct = Math.round((savings / product.originalPrice) * 100);
  const reco = recoStyles[product.recommendation];
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-gradient-card border transition-all duration-300 overflow-hidden",
        "hover:shadow-lift hover:-translate-y-1",
        selected ? "border-primary/60 shadow-glow ring-2 ring-primary/20" : "border-border shadow-soft"
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

      <button onClick={onSelect} className="block w-full text-left">
        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-muted relative">
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
            <h3 className="font-semibold text-foreground line-clamp-1 flex-1">{product.shortName}</h3>
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

      <div className="px-4 pb-4 -mt-2 flex gap-2">
        <button
          onClick={onSelect}
          className="flex-1 text-xs font-semibold py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors"
        >
          Quick View
        </button>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="flex-1 text-xs font-semibold py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-center"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
