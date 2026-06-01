import { useEffect, useState } from "react";

const KEY = "pricely:wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
    const onStorage = () => setIds(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("pricely:wishlist", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pricely:wishlist", onStorage);
    };
  }, []);

  const toggle = (id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
    window.dispatchEvent(new Event("pricely:wishlist"));
    return next.includes(id);
  };

  return { ids, has: (id: string) => ids.includes(id), toggle };
}
