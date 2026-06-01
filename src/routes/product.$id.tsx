import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { products } from "@/lib/products";
import { ProductDetail } from "@/components/pricely/ProductDetail";
import { ProductCard } from "@/components/pricely/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.shortName} — Best Price & Deals | Pricely` },
            { name: "description", content: `Compare prices, predictions and nearby store availability for ${p.name} on Pricely.` },
            { property: "og:title", content: `${p.shortName} — Best Price & Deals | Pricely` },
            { property: "og:description", content: `Compare prices and AI deal predictions for ${p.name}.` },
            { property: "og:image", content: p.image },
            { name: "twitter:image", content: p.image },
          ]
        : [{ title: "Product — Pricely" }],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto p-12 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/" className="inline-block mt-4 text-primary underline">Back to all products</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to all deals
        </Link>

        <ProductDetail product={product} />

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-5">Related in {product.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
