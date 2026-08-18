#!/usr/bin/env node
// ============================================================
// LoungeLink · salon verisi ÜRETECİ  (v0.18)
//
// 🔴 NEDEN VAR: kapsam sitede yansımıyordu. lib/guide.js 15 Türkiye
// havalimanı taşıyordu, vitrin de o 15'i sayıyordu — oysa elimizdeki
// gerçek katalog 200'ün üzerinde havalimanı kapsıyor. "Bizim
// kapsamımız bundan çok çok daha fazlası" (Gökberk) — doğru, ama
// siteye girenin göreceği tek şey siteye YAZILAN kapsamdır.
//
// 🔴 ELLE KOPYALAMA YASAK. Kaynak CSV değişince tek komutla yeniden
// üretilir:  node scripts/gen-lounges.mjs
// Elle yazılmış bir liste ilk kural değişikliğinde bayatlar ve kimse
// fark etmez; üretilen liste bayatlayamaz.
//
// Akış:  yeni/salonlar.csv  →  data/salonlar.csv (repo içi kopya)
//                           →  lib/lounges-data.js (JS modülü)
// Repo içi kopya şart: check.js'in bekçisi kaynağa karşı ölçüm yapar
// ve o ölçüm, repo dışındaki bir dosyaya bağlıysa CI'da sessizce
// atlanır. Sessizce atlanan bir denetim, olmayan denetimden kötüdür.
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] || path.join(ROOT, "..", "yeni", "salonlar.csv");
const VENDOR = path.join(ROOT, "data", "salonlar.csv");
const OUT = path.join(ROOT, "lib", "lounges-data.js");

// --- RFC4180 alanları: tırnak içinde virgül ve satır sonu var ---
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  const s = text.replace(/\r\n?/g, "\n");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '"') { if (s[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim() !== ""));
}

// 🔴 KAYNAKTAKİ BOŞ KOD ELLE DÜZELTİLMEZ, EŞLEŞTİRİLİR.
// salonlar.csv'de Çukurova satırının havalimani_kodu boş. Kodu CSV'ye
// elle yazmak kaynağı bozar (kaynak dışarıdan yenileniyor); burada
// isimden eşleştiriyoruz ve eşleşme tutmazsa satır DÜŞÜYOR — sessizce
// yanlış koda yazmaktan iyidir.
const AD_KOD = { "Çukurova Uluslararası Havalimanı": "COV" };

const source = fs.readFileSync(SRC, "utf8");
const rows = parseCsv(source);
const head = rows[0].map((h) => h.trim());
const recs = rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));

// ============================================================
// 🔴 v0.21 — "both" KAPSAMI SESSİZCE KAYBOLUYORDU.
// Eski satır şuydu:
//     scope: r.kapsam === "domestic" ? "domestic" : "international"
// Yani "domestic" olmayan HER ŞEY dış hat sayılıyordu. Ölçüm
// (data/salonlar.csv, 285 satır):
//     domestic 24 · international 15 · both 245
// 245 satır, yani kataloğun %86'sı "both" taşıyor ve hepsi yalnız
// DIŞ HAT listesine düşüyordu. Sonuç: iç hatta da hizmet veren 245
// salon, iç hat listelerinde HİÇ görünmüyordu — Türkiye'de 9,
// yurt dışında 236 salon. Kayıp derlemede patlamaz, denetim de
// görmezdi; çünkü toplam salon sayısı doğru kalıyor, yalnız
// bölünme yanlış oluyordu.
// Artık kapsam olduğu gibi taşınıyor ve "both" İKİ listeye birden
// düşüyor (bkz. üretilen dosyadaki inScope / splitScope).
// Tanımadığımız bir değer gelirse ESKİ davranış korunur (dış hat)
// ama SESSİZ kalmaz: aşağıda sayılır ve konsola basılır.
// ============================================================
function kapsamCoz(ham) {
  const k = (ham || "").trim().toLowerCase();
  if (k === "domestic") return "domestic";
  if (k === "international" || k === "abroad") return "international";
  if (k === "both") return "both";
  return null;
}

const airports = new Map();
const seen = new Set();
let dropped = 0, dupes = 0, bilinmeyenKapsam = 0;
const kapsamSayim = { domestic: 0, international: 0, both: 0 };

for (const r of recs) {
  const code = (r.havalimani_kodu || AD_KOD[r.havalimani_adi] || "").toUpperCase();
  if (!/^[A-Z]{3}$/.test(code) || !r.salon_adi) { dropped++; continue; }

  // 🔴 DUPLICATE KURALI: aynı isimde iç hat + dış hat salonu İKİ AYRI
  // SALONDUR (IST'te gerçekten iki ayrı fiziksel salon var). Bu yüzden
  // kimlik yalnız isim değil: havalimanı + salon adı + kapsam + bölüm.
  // Yalnız bu dördü de aynıysa aynı satırın iki kaynaktan (yurtdisi +
  // anlasmali listesi) gelmiş kopyasıdır; tek gösterilir.
  const key = [code, r.salon_adi, r.kapsam, r.bolum].join("|").toLocaleLowerCase("tr");
  if (seen.has(key)) { dupes++; continue; }
  seen.add(key);

  if (!airports.has(code)) {
    airports.set(code, {
      code,
      name: r.havalimani_adi,
      city: r.sehir,
      country: r.ulke,
      tr: r.ulke === "Türkiye",
      lounges: [],
    });
  }
  // domestic → iç hat · international/abroad → dış hat · both → ikisi de
  let scope = kapsamCoz(r.kapsam);
  if (!scope) { bilinmeyenKapsam++; scope = "international"; }
  kapsamSayim[scope]++;

  airports.get(code).lounges.push({
    name: r.salon_adi,
    terminal: r.terminal || null,
    section: r.bolum || null,
    scope,
    operator: r.isletmeci && r.isletmeci !== "bilinmiyor" ? r.isletmeci : null,
  });
}

