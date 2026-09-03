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
  "#B8943A", "#6B7280", "#9CA3AF",
  "#F8F6F1", "#F0EDE6", "#FFFFFF", "#fff", "#0D9488", "#059669",
  "#E11D48", "#7C3AED", "#D97706",
  // ── v0.37 · MAKET PALETİ ARTIK TÜRETİLİYOR ────────────────────
  // 🔴 Bu listede `#1A1F2E` · `#374151` · `#4B5563` · `#046B4C` vardı:
  // uygulamanın v3.1'de TERK ETTİĞİ lacivert nötr ailesi. Site o
  // renklerle bir telefon maketi çiziyordu, yani ARTIK OLMAYAN bir
  // ürünün ekran görüntüsünü gösteriyordu. Palet denetimi de temiz
  // diyordu — çünkü denetim "renk listede mi" sorar, "liste hâlâ
  // doğru mu" sormaz.
  //
  // 🆕 SINIF: "BİR İZİN LİSTESİ, İÇİNDEKİ HER SATIRIN NEREDEN GELDİĞİNİ
  // BİLMİYORSA, ESKİYEN KARARLARI KORUYAN BİR ZIRHA DÖNÜŞÜR."
  //
  // Artık `app_paleti.py --denetle` bu değerleri rnapp/src/theme.js ile
  // karşılaştırıyor; buradaki satırlar da oradan geliyor.
  "#251E17", "#4D3E2F", "#745E47", "#F4F1E9", "#FFFDF9",
  "#047E58", "#9A5303", "#0B786F", "#7F6523",
  // Altın zemin üzerine koyu metin renkleri — app/theme.js'te tanımlı
  "#8A5A00", "#6B5518",
  // ── v0.37 · GECE ÖLÇEĞİ ARTIK TÜRETİLİYOR ─────────────────────
  // 🔴 Bu listede 22 tane elle seçilmiş LACİVERT gece tonu vardı
  // (#070B16 · #0D1526 · #16203A …). Sitenin zeminleri onlardan
  // geliyordu ve app v3.1'de sıcak tarafa taşındığında hiçbiri
  // güncellenmedi: sıcak yazı, soğuk kâğıt.
  //
  // Artık sitenin gece paleti `site_paleti.py` tarafından app'in
  // KOYU temasından TÜRETİLİYOR ve `--denetle` sapmayı ölçüyor.
  // Buradaki değerler o türetimin çıktısı.
  "#161310", "#312B24", "#F4EFE8", "#DDD6CD", "#C7C0BA", "#AAA39C",
  "#D4B975", "#E3BE79", "#8D712D", "#12D2C1", "#07D595", "#FAAA4F",
  // sahne ve marka varlıklarında kalan sabitler
  "#F4D79A", "#7C6A4A", "#FFF3D2", "#F3EFE6", "#F7F3EA", "#C9C3B4",
  "#A79F8E", "#B9B2A2", "#8E8878", "#CBA44A", "#A9822F", "#14100A",
]);

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    // `_arsiv`: kullanımdan kalkmış ama SİLİNMEYEN dosyalar. Silmek yerine
    // arşivlemek bu projenin kuralı; denetimin onları ölçmesi ise yanlış
    // alarm üretir — çizilmeyen bir dosyanın rengi kimseyi rahatsız etmez.
    // 🔴 30 Ağu · v0.44 — `_yedek*` DE ATLANMALI.
    // Ölü açık-tema bileşenlerini `_yedek_acik_maket/` altına taşıyınca
    // bu denetim onları CANLI sanıp 9 kırmızı verdi: arşive kaldırmak,
    // kaldırmanın kendisi yüzünden hata sayıldı.
    // 🆕 SINIF: "BİR DENETİM 'SİL' DEĞİL 'ARŞİVLE' DİYORSA, ARŞİVİ DE
    // TANIMAK ZORUNDADIR — YOKSA ÖNERDİĞİ ŞEYİ CEZALANDIRIR."
    if (f === "node_modules" || f === ".next" || f === "_arsiv" ||
        f.startsWith("_yedek") || f.startsWith(".")) continue;
    const p = path.join(dir, f);
    // 🔴 Denetim KENDİNİ taramaz: yorumdaki örnek href'i "ölü bağlantı"
    // sandı. Bir denetimin kendi metnini bulgu sayması, gerçek bulguları
    // gürültüye gömer.
    if (f === "check.js") continue;
    fs.statSync(p).isDirectory() ? walk(p, out) : (/\.(jsx?|css)$/.test(f) && out.push(p));
  }
  return out;
}

// ============================================================
// v0.17 · YARDIMCILAR — denetim VERİYİ kendisi okur
//
// 🔴 Denetimin veriye JSX üzerinden bakması, ölçmek istediği şeyi
// ölçmemesine yol açıyordu. Artık lib/guide.js'in KENDİSİ okunuyor:
// ESM kaynağından `export` sözcükleri sıyrılıp aynı süreçte
// değerlendiriliyor. Böylece denetimin gördüğü veri, sayfanın
// kullandığı veriyle BİREBİR aynı — kopya bir liste tutulmuyor.
// ============================================================
function loadEntries() {
  const src = fs.readFileSync(path.join(__dirname, "lib/guide.js"), "utf8")
    .replace(/^export\s+/gm, "");
  const mod = new Function(src + "\nreturn { AIRPORTS, CARDS, ENTRIES, slugOf };")();
  return mod.ENTRIES.map((e) => ({ ...e, slug: mod.slugOf(e) }));
}

function loadGuide() {
  const src = fs.readFileSync(path.join(__dirname, "lib/guide.js"), "utf8")
    .replace(/^export\s+/gm, "");
  return new Function(src + "\nreturn { AIRPORTS, CARDS, ENTRIES, slugOf };")();
}

// HTML ile ham metni karşılaştırılabilir hâle getirir: yorumlar ve
// etiketler atılır, varlık kodları çözülür, boşluk sadeleştirilir.
function htmlNorm(x) {
  return String(x)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// 🔴 v0.17 — walk(".") CWD'ye bağımlıydı: denetim başka bir dizinden
// çağrılınca (npm --prefix, CI adımı, editör görevi) hiçbir dosya
// bulamayıp "0 dosya, temiz" diyordu. Bir denetimin sessizce boş
// koşması, hiç koşmamasından tehlikelidir — yeşil rapor verir.
// ============================================================
// ORTAK YARDIMCI — yorumsuz()
// Kaynak metinden // ve /* */ yorumlarını ve JSX yorumlarını atar.
// 🔴 Üç ayrı nöbetçi bu yüzden yanlış ateşledi (bkz. §5). Nöbetçiler
// KODU denetlemeli, kodun HAKKINDAKİ cümleleri değil.
// String literal içindeki "//" (örn. https://) korunuyor.
// ============================================================
function yorumsuz(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, " ")          // blok yorum (JSX yorumu dahil)
    .split("\n")
    .map((l) => l.replace(/(^|[^:])\/\/.*$/, "$1")) // satır yorumu ("://" hariç)
    .join("\n");
}

