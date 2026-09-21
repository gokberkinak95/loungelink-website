#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════════
// LoungeLink SİTE · verify.js — denetim zinciri
//
// 🔴 NEDEN VAR — 20 EYLÜL
//
// Sitenin BEŞ Python denetimi vardı ve hiçbiri bir zincire bağlı değildi:
//
//     site_paleti.py --denetle      palet app'ten mi türedi
//     palet_check.py                yasaklı renk ailesi
//     tasarim_check.py              bento/çerçeve/mühür
//     ekran_goruntusu_check.py      raf hangi app sürümünü gösteriyor
//     gorsel_tutarlilik_check.py    site ↔ app aynı görsel mi
//
// `npm run check` yalnız `check.js`i koşturuyordu. Kalan dördü ancak
// biri ELLE hatırlarsa çalışıyordu — ve bu turda hatırlanmadıkları
// ortaya çıktı: sitenin `bant.jpg`i derecelendirme öncesi hâlindeydi,
// `og.jpg` 281° menekşeydi, `icon.png` iki tur geriydi.
//
// 🆕 SINIF: "BİR DENETİM ZİNCİRE BAĞLI DEĞİLSE VAR DEĞİLDİR — YAZILMIŞ
// OLMASI ONU ÇALIŞTIRMAZ, HATIRLANMASI ÇALIŞTIRIR VE HATIRLANMAZ."
//
// ⚠️ `rnapp/verify.js` ile aynı desen: Node önce, Python sonra; Python
// yoksa NE ATLANDIĞI tek tek yazılır ve çıkış 1 döner — sessizce yeşil
// YANMAZ.
// ════════════════════════════════════════════════════════════════════════
const { spawnSync } = require("child_process");

const NODE_ADIMLARI = [
  ["node", ["check.js"], "Palet dışı renk · sayfa bütünlüğü · app ikonuyla senkron"],
];

const PY_ADIMLARI = [
  ["site_paleti.py --denetle",
   "Sitenin gece paleti app'in KOYU temasından mı türedi (sapma tavanı 0)"],
  ["palet_check.py",
   "Yasaklı renk ailesi — fintech yeşili/teal/amber · pirinç altın"],
  ["tasarim_check.py",
   "Bento yok · çerçeve yok · ışık ≤%15 · form mührü · pazar yeri dili yok"],
  ["ekran_goruntusu_check.py",
   "Ekran rafı ürünün HANGİ sürümünü gösteriyor (bayat vitrin)"],
  // 🔴 20 Eylül — palet tek kaynaktan geliyordu ama GÖRSELLER gelmiyordu.
  // `og.jpg` hue 281° (menekşe) idi ve o, bağlantı paylaşıldığında
  // görünen TEK karedir.
  ["gorsel_tutarlilik_check.py",
   "Site ile app aynı görseli mi gösteriyor · siteye özgü görsel marka bandında mı"],
  // 🔴 20 Eylül — palet bağlıydı, görseller bağlandı, TİPOGRAFİ bağlı
  // değildi: `--serif: ui-serif, Georgia` — yani Cormorant sitede YOKTU.
  // Ziyaretçi Georgia okuyor, kullanıcı Cormorant okuyordu. Tipografi
  // renkten sonra bir markanın en çok tanınan parçasıdır.
  ["font_check.py",
   "Site app'in yazı ailelerini kullanıyor mu · woff2 app TTF'inden mi türedi · sahte kalınlaştırma"],
];

function pythonVar() {
  for (const p of ["python3", "python"]) {
    const r = spawnSync(p, ["--version"], { encoding: "utf8" });
    if (r.status === 0) return p;
  }
  return null;
}

let kirmizi = 0;

console.log("=".repeat(72));
console.log("SİTE DENETİM ZİNCİRİ");
console.log("=".repeat(72));

for (const [cmd, args, ne] of NODE_ADIMLARI) {
  const r = spawnSync(cmd, args, { stdio: "inherit" });
  if (r.status !== 0) { kirmizi++; console.log(`  ↑ ${args[0]} — ${ne}`); }
}

const PY = pythonVar();
if (!PY) {
  console.log("");
  console.log("🔴 PYTHON YOK — şu denetimler HİÇ KOŞMADI:");
  for (const [dosya, ne] of PY_ADIMLARI) console.log(`   · ${dosya}\n       korur: ${ne}`);
  console.log("");
  console.log("   Bir denetimi atlamanın bedeli adı değil, KORUDUĞU ŞEYdir.");
  process.exit(1);
}

for (const [dosya, ne] of PY_ADIMLARI) {
  const parca = dosya.split(" ");
  const r = spawnSync(PY, parca, { stdio: "inherit" });
  if (r.status !== 0) { kirmizi++; console.log(`  ↑ ${parca[0]} — ${ne}`); }
}

console.log("");
console.log("=".repeat(72));
if (kirmizi) {
  console.log(`✗ ${kirmizi} denetim kırmızı yandı.`);
  process.exit(1);
}
console.log(`✓ ${NODE_ADIMLARI.length + PY_ADIMLARI.length} denetimin hepsi temiz.`);
console.log("=".repeat(72));