// Türkiye önce (ana pazar), sonra salon sayısı, sonra kod.
// 🔴 Sıralama bir KARAR: ana pazar listenin başında durmazsa ziyaretçi
// "benim havalimanım yok" diye çıkar.
const TR_ONCELIK = ["IST", "SAW", "ESB", "ADB", "AYT"];
const list = [...airports.values()].sort((a, b) => {
  if (a.tr !== b.tr) return a.tr ? -1 : 1;
  if (a.tr && b.tr) {
    const ia = TR_ONCELIK.indexOf(a.code), ib = TR_ONCELIK.indexOf(b.code);
    if (ia !== ib) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  }
  return b.lounges.length - a.lounges.length || a.code.localeCompare(b.code);
});

const tr = list.filter((a) => a.tr);
const abroad = list.filter((a) => !a.tr);
const sayLounge = (arr) => arr.reduce((n, a) => n + a.lounges.length, 0);

const counts = {
  airports: list.length,
  lounges: sayLounge(list),
  countries: new Set(list.map((a) => a.country)).size,
  trAirports: tr.length,
  trLounges: sayLounge(tr),
  trCities: new Set(tr.map((a) => a.city)).size,
  abroadAirports: abroad.length,
  abroadLounges: sayLounge(abroad),
  abroadCountries: new Set(abroad.map((a) => a.country)).size,
};

const banner = `// ============================================================
// ⚠️ ÜRETİLMİŞ DOSYA — ELLE DÜZENLENMEZ.
// Kaynak: data/salonlar.csv  ·  Üreteç: scripts/gen-lounges.mjs
// Yeniden üretmek için:  node scripts/gen-lounges.mjs
//
// Ölçüm (bu üretimde): ${counts.airports} havalimanı · ${counts.lounges} salon ·
// ${counts.countries} ülke · Türkiye: ${counts.trAirports} havalimanı / ${counts.trLounges} salon.
// Atlanan satır: ${dropped} (havalimanı kodu çözülemedi) · birleştirilen kopya: ${dupes}.
// Aynı isimli iç hat / dış hat salonları AYRI kayıttır; kopya sayılmaz.
//
// Kapsam dağılımı: iç hat ${kapsamSayim.domestic} · dış hat ${kapsamSayim.international} ·
// ikisi birden ${kapsamSayim.both} · çözülemeyen kapsam ${bilinmeyenKapsam} (dış hat sayıldı).
// "both" kayıtları HEM iç hat HEM dış hat listesine düşer; v0.21'e kadar
// yalnız dış hatta düşüyorlardı ve iç hat listelerinden sessizce siliniyorlardı.
// ============================================================
`;

const body = `${banner}
export const AIRPORTS_FULL = ${JSON.stringify(list, null, 2)};

export const TR_AIRPORTS = AIRPORTS_FULL.filter((a) => a.tr);
export const ABROAD_AIRPORTS = AIRPORTS_FULL.filter((a) => !a.tr);

export const LOUNGE_COUNTS = ${JSON.stringify(counts, null, 2)};

export const findAirport = (code) =>
  AIRPORTS_FULL.find((a) => a.code === String(code).toUpperCase());

// İç hat / dış hat ayrımı: kapsam kolonu bunu taşıyor.
// Kapsam üç değer alır: "domestic" · "international" · "both".
// "both" salonu her iki terminalde de hizmet verir, bu yüzden İKİ
// listede birden görünür — tek listeye sıkıştırmak, o salonu diğer
// terminalde YOK saymak demektir.
export const inScope = (l, scope) => l.scope === scope || l.scope === "both";

export const splitScope = (a) => ({
  domestic: a.lounges.filter((l) => inScope(l, "domestic")),
  international: a.lounges.filter((l) => inScope(l, "international")),
});
`;

fs.mkdirSync(path.dirname(VENDOR), { recursive: true });
fs.writeFileSync(VENDOR, source);
fs.writeFileSync(OUT, body);

console.log(`✓ ${path.relative(ROOT, VENDOR)} · ${path.relative(ROOT, OUT)}`);
console.log(`  ${counts.airports} havalimanı · ${counts.lounges} salon · ${counts.countries} ülke`);
console.log(`  Türkiye: ${counts.trAirports} havalimanı / ${counts.trLounges} salon`);
console.log(`  atlanan ${dropped} · birleştirilen kopya ${dupes}`);
console.log(`  kapsam: iç hat ${kapsamSayim.domestic} · dış hat ${kapsamSayim.international} · ikisi birden ${kapsamSayim.both} · çözülemeyen ${bilinmeyenKapsam}`);
