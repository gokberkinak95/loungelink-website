import { allSlugs } from "../lib/guide";
import { allCardSlugs } from "../lib/card-pages";
// 🔴 Sitemap ELLE değil, veriden üretilir. Elle yazılan bir sitemap
// ilk yeni sayfada bayatlar ve kimse fark etmez.
//
// 🔴 v0.17 — TAM DA BU OLDU: /cerez, /aydinlatma ve /hesap-sil sayfaları
// vardı ama sitemap'te YOKTU. Rehber kısmı veriden üretildiği için
// güncel kaldı; elle yazılan yasal kısım üç sayfa geride kalmıştı.
// Yani "veriden üret" kuralı yarım uygulanmış. Artık statik sayfalar da
// bir listeden geliyor ve check.js §7 bu listeyi app/ klasöründeki
// gerçek rotalarla karşılaştırıyor — bir sayfa daha eklenip sitemap'e
// yazılmazsa denetim durdurur.
const STATIC = [
  ["/", 1],
  ["/rehber", 0.9],
  // 🔴 /kart sayfalarının tek giriş düğümü. Dizin sitemap'te yoksa
  // 144 sayfa yalnız sitemap satırlarıyla var olur; ağırlık taşımaz.
  ["/kartlar", 0.9],
  ["/hesap-sil", 0.4],
  ["/gizlilik", 0.3],
  ["/kosullar", 0.3],
  ["/aydinlatma", 0.3],
  ["/cerez", 0.3],
  ["/acik-riza", 0.3],
  ["/destek", 0.4],
  ["/sss", 0.5],
  // 🔵 26 AĞUSTOS — İNGİLİZCE BÖLÜM. Kural sayfaları bilerek çevrilmedi
  // (gerekçe app/en/page.jsx başlığında); ürün ve yasal ÖZET sayfaları var.
  ["/en", 0.8],
  ["/en/privacy", 0.3],
  ["/en/terms", 0.3],
  ["/en/delete-account", 0.4],
  ["/en/support", 0.4],
];

export default function sitemap() {
  const base = "https://loungelink.co";
  return [
    ...STATIC.map(([p, priority]) => ({ url: p === "/" ? base : `${base}${p}`, priority })),
    ...allSlugs().map((s) => ({ url: `${base}/rehber/${s}`, priority: 0.8 })),
    // Kart sayfaları da veriden gelir; elle tek bir satır yazılmaz.
    // Kart eklenir ya da katalogda yeni salon çıkarsa sitemap kendiliğinden büyür.
    ...allCardSlugs().map((s) => ({ url: `${base}/kart/${s}`, priority: 0.8 })),
  ];
}
