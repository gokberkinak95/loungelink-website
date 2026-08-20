#!/usr/bin/env node
// ============================================================
// LoungeLink · scripts/konum.js — HANGİ KLASÖRÜ BUILD EDİYORUM?
//
// 🔴 NEDEN VAR (20 Ağustos 2026, İKİNCİ KEZ):
// Zip `C:\website`'e açıldı, build `C:\website-git`'te alındı.
// İki tur boyunca "kurdum" sanılan sürüm canlıya hiç çıkmadı.
// Kanıt Gökberk'in kendi ekranındaydı ve kimse bakmadı:
//
//     PS C:\website>      node -p "...version"  → 0.27.1
//     PS C:\website-git>  npm run build
//     > loungelink-website@0.26.1 build              ← 0.26.1
//
// npm banner'ı doğruyu söylüyordu; tek satır ve gri, kimse okumaz.
//
// 🆕 SINIF: **"DOĞRU BİLGİYİ GÖRÜNMEZ YERE YAZMAK, YANLIŞ BİLGİ
// VERMEKLE AYNI SONUCU ÜRETİR."**
//
// Bu betik `prebuild` olarak koşar; her build'in İLK çıktısı olur.
// SERT DURDURMUYOR — bilerek: Vercel kendi kabında klonluyor ve
// orada `.git` bulunmayabilir; sert bir kapı canlı deploy'u
// kırardı. Ama görmezden gelinemeyecek kadar büyük yazıyor.
// ============================================================
const fs = require("fs");
const path = require("path");

const kok = process.cwd();
let surum = "?";
try { surum = require(path.join(kok, "package.json")).version; } catch {}

const gitVar = fs.existsSync(path.join(kok, ".git"));
let uzak = null;
if (gitVar) {
  try {
    const cfg = fs.readFileSync(path.join(kok, ".git", "config"), "utf8");
    const m = cfg.match(/url\s*=\s*(.+)/);
    uzak = m ? m[1].trim() : null;
  } catch {}
}

const cizgi = "═".repeat(64);
const satir = (etiket, deger) => `  ${etiket.padEnd(16)}: ${deger}`;

console.log("\n" + cizgi);
console.log("  BUILD KLASÖRÜ — doğru yerde misin?");
console.log(cizgi);
console.log(satir("KLASÖR", kok));
console.log(satir("SÜRÜM", surum));
if (gitVar) {
  console.log(satir("GIT", "✓ depo var"));
  console.log(satir("UZAK DEPO", uzak || "(tanımsız)"));
  console.log(cizgi + "\n");
} else {
  console.log(satir("GIT", "✗ DEPO YOK"));
  console.log(cizgi);
  console.log("");
  console.log("  🔴 BU KLASÖRDEN DEPLOY EDİLEMEZ.");
  console.log("     Burada build alabilirsin ama `git push` yapamazsın;");
  console.log("     yani yaptığın değişiklik CANLIYA ÇIKMAZ.");
  console.log("");
  console.log("     Deploy zinciri:  C:\\website-git → GitHub → Vercel");
  console.log("     Zip'i oraya aç, build'i orada al.");
  console.log("");
  console.log(cizgi + "\n");
}
