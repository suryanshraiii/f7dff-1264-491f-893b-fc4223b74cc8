import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Sparkles, SlidersHorizontal, Zap, TrendingUp, TrendingDown, Bell, Menu, Target, Heart, X } from "lucide-react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/pricely/ProductCard";
import { ProductDetail } from "@/components/pricely/ProductDetail";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pricely — Smart Electronics Price Comparison & Deal Finder" },
      { name: "description", content: "AI-powered price comparison for smartphones, laptops, TVs, audio and gaming. Track deals, predict drops, save smart." },
      { property: "og:title", content: "Pricely — Smart Electronics Price Comparison" },
      { property: "og:description", content: "AI-powered deal finder for electronics. Compare prices online and offline, predict drops, save more." },
    ],
  }),
  component: Home,
});

const MAX_PRICE = 300000;

function Home() {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState(0);
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [email, setEmail] = useState("");
  const { ids: wishIds } = useWishlist();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk = activeCat === "all" || p.category === activeCat;
      const qOk = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
      const priceOk = p.price <= maxPrice;
      const ratingOk = p.rating >= minRating;
      const wishOk = !wishlistOnly || wishIds.includes(p.id);
      return catOk && qOk && priceOk && ratingOk && wishOk;
    });
  }, [activeCat, query, maxPrice, minRating, wishlistOnly, wishIds]);

  const selected = products.find((p) => p.id === selectedId) ?? products[0];

  const avgSavings = filtered.length
    ? Math.round(filtered.reduce((s, p) => s + (p.originalPrice - p.price), 0) / filtered.length)
    : 0;
  const drops = filtered.filter((p) => p.recommendation === "wait").length;

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    toast.success("You're subscribed!", { description: "We'll send the best deals to " + email });
    setEmail("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 flex-wrap">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow animate-pulse-glow">
              <Target className="size-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient leading-none">Pricely</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Smart Deal Advisor</p>
            </div>
          </Link>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <button onClick={scrollTo("deals")} className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors">Deals</button>
            <button onClick={() => { setWishlistOnly((v) => !v); toast.message(wishlistOnly ? "Showing all products" : "Showing wishlist only"); }} className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors inline-flex items-center gap-1.5">
              <Heart className={cn("size-4", wishlistOnly && "fill-destructive text-destructive")} /> Wishlist
              {wishIds.length > 0 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{wishIds.length}</span>}
            </button>
            <button onClick={scrollTo("how")} className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors">How it works</button>
          </nav>
          <button onClick={scrollTo("alerts")} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow text-sm">
            <Bell className="size-4" /> Get Alerts
          </button>
          <button onClick={() => setFiltersOpen(true)} className="md:hidden size-10 grid place-items-center rounded-lg border border-border">
            <Menu className="size-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search electronics, brands, or models…"
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 size-7 grid place-items-center rounded-full hover:bg-muted">
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold shadow-soft transition-all",
                filtersOpen ? "bg-foreground text-background" : "bg-gradient-primary text-primary-foreground hover:shadow-glow"
              )}
            >
              <SlidersHorizontal className="size-4" /> Filters
            </button>
          </div>

          {filtersOpen && (
            <div className="mt-3 p-4 rounded-2xl bg-gradient-card border border-border shadow-soft grid sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="space-y-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Max price: ₹{maxPrice.toLocaleString("en-IN")}</span>
                <input type="range" min={10000} max={MAX_PRICE} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Min rating: {minRating.toFixed(1)} ⭐</span>
                <input type="range" min={0} max={5} step={0.1} value={minRating} onChange={(e) => setMinRating(+e.target.value)} className="w-full accent-primary" />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={wishlistOnly} onChange={(e) => setWishlistOnly(e.target.checked)} className="size-4 accent-primary" />
                Show only wishlist ({wishIds.length})
              </label>
              <button
                onClick={() => { setMaxPrice(MAX_PRICE); setMinRating(0); setWishlistOnly(false); setQuery(""); setActiveCat("all"); }}
                className="sm:col-span-3 text-xs font-semibold text-primary hover:underline justify-self-start"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard onClick={scrollTo("deals")} icon={<Zap className="size-5" />} label="Active Deals" value={filtered.length.toString()} delta="+12%" tone="primary" />
          <StatCard onClick={scrollTo("deals")} icon={<TrendingUp className="size-5" />} label="Avg. Savings" value={`₹${avgSavings.toLocaleString("en-IN")}`} delta="+8%" tone="success" />
          <StatCard onClick={scrollTo("deals")} icon={<TrendingDown className="size-5" />} label="Price Drops Expected" value={drops.toString()} delta="-5%" tone="warning" />
        </section>

        {/* Categories */}
        <section className="rounded-2xl bg-gradient-card border border-border shadow-soft p-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-glow scale-105"
                      : "bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:scale-105"
                  )}
                >
                  <span className="text-base">{c.emoji}</span>
                  {c.label}
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", active ? "bg-white/20" : "bg-background text-muted-foreground")}>
                    {counts[c.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid + Detail */}
        <section id="deals" className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6">
          <div>
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {activeCat === "all" ? "All Products" : activeCat}{" "}
                <span className="text-muted-foreground text-base font-medium">({filtered.length})</span>
              </h2>
              <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" /> Ranked by AI value score
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  selected={p.id === selectedId}
                  expanded={p.id === expandedId}
                  onSelect={() => setSelectedId(p.id)}
                  onToggleExpand={() => setExpandedId((cur) => (cur === p.id ? null : p.id))}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground rounded-2xl border border-dashed border-border">
                No products match your filters. <button onClick={() => { setMaxPrice(MAX_PRICE); setMinRating(0); setWishlistOnly(false); setQuery(""); setActiveCat("all"); }} className="text-primary font-semibold hover:underline">Reset</button>
              </div>
            )}
          </div>
          <aside className="lg:sticky lg:top-44 self-start">
            <ProductDetail product={selected} />
          </aside>
        </section>

        {/* Footer */}
        <footer id="how" className="mt-12 rounded-3xl bg-gradient-hero text-primary-foreground p-8 sm:p-12 shadow-lift relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-xl bg-white/20 grid place-items-center"><Target className="size-5" /></div>
                <span className="text-2xl font-bold">Pricely</span>
              </div>
              <p className="opacity-90 max-w-md">AI-powered smart deal advisor for electronics. Save money, shop smart, and never miss a price drop again.</p>
              <form id="alerts" onSubmit={handleSubscribe} className="mt-6 flex flex-wrap gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white/15 backdrop-blur placeholder:text-white/60 border border-white/20 focus:outline-none focus:border-white/50"
                />
                <button type="submit" className="px-5 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-[1.02] transition-transform">
                  Subscribe
                </button>
              </form>
            </div>
            <FooterLinks title="Quick Links" items={[
              { label: "Browse Deals", onClick: scrollTo("deals") },
              { label: "Wishlist", onClick: () => { setWishlistOnly(true); scrollTo("deals")(); } },
              { label: "Price Alerts", onClick: () => toast.success("Price alerts active for all wishlist items") },
              { label: "Mobile App", onClick: () => toast.info("Coming soon to iOS and Android") },
            ]} />
            <FooterLinks title="Support" items={[
              { label: "Help Center", onClick: () => toast.message("Help Center", { description: "Email us at support@pricely.app" }) },
              { label: "Contact Us", onClick: () => toast.message("Contact", { description: "hello@pricely.app" }) },
              { label: "Privacy Policy", onClick: () => toast.message("Privacy", { description: "We never share your data with third parties." }) },
              { label: "Terms of Service", onClick: () => toast.message("Terms", { description: "Standard, fair, and human-readable." }) },
            ]} />
          </div>
          <div className="relative mt-10 pt-6 border-t border-white/20 text-sm opacity-80 flex justify-between flex-wrap gap-2">
            <span>© 2026 Pricely. All rights reserved.</span>
            <span>Built with AI & ❤️</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FooterLinks({ title, items }: { title: string; items: { label: string; onClick: () => void }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm opacity-90">
        {items.map((i) => (
          <li key={i.label}>
            <button onClick={i.onClick} className="hover:underline text-left">{i.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ icon, label, value, delta, tone, onClick }: { icon: React.ReactNode; label: string; value: string; delta: string; tone: "primary" | "success" | "warning"; onClick?: () => void }) {
  const tones = {
    primary: "from-primary/15 to-primary/0 text-primary",
    success: "from-success/15 to-success/0 text-success",
    warning: "from-warning/20 to-warning/0 text-warning-foreground",
  };
  const positive = delta.startsWith("+");
  return (
    <button onClick={onClick} className="relative overflow-hidden rounded-2xl bg-gradient-card border border-border shadow-soft p-5 hover:shadow-lift hover:-translate-y-0.5 transition-all text-left">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none", tones[tone])} />
      <div className="relative flex items-center justify-between">
        <div className={cn("size-10 rounded-xl grid place-items-center bg-background shadow-soft", tones[tone].split(" ").pop())}>
          {icon}
        </div>
        <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", positive ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive")}>
          {delta}
        </span>
      </div>
      <div className="relative mt-4">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      </div>
    </button>
  );
}