const ROOT = __dirname;
const files = walk(ROOT);
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

// --- 1a) v0.26 · HUKUKİ METİN YER TUTUCUSU ---
// 🔴 ÖLÇÜLDÜ, 19 Ağustos: /gizlilik sayfasının CANLI hâlinde
// "Veri sorumlusu {{SIRKET_UNVAN}}, adres: {{ADRES}}" yazıyor.
// App tarafında bu kapı vardı (rnapp/check.js legalPlaceholderCheck)
// ama SİTE tarafında yoktu — oysa siteyi arama motoru da okuyor,
// KVKK açısından da bu bir eksiklik. Kapı tek yerde durursa, kapısı
// olmayan taraftan çıkar.
{
  const yol = path.join(__dirname, "lib", "legal-source.js");
  if (fs.existsSync(yol)) {
    // 🔴 ÖNCE YORUMLAR SİLİNİR. İlk yazdığımda silmiyordum ve denetim
    // 6 bulgu verdi: dördü dosyanın KENDİ AÇIKLAMASINDA geçen
    // "{{MERSIS}} {{KEP}}" sözcükleriydi. Gerçek yer tutucu iki tane.
    // Yanlış alarm veren bir denetim, olmayan denetimden kötüdür:
    // insan kırmızıyı görmezden gelmeyi öğrenir. (Aynı hatayı bu
    // projede contract_check.py'de de yapmıştım — orada da düzeltildi.)
    const src = fs.readFileSync(yol, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:])\/\/.*$/gm, "$1");
    for (const m of src.matchAll(/\{\{([A-Z_]+)\}\}/g)) {
      console.log(`  ✗ lib/legal-source.js: doldurulmamış yer tutucu {{${m[1]}}} — ` +
                  `yayındaki gizlilik politikasında görünüyor. rnapp/src/legal.js'i doldur, buraya kopyala.`);
      bad++;
    }
  }
}

