import { Bell, ExternalLink, Heart, MapPin, Navigation, ShoppingCart, Sparkles, Star, Store, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { formatINR, nearbyStores, onlineStores, type Product } from "@/lib/products";
import { PriceChart } from "./PriceChart";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";

export function ProductDetail({ product }: { product: Product }) {
  const savings = product.originalPrice - product.price;
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  const notifyDrop = () => {
    toast.success("Price alert set!", {
      description: `We'll ping you the moment ${product.shortName} drops below ${formatINR(product.price)}.`,
    });
  };

  return (
    <div className="space-y-5">
      {/* Hero card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border shadow-lift">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
        <div className="grid md:grid-cols-[200px_1fr] gap-5 p-6 sm:p-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted shadow-soft">
            <img src={product.image} alt={product.shortName} className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 text-2xl">{product.emoji}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</p>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight mt-1">{product.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Star className="size-4 fill-warning text-warning" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">• {product.reviews.toLocaleString("en-IN")} reviews</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const nowW = toggle(product.id);
                  toast.success(nowW ? "Saved to wishlist" : "Removed from wishlist", { description: product.shortName });
                }}
                aria-label="Toggle wishlist"
                className="size-11 grid place-items-center rounded-full border border-border hover:border-destructive transition-colors shrink-0"
              >
                <Heart className={cn("size-5", wished ? "fill-destructive text-destructive" : "text-muted-foreground")} />
              </button>
            </div>

            <div className="mt-5 flex items-end gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient">{formatINR(product.price)}</span>
              <span className="text-xl text-muted-foreground line-through pb-1">{formatINR(product.originalPrice)}</span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-success/15 text-success text-sm font-bold border border-success/25">
                <TrendingDown className="size-4" /> Save {formatINR(savings)}
              </span>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              Lowest: <span className="font-semibold text-foreground">{formatINR(product.lowestPrice)}</span> • Highest:{" "}
              <span className="font-semibold text-foreground">{formatINR(product.highestPrice)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI recommendation */}
      <div className="rounded-2xl p-6 bg-gradient-hero text-primary-foreground shadow-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 size-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start gap-4 flex-wrap">
          <div className="size-12 rounded-2xl bg-white/20 backdrop-blur grid place-items-center">
            <Sparkles className="size-6" />
          </div>
          <div className="flex-1 min-w-[220px]">
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">AI-Powered Recommendation</p>
            <h3 className="text-xl font-bold mt-1">
              {product.recommendation === "wait"
                ? `⏳ Wait ${product.waitDays} days for a better deal`
                : product.recommendation === "buy_online"
                ? "🛒 Buy online now — best deal active"
                : "🏬 Visit an offline store for the best price"}
            </h3>
            <p className="text-sm opacity-90 mt-1">
              Our ML model predicts a price movement of {formatINR(product.predictedDrop || 2000)} with {product.confidence}% confidence.
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{product.confidence}%</div>
            <div className="text-[10px] uppercase opacity-80">Confidence</div>
          </div>
        </div>
        <button
          onClick={notifyDrop}
          className="relative mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-primary font-semibold shadow-lift hover:scale-[1.02] transition-transform"
        >
          <Bell className="size-4" /> Notify Me When Price Drops
        </button>
      </div>

      {/* Online stores */}
      <div className="rounded-2xl bg-gradient-card border border-border shadow-soft p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="size-5 text-primary" />
          <h3 className="font-semibold text-lg">Best Online Comparison</h3>
        </div>
        <div className="space-y-2.5">
          {onlineStores.map((s, i) => {
            const price = product.price + s.priceDelta;
            const url = s.urlBase + encodeURIComponent(product.shortName);
            return (
              <div
                key={s.name}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-soft flex-wrap",
                  s.best ? "border-success/40 bg-success/5" : "border-border bg-background"
                )}
              >
                <div className={cn("size-8 grid place-items-center rounded-full font-bold text-sm", s.best ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground")}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{s.badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Delivery: {s.delivery} • {s.offer}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{formatINR(price)}</div>
                  {s.best && <div className="text-[10px] font-bold text-success">Lowest Online!</div>}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Visit <ExternalLink className="size-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nearby stores */}
      <div className="rounded-2xl bg-gradient-card border border-border shadow-soft p-6">
        <div className="flex items-center gap-2 mb-4">
          <Store className="size-5 text-accent" />
          <h3 className="font-semibold text-lg">Nearby Stores</h3>
        </div>
        <div className="space-y-2.5">
          {nearbyStores.map((s) => {
            const price = product.price + s.priceDelta;
            const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(s.mapQ)}`;
            return (
              <div key={s.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:shadow-soft transition-shadow flex-wrap">
                <div className="size-10 grid place-items-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="size-5" />
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{s.name}</span>
                    {s.badge && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">{s.badge}</span>}
                    {!s.inStock && <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/15 text-destructive font-medium">Out of Stock</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.distance} • {s.location}</p>
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5">{s.hours}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatINR(price)}</div>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-border hover:border-primary hover:text-primary text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="size-3.5" /> Directions
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <PriceChart product={product} />
    </div>
  );
}
