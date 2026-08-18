// 🔴 v0.17 — AVIF/WebP açıldı. Telefon ekran görüntüleri sitenin en
// ağır varlığı; aynı görsel AVIF'te ~%40 daha küçük iniyor ve kalite
// farkı gözle görünmüyor. Kod değişmiyor, yalnız tarayıcıya daha iyi
// bir biçim sunuluyor.
// 🔴 v0.23.1 — ÇALIŞMA KÖKÜ BU KLASÖRE ÇİVİLENDİ. 18 Ağustos 2026'da
// Gökberk'in makinesinde build şu uyarıyı verdi:
//
//   ⚠ Next.js inferred your workspace root, but it may not be correct.
//     We detected multiple lockfiles and selected the directory of
//     C:\package-lock.json as the root directory.
//
// Sebep: başarısız bir `npm install` sürücü köküne (C:\) bir
// package-lock.json bırakmıştı. Next o dosyayı görünce çalışma kökünü
// C:\ sanıyor ve "output file tracing" (hangi dosyalar sunucu paketine
// girecek) yanlış kökten hesaplanıyor.
//
// O dosyayı silmek yönetici izni istiyor. Ama asıl mesele şu: proje
// kendi kökünü BAŞKA BİR KLASÖRDEKİ bir dosyaya sormamalı. Kök artık
// bu dosyanın bulunduğu yer — dışarıda ne olursa olsun değişmez.
//
// Next 15'te bu ayar üst düzeydedir (Next 14'te experimental altında).
const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  outputFileTracingRoot: path.join(__dirname),
};
