#!/usr/bin/env node
/**
 * LoungeLink · site denetimi
 *
 * 🔴 NEDEN VAR: app ve BO'nun denetimi var, sitenin yoktu. Aynı
 * hataları burada da yapabilirim — özellikle iki tanesini:
 *   1. Palet dışı renk (app ile marka ayrışması)
 *   2. Ölü bağlantı (var olmayan sayfaya link)
 * İkisi de derleme sırasında hata VERMEZ, sessizce yayına çıkar.
 */
const fs = require("fs");
const path = require("path");

const PALETTE = new Set([
  "#B8943A", "#1A1F2E", "#374151", "#6B7280", "#9CA3AF",
  "#F8F6F1", "#F0EDE6", "#FFFFFF", "#fff", "#0D9488", "#059669",
  "#E11D48", "#7C3AED", "#D97706",
  // Altın zemin üzerine koyu metin renkleri — app/theme.js'te tanımlı
  // (goldDeep, goldInk). Site paletine eklemeyi unutmuştum.
  "#8A5A00", "#6B5518",
]);

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    if (f === "node_modules" || f === ".next" || f.startsWith(".")) continue;
    const p = path.join(dir, f);
    // 🔴 Denetim KENDİNİ taramaz: yorumdaki örnek href'i "ölü bağlantı"
    // sandı. Bir denetimin kendi metnini bulgu sayması, gerçek bulguları
    // gürültüye gömer.
    if (f === "check.js") continue;
    fs.statSync(p).isDirectory() ? walk(p, out) : (/\.(jsx?|css)$/.test(f) && out.push(p));
  }
  return out;
}

const files = walk(".");
let bad = 0;

// --- 1) Palet ---
for (const f of files) {
  if (f.endsWith("globals.css")) continue;      // palet tanımının kendisi
  if (f.includes("legal-source")) continue;      // app'ten kopya, dokunulmaz
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/#[0-9A-Fa-f]{3,6}\b/g)) {
    if (!PALETTE.has(m[0]) && !PALETTE.has(m[0].toUpperCase())) {
      console.log(`  ✗ ${f}: palet dışı renk ${m[0]}`);
      bad++;
    }
  }
}

// --- 2) Ölü iç bağlantı ---
// 🔴 href="/x" yazmak kolay; o sayfayı OLUŞTURMAYI unutmak da öyle.
const routes = new Set(["/"]);
function collectRoutes(dir, prefix = "") {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (!fs.statSync(p).isDirectory()) continue;
    if (fs.existsSync(path.join(p, "page.jsx"))) routes.add(prefix + "/" + f);
    collectRoutes(p, prefix + "/" + f);
  }
}
collectRoutes("app");

for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  for (const m of src.matchAll(/href="(\/[^"#?]*)"/g)) {
    const r = m[1].replace(/\/$/, "") || "/";
    if (r.startsWith("/rehber/")) continue;      // dinamik rota
    if (!routes.has(r)) {
      console.log(`  ✗ ${f}: ölü bağlantı ${m[1]} — böyle bir sayfa yok`);
      bad++;
    }
  }
}

// --- 3) Üretilen HTML gerçekten dolu mu ---
// 🔴 Tarayıcı yok, ekran görüntüsü alamıyorum. Yapabildiğim şey
// ÇIKTIYI okumak: telefon ekranları ve canlı matris HTML'e gerçekten
// düşmüş mü? Bir bileşen sessizce boş dönerse derleme HATA VERMEZ —
// sayfa çıkar, içi boş olur ve bunu ancak canlıda görürüz.
const OUT = "./.next/server/app/index.html";
if (fs.existsSync(OUT)) {
  const html = fs.readFileSync(OUT, "utf8");
  const must = [
    ["phone-screen", "telefon çerçevesi"],
    ["demo-out-verdict", "canlı kural matrisi"],
    ["Turkish Airlines Lounge", "rehber ekranı içeriği"],
    // 🔴 ARANAN DİZE EKRANA ÖZGÜ OLMALI.
    // Önce "Kurucu Host" arıyordum; o metin lib/content.js'te de
    // geçiyor, yani profil ekranı BOŞ dönse bile denetim geçiyordu.
    // Mutasyon testi bunu gösterdi: yakalamayan bir denetim,
    // olmayan bir denetimden kötüdür — çünkü güven verir.
    ["Kurucu Host #12", "profil ekranı içeriği"],
    ["01:12", "oturum ekranı içeriği"],
  ];
  for (const [needle, label] of must) {
    if (!html.includes(needle)) {
      console.log(`  ✗ üretilen HTML'de ${label} yok — bileşen boş dönüyor olabilir`);
      bad++;
    }
  }
} else {
  console.log("  ℹ HTML denetimi atlandı (önce: npm run build)");
}

console.log("=".repeat(60));
if (bad === 0) console.log(`✓ Site denetimi temiz — ${files.length} dosya, ${routes.size} sayfa`);
else console.log(`✗ ${bad} sorun bulundu.`);
process.exit(bad ? 1 : 0);
