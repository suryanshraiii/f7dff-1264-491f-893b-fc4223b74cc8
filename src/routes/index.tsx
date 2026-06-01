import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, SlidersHorizontal, Zap, TrendingUp, TrendingDown, Bell, Menu, Target } from "lucide-react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/pricely/ProductCard";
import { ProductDetail } from "@/components/pricely/ProductDetail";
import { cn } from "@/lib/utils";

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

function Home() {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(products[0].id);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catOk = activeCat === "all" || p.category === activeCat;
      const qOk = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
      return catOk && qOk;
    });
  }, [activeCat, query]);

  const selected = products.find((p) => p.id === selectedId) ?? products[0];

  const totalSavings = filtered.reduce((s, p) => s + (p.originalPrice - p.price), 0);
  const avgSavings = filtered.length ? Math.round(totalSavings / filtered.length) : 0;
  const drops = filtered.filter((p) => p.recommendation === "wait").length;

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: products.length };
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow animate-pulse-glow">
              <Target className="size-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient leading-none">Pricely</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Smart Deal Advisor</p>
            </div>
          </div>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <a className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors" href="#deals">Deals</a>
            <a className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors" href="#alerts">Alerts</a>
            <a className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-secondary transition-colors" href="#how">How it works</a>
          </nav>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow text-sm">
            <Bell className="size-4" /> Get Alerts
          </button>
          <button className="md:hidden size-10 grid place-items-center rounded-lg border border-border">
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
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-shadow">
              <SlidersHorizontal className="size-4" /> Filters
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<Zap className="size-5" />} label="Active Deals" value={filtered.length.toString()} delta="+12%" tone="primary" />
          <StatCard icon={<TrendingUp className="size-5" />} label="Avg. Savings" value={`₹${avgSavings.toLocaleString("en-IN")}`} delta="+8%" tone="success" />
          <StatCard icon={<TrendingDown className="size-5" />} label="Price Drops Expected" value={drops.toString()} delta="-5%" tone="warning" />
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
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                  )}
                >
                  <span className="text-base">{c.emoji}</span>
                  {c.label}
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      active ? "bg-white/20" : "bg-background text-muted-foreground"
                    )}
                  >
                    {counts[c.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid + Detail */}
        <section id="deals" className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-6">
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
                  onSelect={() => setSelectedId(p.id)}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">No products match your search.</div>
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
              <div id="alerts" className="mt-6 flex flex-wrap gap-2 max-w-md">
                <input placeholder="your@email.com" className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white/15 backdrop-blur placeholder:text-white/60 border border-white/20 focus:outline-none focus:border-white/50" />
                <button className="px-5 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-[1.02] transition-transform">Subscribe</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>About Us</li><li>How It Works</li><li>Price Alerts</li><li>Mobile App</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Help Center</li><li>Contact Us</li><li>Privacy Policy</li><li>Terms of Service</li>
              </ul>
            </div>
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

function StatCard({ icon, label, value, delta, tone }: { icon: React.ReactNode; label: string; value: string; delta: string; tone: "primary" | "success" | "warning" }) {
  const tones = {
    primary: "from-primary/15 to-primary/0 text-primary",
    success: "from-success/15 to-success/0 text-success",
    warning: "from-warning/20 to-warning/0 text-warning-foreground",
  };
  const positive = delta.startsWith("+");
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-border shadow-soft p-5 hover:shadow-lift transition-shadow">
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
    </div>
  );
}
