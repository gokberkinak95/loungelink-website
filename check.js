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
  // ── v0.4 GECE ÖLÇEĞİ ──────────────────────────────────────────
  // Sinematik hero için tanımlı KAPALI bir set. Rastgele koyu renk
  // eklenemesin diye buraya yazılıyor: palet denetiminin amacı
  // "koyu renk yasak" değil, "her renk BİR KARAR olsun".
  // Kaynak: app splash zemininden türetildi, altınla kontrast
  // oranları WCAG AA (metin #F3EFE6 / zemin #070B16 = 16.8:1).
  "#070B16", "#0D1526", "#16203A", "#241E1B", "#0A0F1C", "#141B2E",
  "#1E2740", "#101728", "#8A5A2B", "#F4D79A", "#7C6A4A", "#FFE9B0",
  "#FFF3D2", "#F3EFE6", "#F7F3EA", "#C9C3B4", "#A79F8E", "#B9B2A2",
  "#8E8878", "#CBA44A", "#A9822F", "#14100A",
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
    // v0.4: çizim telefon bileşeni kaldırıldı (gerçek ekranlar geldi);
    // yerine bölüm içi eğik gerçek ekran denetlenir.
    ["shot-tilt", "bölüm içi gerçek ekran"],
    ["demo-out-verdict", "canlı kural matrisi"],
    // 🔴 ARANAN DİZE EKRANA ÖZGÜ OLMALI.
    // Önce "Kurucu Host" arıyordum; o metin lib/content.js'te de
    // geçiyor, yani profil ekranı BOŞ dönse bile denetim geçiyordu.
    // Mutasyon testi bunu gösterdi: yakalamayan bir denetim,
    // olmayan bir denetimden kötüdür — çünkü güven verir.
    // 🔴 v0.3: çizim ekranlar (Kurucu Host #12 / 01:12 sayacı) kaldırıldı,
    // yerine GERÇEK cihaz görüntüleri geldi. Denetim de gerçeğe bakar:
    // görsel şeritleri ve yeni bölümler HTML'e gerçekten basılmış mı?
    // v0.4: ana şerit hero'daki PhoneShelf'e taşındı; denetim onun
    // gerçek çıktısına bakar (sınıf + en az bir gerçek ekran dosyası).
    ["shelf-item", "hero telefon rafı"],
    ["/screens/ss-kesfet.jpg", "gerçek ekran şeridi (ana)"],
    ["scene-svg", "sinematik gece sahnesi"],
    ["/screens/ss-splash.jpg", "gerçek ekran şeridi (güven)"],
    ["flow-n", "3 adımlı akış bölümü"],
    ["prog-card", "kural motoru program kartları"],
  ];
  // 🔴 v0.3'te YAKALANAN hata kalıcı denetime çevrildi: eski SECTIONS
  // ile yeni bölümler aynı id'yi taşıyınca HTML'de id="kural" iki kez
  // basıldı (geçersiz HTML + çapa yanlış yere gider). Artık her sayfada
  // mükerrer id aranır.
  // 🔴 HTML'de src basılması dosyanın VAR olduğunu kanıtlamaz (statik
  // dize her koşulda basılır, dosya yoksa canlıda 404 görünür). İlk
  // mutasyon denemem bunu gösterdi: görseli sildim, denetim yine yeşildi.
  // Artık HTML'deki her /screens/ referansının public'te karşılığı aranır.
  const shotRefs = [...new Set([...html.matchAll(/\/screens\/[\w.-]+/g)].map((m) => m[0]))];
  for (const ref of shotRefs) {
    if (!fs.existsSync(path.join(__dirname, "public", ref))) {
      console.log(`  ✗ HTML ${ref} gösteriyor ama dosya public'te YOK (canlıda 404)`);
      bad++;
    }
  }
  const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) {
    console.log(`  ✗ mükerrer id: ${[...new Set(dup)].join(", ")}`);
    bad++;
  }
  // v0.4 — REHBER SAYFASI AYRI DENETLENİR: içeriği ana sayfada değil
  // /rehber/... sayfalarında; ana sayfa listesinde aramak yanlış yerde
  // arama demekti (v0.4 yeniden düzenlemesinde bu ortaya çıktı).
  {
    // 🔴 v0.4'te ortaya çıktı: eski denetim "Turkish Airlines" dizesini
    // ANA SAYFADA arıyordu ve orada tesadüfen (program kartında) geçtiği
    // için yeşildi — rehberin gerçekten dolu olduğunu HİÇ kanıtlamamıştı.
    // Doğrusu: her rehber sayfası KENDİ kart adını ve bir karar cümlesini
    // basmalı. Boş dönen bir rehber sayfası artık build'i durdurur.
    const gdir = "./.next/server/app/rehber";
    if (fs.existsSync(gdir)) {
      for (const f of fs.readdirSync(gdir).filter((x) => x.endsWith(".html"))) {
        const gh = fs.readFileSync(path.join(gdir, f), "utf8");
        const hasVerdict = /misafir|girersin|hakkın|Misafir/.test(gh);
        if (!hasVerdict || gh.length < 4000) {
          console.log(`  ✗ rehber/${f}: sayfa boş görünüyor (karar metni yok)`);
          bad++;
        }
      }
    }
  }
  // 🔴 v0.9 — §3 RİTİM DENETİMİ (MARKA_RUHU): her bölüm SAHNE→KANIT→DAVET
  // üçlüsünün üçüncü vuruşuyla kapanmalı. Bilgiyle bırakılan okuyucu
  // akıştan düşer. Bu denetim yazılmadan önce beş bölümde davet yoktu
  // ve kimse fark etmemişti — ritim "hissedilen" bir şey olduğu için
  // gözden kaçıyor; sayıya bağlanınca kaçmıyor.
  {
    const idx = fs.readFileSync("./.next/server/app/index.html", "utf8");
    const sectionCount = (idx.match(/section dark-band/g) || []).length;
    const beatCount = (idx.match(/class="beat"/g) || []).length;
    // Hero ve SSS/beta bölümleri kendi çağrılarını taşır; kalan içerik
    // bölümlerinin her biri bir davet vuruşu ister.
    // 🔴 İlk yazımda eşik 5'ti, oysa 6 vuruş vardı: bir vuruş silinse
    // denetim yine yeşil kalıyordu. Mutasyon testi bunu gösterdi —
    // eşik GERÇEK sayıya kilitlenir, yoksa denetim uyur.
    const beklenen = 6;
    if (beatCount < beklenen) {
      console.log(`  ✗ §3 ritim: ${sectionCount} bölümde yalnız ${beatCount} davet vuruşu var (en az ${beklenen} olmalı)`);
      bad++;
    }
  }

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
