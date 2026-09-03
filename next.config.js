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

// 🔴 v0.51 — GÜVENLİK BAŞLIKLARI. Site bugüne kadar hiçbir güvenlik
// başlığı göndermiyordu (ölçüldü: curl -I → yalnız Next varsayılanları).
// Bir pazarlama sitesi için risk düşük ama sıfır değil: iframe içine
// alınıp tıklama hırsızlığı (clickjacking), MIME koklama, referrer sızması.
// CSP: Next'in hidrasyon betikleri satır içi olduğu için script-src
// 'unsafe-inline' ZORUNLU (nonce'suz statik render). Ölçüm betiği
// yalnız NEXT_PUBLIC_OLCUM_HOST'tan yüklenir; o adres CSP'ye burada
// eklenir — env boşsa hiçbir dış betik kaynağı açılmaz.
const OLCUM = process.env.NEXT_PUBLIC_OLCUM_HOST ? " " + process.env.NEXT_PUBLIC_OLCUM_HOST : "";
// Bekleme listesi formu PostgREST'e fetch atar; adres env'den okunur,
// "*.supabase.co" varsayımı yok (özel alan adı olabilir).
const SB = (() => { try { return process.env.NEXT_PUBLIC_SUPABASE_URL ? " " + new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : ""; } catch { return ""; } })();
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + OLCUM,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self'" + OLCUM + SB,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

module.exports = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: CSP },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      ],
    }];
  },
};