// --- 1b) v0.26 · AÇIK YÜZEY SIZINTISI ---
// 🔴 BU DENETİMİN VARLIK SEBEBİ, ÜÇ KEZ TEKRARLANAN AYNI KUSUR:
// sayfa zemini gece, ama bir bileşen kendine BEYAZ zemin veriyor ve
// üstündeki metin site paletinden (açık) geliyor. Sonuç 1.28:1 —
// yani metin ekranda yok. 19 Ağustos ölçümünde /kartlar'daki 144
// rozet tam olarak böyle görünmezdi.
//
// Kural: app maketi (Screens.jsx) DIŞINDA hiçbir dosya açık yüzey
// token'ı (--app*) ya da beyaza yakın bir zemin literali kullanamaz.
// Maket app'i temsil ettiği için istisna — ve tek istisna.
{
  const MAKET = ["components/Screens.jsx", "components\\Screens.jsx"];
  const acikZemin = /background\s*:\s*["']?\s*(#(?:FFF|FFFFFF|F8F6F1|F0EDE6|fff|ffffff)\b|var\(--app)/g;
  for (const f of files) {
    if (f.endsWith("globals.css")) continue;           // token tanımının kendisi
    if (MAKET.some((m) => f.endsWith(m))) continue;    // app maketi — bilinçli istisna
    const src = fs.readFileSync(f, "utf8");
    for (const m of src.matchAll(acikZemin)) {
      console.log(`  ✗ ${f}: gece sayfasında AÇIK zemin (${m[1]}) — üstündeki metin site` +
                  ` paletinden gelir ve okunmaz. Cam yüzey için var(--card) kullan.`);
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
collectRoutes(path.join(ROOT, "app"));

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
const OUT = path.join(ROOT, ".next/server/app/index.html");
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
    // 🔴 v0.41 — `shelf-item` YERİNE `karusel-kart`. Eski raf sabitti;
    // yeni galeri sürüklenebilir/3B. Sınıf adı değişti, denetim de
    // değişti — ama SİLİNMEDİ, çünkü kapsam düşerdi.
    ["karusel-kart", "hero ekran karuseli"],
    ["karusel-soz", "karusel altındaki 'ne işe yarar' cümlesi"],
    ["/screens/ss-kesfet.jpg", "gerçek ekran şeridi (ana)"],
    // 🔴 BURADA "scene-svg" ARANIYORDU — v0.4'te eklenen çizim gece
    // sahnesi. O sahne bu sürümde BİLEREK kaldırıldı: yerine app ile
    // aynı fotoğraf zemini geldi (`body::before` + `--perde`).
    // Kaldırılan bir bileşeni aramaya devam eden denetim, doğru işi
    // hata gibi gösterir; ve daha kötüsü, YENİ gelen şeyi hiç ölçmez.
    //
    // 🆕 SINIF: "BİR BİLEŞENİ KALDIRDIĞINDA ONU ARAYAN DENETİMİ SİLME —
    // YERİNE GELENİ ARAYACAK ŞEKİLDE DEĞİŞTİR; SİLERSEN KAPSAM DÜŞER."
    ["shot-tilt", "fotoğraf zemin üstünde eğik gerçek ekran"],
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
  // ══════════════════════════════════════════════════════════════
  // ÖLÜ BİLEŞEN — yazılmış, hiçbir yerden çağrılmayan .jsx
  //
  // 🔴 `components/Screens.jsx` altı ekranı elle HTML olarak yeniden
  // kuran, 300 satırlık bir bileşendi ve HİÇBİR YERDEN import
  // edilmiyordu. Üstelik README hâlâ "sitenin ekranları burada" diye
  // onu anlatıyordu. Yani ölü kod yalnız yer kaplamıyordu — BELGEYİ
  // de yanlış tutuyordu, ve okuyan kişi siteyi yanlış tanıyordu.
  //
  // 🆕 SINIF: "ÖLÜ KOD SESSİZ DEĞİLDİR — ONU ANLATAN BELGE HAYATTA
  // KALDIĞI SÜRECE, OKUYAN HERKESE YANLIŞ BİR ÜRÜN TARİF EDER."
  //
  // Arşivlenen bileşenler (`_arsiv/`) sayılmaz: onlar bilerek
  // saklanıyor, çağrılmamaları normal.
  {
    const bilesenDir = path.join(__dirname, "components");
    const dosyalar = fs.readdirSync(bilesenDir)
      .filter((f) => f.endsWith(".jsx"));
    const kaynak = [];
    for (const d of ["app", "components", "lib"]) {
      const yur = (p2) => {
        for (const e of fs.readdirSync(p2, { withFileTypes: true })) {
          if (e.name === "_arsiv" || e.name === "node_modules" ||
              e.name.startsWith("_yedek")) continue;
          const tam = path.join(p2, e.name);
          if (e.isDirectory()) yur(tam);
          else if (/\.(jsx?|mjs)$/.test(e.name)) kaynak.push(fs.readFileSync(tam, "utf8"));
        }
      };
      const kok2 = path.join(__dirname, d);
      if (fs.existsSync(kok2)) yur(kok2);
    }
    const hepsi = kaynak.join("\n");
    const olu = dosyalar.filter((f) => {
      const ad = f.replace(/\.jsx$/, "");
      return !new RegExp(`components/${ad}["'\`]`).test(hepsi)
          && !new RegExp(`<${ad}[\\s/>]`).test(hepsi);
    });
    if (olu.length) {
      console.log(`  ✗ ölü bileşen (hiçbir yerden çağrılmıyor): ${olu.join(", ")}`);
      console.log(`    Silme — components/_arsiv/ altına taşı ve onu anlatan belgeyi düzelt.`);
      bad++;
    } else {
      console.log(`  ✓ ${dosyalar.length} bileşenin hepsi en az bir yerden çağrılıyor`);
    }
  }

  // 🔴 FOTOĞRAF ZEMİNİ HTML'DE DEĞİL CSS'TE YAŞIYOR (`body::before`).
  // HTML'de bir sınıf arayarak ölçülemez; kaynağın kendisine bakılır.
  {
    const css = fs.readFileSync(path.join(__dirname, "app", "globals.css"), "utf8");
    const zemin = /body::before[\s\S]{0,400}?url\("\/bant\.jpg"\)/.test(css);
    const perde = /body::after[\s\S]{0,400}?var\(--perde/.test(css);
    if (!zemin) { console.log("  ✗ globals.css: body::before fotoğraf zemini yok"); bad++; }
    if (!perde) { console.log("  ✗ globals.css: body::after perdesi --perde token'ından gelmiyor"); bad++; }
    if (zemin && perde) console.log("  ✓ fotoğraf zemini + perde CSS'te canlı (app ile aynı bant.jpg)");
  }
  // 🔴 SINIF ADI ARAMAK, GALERİNİN DOLU OLDUĞUNU KANITLAMAZ.
  // `EkranKarusel` bir istemci bileşeni; JS'i çalışmasa bile SUNUCUDA
  // çizilmeli ve İLK HTML'de bütün kartlar bulunmalı. Aksi hâlde
  // arama motoru ve JS'siz ziyaretçi boş bir kutu görür — ve tek bir
  // sınıf adı basıldığı için denetim yeşil yanardı.
  //
  // 🆕 SINIF: "BİR BİLEŞENİN VARLIĞINI SINIF ADIYLA ÖLÇMEK, İÇİNİ
  // ÖLÇMEZ — SAYIYI SAY."
  {
    // content.js bir ESM modülü, check.js CommonJS — import edemiyorum.
    // O yüzden SHELF bloğu METİNDEN sayılıyor (bir bağımlılık eklemek
    // için fazla küçük bir iş).
    const cjs = fs.readFileSync(path.join(__dirname, "lib", "content.js"), "utf8");
    const blok = cjs.slice(cjs.indexOf("export const SHELF = ["));
    const shelf = blok.slice(0, blok.indexOf("\n];"));
    const kart = (html.match(/karusel-kart/g) || []).length;
    const bekle = (shelf.match(/src:/g) || []).length;
    const sozSay = (shelf.match(/soz:/g) || []).length;
    if (kart < bekle) {
      console.log(`  ✗ karusel ilk HTML'de ${kart} kart basıyor, beklenen ${bekle} (SSR düşmüş olabilir)`);
      bad++;
    } else {
      console.log(`  ✓ karusel ilk HTML'de ${kart}/${bekle} kartı basıyor (JS'siz de dolu)`);
    }
    // Her kartın bir CÜMLESİ olmalı: etiket ne olduğunu, cümle ne işe
    // yaradığını söyler. Cümlesiz bir kart, dekor bir karttır.
    if (sozSay < bekle) {
      console.log(`  ✗ ${bekle - sozSay} karusel kartının 'soz' cümlesi yok — etiket ne olduğunu söyler, cümle ne işe yaradığını`);
      bad++;
    }
  }
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
    //
    // 🔴 v0.17 — AYNI HATA YER DEĞİŞTİRMİŞ HÂLDE GERİ GELMİŞ. v0.4'te
    // yazdığım kural şuydu:
    //     const hasVerdict = /misafir|girersin|hakkın|Misafir/.test(gh);
    // Aranan "misafir" dizesi H1 ŞABLONUNUN kendisinde geçiyor
    // ("... ile ... misafir götürebilir misin?"). Yani sayfanın veri
    // kaydı BOMBOŞ olsa bile şablon o kelimeyi basıyor ve denetim
    // "temiz" diyor. lib/guide.js'te CARD_RULES'a title:"" body:""
    // yazıp mutasyonu ölçtüm: 60 sayfa gerçekten boş çıktı, denetim
    // yine yeşildi. v0.4'ün dersini yazmışım ama uygulamamışım —
    // "Turkish Airlines'ı ana sayfada aramak" ile "misafir'i H1'de
    // aramak" aynı hatanın iki hâli: denetim, ÖLÇMEK İSTEDİĞİ ŞEYİN
    // KENDİSİNE değil, onun yanındaki sabite bakıyor.
    //
    // DOĞRUSU: her sayfa için o sayfanın KENDİ veri kaydındaki
    // headline/detail metnini alıp HTML'de gerçekten arıyoruz. Veri
    // kaydı boşsa bu zaten hata. Şablonun sabitleri kimseyi kurtaramaz.
    const gdir = path.join(ROOT, ".next/server/app/rehber");
    if (fs.existsSync(gdir)) {
      // Veri kaynağını denetimin KENDİSİ okur; JSX'ten geçmez.
      const gsrc = fs.readFileSync(path.join(ROOT, "lib/guide.js"), "utf8");
      const entries = loadEntries();
      const bySlug = new Map(entries.map((e) => [e.slug, e]));

      const htmlFiles = fs.readdirSync(gdir).filter((x) => x.endsWith(".html"));
      if (htmlFiles.length !== entries.length) {
        console.log(`  ✗ rehber: ${entries.length} veri kaydı var ama ${htmlFiles.length} sayfa üretilmiş`);
        bad++;
      }
      for (const f of htmlFiles) {
        const slug = f.replace(/\.html$/, "");
        const gh = fs.readFileSync(path.join(gdir, f), "utf8");
        const e = bySlug.get(slug);
        if (!e) {
          console.log(`  ✗ rehber/${f}: üretilmiş ama lib/guide.js'te karşılığı yok`);
          bad++;
          continue;
        }
        // (a) veri kaydının kendisi dolu mu?
        for (const [alan, deger] of [["headline", e.headline], ["detail", e.detail]]) {
          if (!deger || String(deger).trim().length < 20) {
            console.log(`  ✗ rehber/${slug}: veri kaydında ${alan} boş — sayfa içeriksiz üretiliyor`);
            bad++;
          }
        }
        // (b) o metin GERÇEKTEN HTML'e basılmış mı? İlk 40 karakter.
        for (const [alan, deger] of [["headline", e.headline], ["detail", e.detail]]) {
          if (!deger) continue;
          const parca = htmlNorm(String(deger)).slice(0, 40);
          if (parca.length >= 20 && !htmlNorm(gh).includes(parca)) {
            console.log(`  ✗ rehber/${slug}: ${alan} HTML'e basılmamış → "${parca}…"`);
            bad++;
          }
        }
        if (gh.length < 4000) {
          console.log(`  ✗ rehber/${slug}: sayfa fazla kısa (${gh.length} bayt)`);
          bad++;
        }
      }
      void gsrc;
    }
  }
  // 🔴 v0.9 — §3 RİTİM DENETİMİ (MARKA_RUHU): her bölüm SAHNE→KANIT→DAVET
  // üçlüsünün üçüncü vuruşuyla kapanmalı. Bilgiyle bırakılan okuyucu
  // akıştan düşer. Bu denetim yazılmadan önce beş bölümde davet yoktu
  // ve kimse fark etmemişti — ritim "hissedilen" bir şey olduğu için
  // gözden kaçıyor; sayıya bağlanınca kaçmıyor.
  {
    const idx = fs.readFileSync(OUT, "utf8");
    const sectionCount = (idx.match(/section dark-band/g) || []).length;
    const beatCount = (idx.match(/class="beat"/g) || []).length;
    // Hero ve SSS/beta bölümleri kendi çağrılarını taşır; kalan içerik
    // bölümlerinin her biri bir davet vuruşu ister.
    // 🔴 İlk yazımda eşik 5'ti, oysa 6 vuruş vardı: bir vuruş silinse
    // denetim yine yeşil kalıyordu. Mutasyon testi bunu gösterdi —
    // eşik GERÇEK sayıya kilitlenir, yoksa denetim uyur.
    // 🔴 v0.17 — EŞİK UYUYORDU. Yorumda "eşik GERÇEK sayıya kilitlenir"
    // yazıyor ama kod 6 diyordu; gerçek vuruş 7'ydi. Yani bir vuruş
    // silinse denetim yine yeşil kalırdı — tam da yasakladığım şey.
    // Artık eşik sabit değil, KAYNAKTAN sayılıyor: app/page.jsx'te
    // kaç tane className="beat" varsa HTML'de o kadarı beklenir.
    // Kaynaktan bir vuruş silinirse beklenti de düşer ama alt sınır
    // (MIN_BEAT) korur; HTML'de eksik basılırsa hemen yakalanır.
    // 🔴 v0.17 — EŞİK UYUYORDU. Yorumda "eşik GERÇEK sayıya kilitlenir"
    // yazıyor ama kod 6 diyordu; gerçek vuruş 7'ydi. Yani bir vuruş
    // silinse denetim yeşil kalırdı — tam da yasakladığım şey.
    //
    // Ama asıl sorun sayının yanlış olması değil, SAYIYA bakıyor
    // olmasıydı. "En az 7 vuruş" kuralı, yedi vuruşun HANGİ bölümlerde
    // olduğunu söylemiyor: bir bölüm vuruşunu kaybedip başka bir bölüm
    // iki vuruş alsa toplam yine 7 çıkardı. §3'ün kuralı toplam değil,
    // BÖLÜM BAŞINA: her içerik bölümü davet vuruşuyla kapanır.
    // Artık HTML'deki her bölüm tek tek açılıp içinde vuruş aranıyor.
    // Alt sınır (MIN_BEAT) yine duruyor — bölüm silinerek "temiz"
    // görünmesin diye.
    const MIN_BEAT = 7;
    // Kendi çağrısını taşıyan bölümler: hero (btn-gold), SSS (soru
    // listesi), beta (dönüşümün kendisi).
    const MUAF = new Set(["sss", "beta"]);
    const bloklar = idx.split(/<section /).slice(1);
    let vurussuz = 0;
    for (const b of bloklar) {
      const bas = b.slice(0, b.indexOf("</section>") + 1 || b.length);
      if (!/class="[^"]*\bdark-band\b/.test(bas)) continue;
      if (/hero-dark/.test(bas)) continue;
      const idm = bas.match(/ id="([^"]+)"/);
      if (idm && MUAF.has(idm[1])) continue;
      if (!/class="beat"/.test(bas)) {
        console.log(`  ✗ §3 ritim: "${idm ? idm[1] : "(id yok)"}" bölümü davet vuruşuyla kapanmıyor`);
        vurussuz++;
      }
    }
    bad += vurussuz;
    if (beatCount < MIN_BEAT) {
      console.log(`  ✗ §3 ritim: ${sectionCount} bölümde yalnız ${beatCount} davet vuruşu var (en az ${MIN_BEAT} olmalı)`);
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

// ============================================================
// 4) HAVALİMANI KODLARI KATALOGLA EŞLEŞİYOR MU  (v0.17)
// 🔴 lib/guide.js'te KYA (Konya) ve VAN (Van Ferit Melen) yazılıydı.
// İkisi de SQL kataloğunda YOK. Sonuç: 12 rehber sayfası, kural
// motorunun hiç bilmediği bir havalimanı için "MİSAFİR GÖTÜREBİLİRSİN"
// diyordu. Uydurulmuş bir kod derlemede patlamaz, ölü bağlantı da
// vermez — çünkü sayfa gerçekten üretilir. Yakalayan tek şey KAYNAKLA
// KARŞILAŞTIRMAK.
// Liste dosyası: lib/sql-airports.txt (sql/001+002+107'den türetildi).
// ============================================================
{
  const listPath = path.join(ROOT, "lib/sql-airports.txt");
  if (!fs.existsSync(listPath)) {
    console.log("  ✗ lib/sql-airports.txt yok — havalimanı kodları kaynağa karşı ölçülemiyor");
    bad++;
  } else {
    const katalog = new Set(
      fs.readFileSync(listPath, "utf8").split("\n")
        .map((l) => l.trim()).filter((l) => /^[A-Z]{3}$/.test(l))
    );
    const { AIRPORTS } = loadGuide();
    for (const code of Object.keys(AIRPORTS)) {
      if (!katalog.has(code)) {
        console.log(`  ✗ lib/guide.js: ${code} (${AIRPORTS[code].name}) SQL kataloğunda YOK — uydurulmuş havalimanı`);
        bad++;
      }
    }
    // Liste dosyası da bayatlayabilir: SQL erişilebilirse yeniden ölçülür.
    const sqlDir = path.join(ROOT, "..", "sql");
    if (fs.existsSync(sqlDir)) {
      const gercek = new Set();
      for (const f of fs.readdirSync(sqlDir)) {
        if (!/^(001|002|107)/.test(f) || !f.endsWith(".sql")) continue;
        const txt = fs.readFileSync(path.join(sqlDir, f), "utf8");
        for (const line of txt.split("\n")) {
          const m = line.match(/^\s*\('([A-Z]{3})',/);
          if (m && /'TR'|Türkiye/.test(line)) gercek.add(m[1]);
        }
      }
      if (gercek.size) {
        for (const c of katalog) {
          if (!gercek.has(c)) {
            console.log(`  ✗ lib/sql-airports.txt bayatlamış: ${c} artık SQL'de yok`);
            bad++;
          }
        }
      }
    }
  }
}

// ============================================================
// 5) TEK MARKA İŞARETİ  (v0.17)
// 🔴 Ana sayfa /mark.svg kullanıyordu, 78 alt sayfa ise eski metin
// sembolünü. Aynı sitede iki marka işareti, markanın olmadığının
// işaretidir. Başlık artık components/SiteHeader.jsx'te; bu bekçi
// eski sembolün geri sızmasını engeller.
// ============================================================
{
  const ESKI = "\u25C8";
  // 🔴 21 AĞUSTOS — YORUM SATIRLARI TARANIYORDU.
  // Bu nöbetçi bugün beni yakaladı (doğru: metne o sembolü koymuştum).
  // Sonra düzeltmemi YORUMDA anlattım ve nöbetçi bir kez daha bağırdı.
  // Yani bir kusuru BELGELEMEK, nöbetçinin gözünde kusuru İŞLEMEKLE
  // aynı şeydi.
  //
  // 🆕 SINIF: **"BİR NÖBETÇİ, KUSURU ANLATAN CÜMLEYİ KUSURUN KENDİSİ
  // SANIYORSA, BELGELEMEYİ CEZALANDIRIYOR DEMEKTİR."**
  // Aynı tuzağa üçüncü kez düşüyorum (check.js'in kendi arama dizgesi,
  // legal yer-tutucu nöbetçisi, şimdi bu). Bu yüzden yorum ayıklama
  // artık ORTAK bir yardımcı: `yorumsuz()`.
  for (const f of files) {
    const src = yorumsuz(fs.readFileSync(f, "utf8"));
    if (src.includes(ESKI)) {
      console.log(`  ✗ ${path.relative(ROOT, f)}: eski metin marka sembolü (U+25C8) — /mark.svg kullan`);
      bad++;
    }
  }
}

// ============================================================
// 6) SES BİRLİĞİ: "sen"  (v0.17)
// 🔴 Ana sayfa ve uygulama "sen" diyordu, rehber baştan sona "siz".
// Aynı markanın iki ağzı olmaz. Bekçi rehber metinlerinde ikinci
// çoğul kalıplarını arar. Yasal metinler (legal-source) kapsam
// dışı: onlar hukuk dilinde ve app'ten birebir kopya.
// ============================================================
{
  const SIZ = /\b(\w*(?:siniz|sınız|sunuz|sünüz|iniz|ınız|unuz|ünüz)|misiniz|mısınız|sizin|sizi|size)\b/gi;
  // v0.20 — /kart sayfaları da kapsamda. 144 yeni sayfa bekçinin
  // dışında kalsaydı ses birliği ilk günden bozulurdu; bekçinin
  // büyümeyi takip etmesi, bekçi yazmak kadar önemli.
  const KAPSAM = [
    "lib/guide.js", "app/rehber/page.jsx", path.join("app", "rehber", "[slug]", "page.jsx"),
    "lib/card-pages.js", "app/kartlar/page.jsx", path.join("app", "kart", "[slug]", "page.jsx"),
  ];
  for (const rel of KAPSAM) {
    const f = path.join(ROOT, rel);
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, "utf8")
      .split("\n")
      .filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l))   // yorum satırları hariç
      .join("\n");
    const hits = [...new Set((src.match(SIZ) || []).map((x) => x.toLowerCase()))];
    if (hits.length) {
      console.log(`  ✗ ${rel}: "siz" kalıbı kaldı (${hits.slice(0, 5).join(", ")}) — site "sen" ile konuşur`);
      bad++;
    }
  }
}

// ============================================================
// 7) SITEMAP EKSİKSİZ Mİ  (v0.17)
// 🔴 /cerez, /aydinlatma ve /hesap-sil sayfaları vardı ama sitemap'te
// yoktu: rehber kısmı veriden üretildiği için güncelken, elle yazılan
// yasal kısım geride kalmıştı. Bir sayfa sitemap'te yoksa Google onu
// çok daha geç bulur — ya da hiç bulmaz.
// ============================================================
{
  const smPath = path.join(ROOT, "app/sitemap.js");
  if (fs.existsSync(smPath)) {
    const sm = fs.readFileSync(smPath, "utf8");
    for (const r of routes) {
      if (r === "/") continue;
      if (r.includes("[")) continue;              // dinamik rota, allSlugs kapsıyor
      if (!sm.includes(`"${r}"`)) {
        console.log(`  ✗ app/sitemap.js: ${r} sayfası var ama sitemap'te yok`);
        bad++;
      }
    }
  }
  // Yasal sayfalarda description zorunlu: yoksa Google açıklamayı
  // sayfadan rastgele seçer ("Sürüm: 2026-01" gibi).
  for (const f of files) {
    if (!/app[\\/](gizlilik|kosullar|cerez|aydinlatma|hesap-sil)[\\/]page\.jsx$/.test(f)) continue;
    const src = fs.readFileSync(f, "utf8");
    if (!/description\s*:/.test(src)) {
      console.log(`  ✗ ${path.relative(ROOT, f)}: metadata.description yok`);
      bad++;
    }
  }
  // OG görseli gerçekten var mı? Etiket yazmak dosyayı var etmez.
  const ogRefs = new Set();
  for (const f of files) {
    for (const m of fs.readFileSync(f, "utf8").matchAll(/["'](\/og[\w.-]*\.(?:jpg|png))["']/g)) ogRefs.add(m[1]);
  }
  for (const ref of ogRefs) {
    if (!fs.existsSync(path.join(ROOT, "public", ref))) {
      console.log(`  ✗ og görseli ${ref} etiketlerde geçiyor ama public'te YOK`);
      bad++;
    }
  }
}

// ============================================================
// 8) SALON KATALOĞU KAYNAĞIYLA EŞLEŞİYOR MU  (v0.18)
// 🔴 lib/lounges-data.js ÜRETİLMİŞ bir dosya. Üretilmiş dosyanın en
// büyük riski elle düzenlenmesi ya da kaynak değişince yeniden
// üretilmemesidir: ikisi de derlemede patlamaz, sessizce bayatlar.
// Bekçi iki şeyi ölçer:
//   (a) havalimanı kodları data/salonlar.csv ile BİREBİR aynı mı,
//   (b) salon sayısı 100'ün altına düştü mü (veri kaybı imzası).
// Vitrindeki kapsam sayıları bu dosyadan okunuyor; dosya bayatlarsa
// site yine yanlış sayı gösterir — v0.17'de "22 havalimanı" ile
// yaşadığımız hatanın aynısı, bu kez ters yönde.
// ============================================================
{
  const csvPath = path.join(ROOT, "data/salonlar.csv");
  const dataPath = path.join(ROOT, "lib/lounges-data.js");
  if (!fs.existsSync(csvPath) || !fs.existsSync(dataPath)) {
    console.log("  ✗ data/salonlar.csv veya lib/lounges-data.js yok — kapsam kaynağa karşı ölçülemiyor");
    bad++;
  } else {
    // CSV'yi denetim KENDİ okur (tırnaklı alanlar, gömülü virgüller).
    const parse = (text) => {
      const rows = []; let row = [], field = "", q = false;
      const s = text.replace(/\r\n?/g, "\n");
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (q) { if (c === '"') { if (s[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c; }
        else if (c === '"') q = true;
        else if (c === ",") { row.push(field); field = ""; }
        else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
        else field += c;
      }
      if (field.length || row.length) { row.push(field); rows.push(row); }
      return rows.filter((r) => r.some((x) => x.trim() !== ""));
    };
    const rows = parse(fs.readFileSync(csvPath, "utf8"));
    const head = rows[0].map((h) => h.trim());
    const iKod = head.indexOf("havalimani_kodu");
    const iAd = head.indexOf("havalimani_adi");
    // Üreteçle aynı isim→kod eşlemesi; kaynakta kodu boş olan tek satır.
    const AD_KOD = { "Çukurova Uluslararası Havalimanı": "COV" };
    const csvKodlar = new Set();
    for (const r of rows.slice(1)) {
      const kod = ((r[iKod] || "").trim() || AD_KOD[(r[iAd] || "").trim()] || "").toUpperCase();
      if (/^[A-Z]{3}$/.test(kod)) csvKodlar.add(kod);
    }

    const mod = new Function(
      fs.readFileSync(dataPath, "utf8").replace(/^export\s+/gm, "") +
      "\nreturn { AIRPORTS_FULL, LOUNGE_COUNTS };"
    )();
    const jsKodlar = new Set(mod.AIRPORTS_FULL.map((a) => a.code));

    for (const k of jsKodlar) {
      if (!csvKodlar.has(k)) {
        console.log(`  ✗ lib/lounges-data.js: ${k} kodu CSV'de YOK — dosya elle düzenlenmiş olabilir`);
        bad++;
      }
    }
    for (const k of csvKodlar) {
      if (!jsKodlar.has(k)) {
        console.log(`  ✗ lib/lounges-data.js bayatlamış: CSV'deki ${k} üretilen dosyada yok (node scripts/gen-lounges.mjs)`);
        bad++;
      }
    }
    const gercekSalon = mod.AIRPORTS_FULL.reduce((n, a) => n + a.lounges.length, 0);
    if (gercekSalon < 100) {
      console.log(`  ✗ salon kataloğu ${gercekSalon} salona düşmüş (alt sınır 100) — veri kaybı`);
      bad++;
    }
    if (mod.LOUNGE_COUNTS.lounges !== gercekSalon || mod.LOUNGE_COUNTS.airports !== jsKodlar.size) {
      console.log("  ✗ lib/lounges-data.js: LOUNGE_COUNTS listeyle uyuşmuyor — vitrindeki sayı yanlış");
      bad++;
    }
    // Sayı gerçekten SAYFAYA basılmış mı? Veri doğru olup ekrana
    // düşmemesi, veriyi hiç toplamamakla aynı sonucu verir.
    if (fs.existsSync(OUT)) {
      // 🔴 BAYAT HTML DENETİMİ (v0.22).
      // Bu blok "sayı sayfada geçiyor mu" diye bakıyordu ve bir kez
      // ÖLÇÜMLE yalanlandı: `lounges-data.js` 281 → 284 olarak yeniden
      // üretildikten sonra, HTML hâlâ 281'liyken denetim YEŞİL yandı.
      // Sebep basit — "284" dizesi sayfada başka bir yerde de geçebilir
      // ve daha önemlisi HTML hiç yeniden üretilmemişti.
      //
      // Bir denetimin yeşil yanması, denetlenen şeyin doğru olduğunu
      // göstermiyorsa o denetim gürültüdür. Artık ÖNCE tazelik ölçülüyor:
      // veri dosyası HTML'den daha yeniyse, HTML bayattır ve sayı
      // karşılaştırmasının hiçbir anlamı yoktur.
      const veriYolu = path.join(__dirname, "lib", "lounges-data.js");
      const tHtml = fs.statSync(OUT).mtimeMs;
      const tVeri = fs.existsSync(veriYolu) ? fs.statSync(veriYolu).mtimeMs : 0;
      if (tVeri > tHtml) {
        const fark = Math.round((tVeri - tHtml) / 1000);
        console.log(`  ✗ ana sayfa HTML'i BAYAT — lib/lounges-data.js ${fark} sn daha yeni. ` +
                    `Sayı denetimi bu hâlde anlamsız; önce \`npm run build\`.`);
        bad++;
      }
      const html = fs.readFileSync(OUT, "utf8");
      if (!html.includes(String(mod.LOUNGE_COUNTS.lounges))) {
        console.log(`  ✗ ana sayfada salon sayısı (${mod.LOUNGE_COUNTS.lounges}) geçmiyor — kapsam bölümü boş dönüyor olabilir`);
        bad++;
      }
      if (!/class="cover-item"/.test(html)) {
        console.log("  ✗ ana sayfada kapsam listesi (cover-item) yok — havalimanları basılmamış");
        bad++;
      }
    }
  }
}

// ============================================================
// 8) UYDURMA SOSYAL KANIT NÖBETÇİSİ  (v0.29)
//
// 🔴 NEDEN VAR: bu turda siteye iki "sosyal kanıt" alanı eklendi —
// kurucu çember sayacı ve gerçek host cümleleri. İkisinin de doğru
// hâli AYNI: veri yoksa HİÇBİR ŞEY çizme. Ama ikisinin de yanlış
// hâli çok cazip ve çok kolay: sayaca "37" yazmak, hikâyelere üç
// tane uydurma referans koymak. İkisi de beş dakika sürer ve site
// bir anda "canlı" görünür.
//
// Bir yorum satırı bunu engellemez (228'de öğrenildi: yorum 100 gün
// kimseyi durdurmadı). Nöbetçi denetliyor:
//   · KurucuSayac.jsx içinde sayı sabiti olamaz
//   · HostStories.jsx içinde tırnak içi uzun Türkçe cümle olamaz
//   · ikisi de veri yokken `null` dönmek ZORUNDA
//
// 🆕 SINIF: "BİR KURALI METİNDE YAZMAK, ONU SİSTEMDE UYGULAMAK
// DEĞİLDİR." (228'in sınıfı — bu kez siteye uygulanıyor.)
// ============================================================
{
  const kontrol = [
    { dosya: "components/KurucuSayac.jsx", ad: "sayaç" },
    { dosya: "components/HostStories.jsx", ad: "host hikâyeleri" },
  ];
  for (const k of kontrol) {
    const tam = path.join(ROOT, k.dosya);
    if (!fs.existsSync(tam)) {
      console.log(`  ✗ ${k.dosya} yok — ${k.ad} bölümü kaldırıldıysa bu nöbetçi de güncellenmeli`);
      bad++;
      continue;
    }
    const kod = yorumsuz(fs.readFileSync(tam, "utf8"));

    // (a) veri yoksa çizme kuralı
    if (!/return\s+null\s*;/.test(kod)) {
      console.log(`  ✗ ${k.dosya}: veri yokken \`return null\` yok — boş durumda yer tutucu çiziyor olabilir`);
      bad++;
    }

    // (b) uydurma metin: 25+ karakterlik, boşluk içeren dize sabiti.
    //     JSX metni tırnak içinde DEĞİL, o yüzden gerçek arayüz metni
    //     bu denetime takılmaz; takılan şey koda GÖMÜLMÜŞ cümledir.
    const dizeler = kod.match(/"[^"\n]{25,}"|'[^'\n]{25,}'/g) || [];
    for (const d of dizeler) {
      if (/[ ]/.test(d) && !/^["'][./@a-zA-Z0-9_-]+["']$/.test(d)) {
        console.log(`  ✗ ${k.dosya}: koda gömülü uzun metin — ${d.slice(0, 46)}…`);
        console.log(`     Sosyal kanıt veriden gelir. Uydurma referans, uydurulmuş bir ölçümdür.`);
        bad++;
      }
    }
  }

  // (c) sayaçta sabit sayı olamaz — "37 / 100" koda yazılamaz.
  const sy = path.join(ROOT, "components/KurucuSayac.jsx");
  if (fs.existsSync(sy)) {
    const kod = yorumsuz(fs.readFileSync(sy, "utf8"));
    // 0/1/100 hariç: 100 yüzde hesabı, 0/1 mantık sabiti.
    const sayilar = (kod.match(/(?<![\w.$])\d{1,6}(?![\w.])/g) || [])
      .filter((n) => !["0", "1", "100"].includes(n));
    if (sayilar.length) {
      console.log(`  ✗ components/KurucuSayac.jsx: sabit sayı bulundu (${sayilar.join(", ")}) — ` +
                  `kontenjan ve dolan sayısı YALNIZ kurucu_cember() RPC'sinden gelir`);
      bad++;
    }
  }
}

// ============================================================
// §9 — İMZALANMAMIŞ MARKA ADI VİTRİNE ÇIKAMAZ  (23 Ağustos)
//
// 🔴 NEDEN: HostEarn.jsx'te "Emirates Skywards", "Marriott Bonvoy",
// "Booking.com", "SafetyWing" yazıyordu. Hiçbiriyle imzalanmış ortaklık
// YOK. Bir markanın adını ödül vitrinine koymak, o markayla anlaşmış
// olduğunu söylemektir — kullanıcı öyle okur.
//
// 🆕 SINIF: "HENÜZ ANLAŞMADIĞIN BİR MARKANIN ADINI VİTRİNE KOYMAK,
// ÜRÜNÜ DEĞİL SÖZÜ SATMAKTIR."
//
// Bir ortaklık imzalandığında markayı AŞAĞIDAKİ listeden çıkarırsın;
// nöbetçi o markaya izin verir. Yani listeyi kısaltmak, imza atmak
// kadar bilinçli bir hareket olur.
{
  const IMZASIZ = ["Emirates", "Skywards", "Marriott", "Bonvoy", "Booking.com",
                   "SafetyWing", "Airalo", "Priority Pass", "DragonPass",
                   "Miles&Smiles", "Türk Hava Yolları", "THY"];
  // 🔴 ILK YAZDIGIMDA BU KONTROL BUTUN SITEYI TARIYORDU ve 29 ihlal
  // buldu — hemen hepsi DOGRU kullanimlardi. `lib/lounges-data.js`,
  // /rehber ve /kart sayfalari Priority Pass'i, Miles&Smiles'i adiyla
  // ANMAK ZORUNDA: kural motorunun konusu tam olarak "hangi kartla
  // hangi salona girersin". Bir programin adini ANMAK, o programla
  // ORTAK OLDUGUNU soylemek degildir.
  //
  // 🆕 SINIF: "BIR YASAK, BAGLAMI OLMADAN YAZILIRSA DOGRU KULLANIMI DA
  // CEZALANDIRIR."
  //
  // Kapsam bu yuzden dar: YALNIZ ODUL VITRINI. Yeni bir vitrin dosyasi
  // eklersen adini buraya yaz.
  // 🔴 23 AGUSTOS · IKINCI TUR: Gokberk marka ornekleri ISTEDI ("Amazon
  // hediye karti", "THY 1000 mil"...). Bu onun karari ve mesru: ornek
  // olmadan kimse magazayi anlamiyor.
  //
  // Ama "ornek" ile "soz" arasindaki farki KULLANICI goremez — bu yuzden
  // yasagi kaldirmiyorum, KOSULA baglıyorum: marka adi gecebilir, ama
  // ancak ekranda "ornektir, ortaklik henuz yok" notu BASILIYORSA.
  // Ikisi birlikte durur ya da ikisi de durmaz.
  //
  // 🆕 SINIF: "BIR YASAGI KALDIRMAK YERINE KOSULA BAGLAMAK, HEM KARARI
  // HEM DURUSTLUGU AYNI ANDA KORUR."
  const VITRIN = ["components/HostEarn.jsx"];
  const NOT_KALIBI = /ortakl[ıi]k/i;      // "Magaza ornektir; ortakliklar ..."
  for (const yol of files) {
    const gr = path.relative(ROOT, yol).split(path.sep).join("/");
    if (!VITRIN.includes(gr)) continue;
    const hamKod = fs.readFileSync(yol, "utf8");
    const notVar = /ORNEK_NOTU\s*=/.test(hamKod)
                && NOT_KALIBI.test(hamKod)
                && /\{ORNEK_NOTU\}/.test(hamKod);   // tanimli DEGIL, BASILIYOR mu
    if (notVar) continue;                               // kosul saglandi, marka serbest
    const kod = yorumsuz(fs.readFileSync(yol, "utf8"));
    const gosterim = path.relative(ROOT, yol);
    for (const marka of IMZASIZ) {
      if (kod.includes(marka)) {
        console.log(`  ✗ ${gosterim}: imzalanmamis marka adi — "${marka}"`);
        console.log(`     Ortaklik imzalanmadan marka adi vitrine yazilamaz.`);
        console.log(`     Imzalandiysa check.js §9'daki IMZASIZ listesinden cikar.`);
        bad++;
      }
    }
  }
}

// ============================================================
// §10 — VERİ SORUMLUSU KİMLİĞİ (26 Ağustos)
//
// 🔴 NEDEN: `lib/legal-source.js` yer tutucularla (`{{SIRKET_UNVAN}}`,
// `{{ADRES}}`, `{{MERSIS}}`, `{{KEP}}`) yazılmış ve `LegalPage.jsx` içinde
// "`{{` görürsen uyar" diye bir kontrol var. Ama yer tutucular YANLIŞ
// DEĞERLE dolduruldu:
//     COMPANY = "LoungeLink"                  ← ticaret unvanı DEĞİL
//     ADDRESS = "İstanbul, Türkiye — APA GIZ PLAZA"  ← kat/no/ilçe yok
//     MERSİS ve KEP → metinlere HİÇ girmemiş
// Yani kontrol sustu, sorun çözülmedi.
//
// 🆕 SINIF: "BİR YER TUTUCUYU YANLIŞ DEĞERLE DOLDURMAK, ONU BOŞ BIRAKMAKTAN
// TEHLİKELİDİR — ÇÜNKÜ BOŞLUĞU ARAYAN NÖBETÇİYİ SUSTURUR."
//
// UYARI, HATA DEĞİL: bu bilgileri yalnız Gökberk doldurabilir (şirket kararı).
// Ama her derlemede GÖRÜNSÜN ki unutulmasın.
// ============================================================
{
  const src = fs.readFileSync(path.join(ROOT, "lib", "legal-source.js"), "utf8");
  // 🔴 İLK YAZIMDA YORUM SATIRLARINI DA OKUDUM ve dosyanın 48. satırındaki
  // ÖRNEĞİ (`//     const COMPANY = "Gökberk İnak";`) gerçek değer sandım.
  // Nöbetçi, "COMPANY yanlış" demesi gereken yerde yeşil yandı.
  // 🆕 SINIF: "BİR KAYNAK DOSYASINI DÜZ METİN OLARAK ARAYAN NÖBETÇİ, O
  // DOSYADAKİ ÖRNEĞİ GERÇEK SANAR — VE ÖRNEKLER HEP DOĞRU YAZILIR."
  const srcAktif = src.split("\n").filter(l => !/^\s*\/\//.test(l)).join("\n");
  const oku = (ad) => (srcAktif.match(new RegExp(`^const ${ad} = "([^"]*)"`, "m")) || [])[1] || "";
  const company = oku("COMPANY"), address = oku("ADDRESS"), contact = oku("CONTACT");
  const eksik = [];
  if (/^loungelink$/i.test(company.trim()))
    eksik.push(`COMPANY = "${company}" — bu bir marka adi, TICARET UNVANI ya da GERCEK KISI adi degil (KVKK m.10 kimlik ister)`);
  if (!/\d/.test(address))
    eksik.push(`ADDRESS = "${address}" — kat/no/ilce/posta kodu yok, teblig edilebilir bir adres degil`);
  if (!/MERSIS|MERSİS/i.test(srcAktif)) eksik.push("MERSIS numarasi metinlerde HIC gecmiyor");
  if (!/KEP/i.test(srcAktif)) eksik.push("KEP adresi metinlerde HIC gecmiyor");
  const siteMail = (fs.readFileSync(path.join(ROOT, "lib", "content.js"), "utf8")
                      .match(/email:\s*"([^"]+)"/) || [])[1] || "";
  const alan = (m) => (m.split("@")[1] || "").toLowerCase();
  if (contact && siteMail && alan(contact) !== alan(siteMail))
    eksik.push(`ALAN ADI CAKISMASI: yasal iletisim ${contact} (${alan(contact)}) ama site ${siteMail} (${alan(siteMail)}) — KVKK basvurusu teslim edilemezse sorumluluk veri sorumlusundadir`);
  if (eksik.length) {
    console.log("");
    console.log(`  ⚠ VERI SORUMLUSU KIMLIGI EKSIK (${eksik.length} madde) — yalniz sen doldurabilirsin:`);
    for (const e of eksik) console.log(`      · ${e}`);
    console.log("      Duzeltilecek yer: lib/legal-source.js satir 64-66");
  }
}

// ============================================================
// v0.37 · SİTE ↔ APP PALET UYUMU
//
// 🔴 Site, ana sayfadaki telefon maketini `--app*` token'larıyla
// çiziyor ve o token'lar en son v0.7'de elle yazılmıştı. Uygulama
// v3.1'de lacivert nötr ailesini TAMAMEN bıraktı; site haberdar
// olmadı. Yani pazarlama yüzü, ARTIK OLMAYAN bir ürünün ekran
// görüntüsünü gösteriyordu — ve palet denetimi "temiz" diyordu,
// çünkü o "renk listede mi" sorar, "liste hâlâ doğru mu" sormaz.
//
// 🆕 SINIF: "AYNI ÜRÜNÜ İKİ YERDE TARİF EDİYORSAN, BİRİ DEĞİŞTİĞİNDE
// ÖTEKİ YANLIŞ OLUR — VE YANLIŞ OLAN GENELDE İNSANLARIN İLK GÖRDÜĞÜ
// TARAFTIR."
try {
  const { spawnSync } = require("child_process");
  for (const py of ["python3", "python"]) {
    let calisti = false;
    // 🔴 30 Ağu · v0.44 — `app_paleti.py` ARŞİVE ALINDI.
    // O betik sitedeki AÇIK "app maketi" paletini uygulamanın AÇIK
    // temasından türetiyordu. İkisi de artık yok: uygulama tek temalı
    // (gece), sitedeki maket paleti de kaldırıldı. Betiği listede
    // bırakmak, olmayan bir temayı denetlemek olurdu.
    for (const [betik, arg] of [
                                ["site_paleti.py", ["--denetle"]],
                                ["ekran_goruntusu_check.py", []]]) {
      const r = spawnSync(py, [path.join(ROOT, betik), ...arg], { encoding: "utf8" });
      if (r.error) break;
      calisti = true;
      process.stdout.write(r.stdout || "");
      if (r.status !== 0) bad++;
    }
    if (calisti) break;
  }
} catch (e) {
  console.log("  ⚠ app_paleti.py çalıştırılamadı: " + e.message);
}

console.log("=".repeat(60));
if (bad === 0) console.log(`✓ Site denetimi temiz — ${files.length} dosya, ${routes.size} sayfa`);
else console.log(`✗ ${bad} sorun bulundu.`);
process.exit(bad ? 1 : 0);
