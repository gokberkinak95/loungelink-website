import { allSlugs } from "../lib/guide";
// 🔴 Sitemap ELLE değil, veriden üretilir. Elle yazılan bir sitemap
// ilk yeni sayfada bayatlar ve kimse fark etmez.
export default function sitemap() {
  const base = "https://loungelink.co";
  return [
    { url: base, priority: 1 },
    { url: `${base}/rehber`, priority: 0.9 },
    ...allSlugs().map((s) => ({ url: `${base}/rehber/${s}`, priority: 0.8 })),
    { url: `${base}/gizlilik`, priority: 0.3 },
    { url: `${base}/kosullar`, priority: 0.3 },
  ];
}
