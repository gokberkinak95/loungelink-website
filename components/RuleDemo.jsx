"use client";
import { useState } from "react";
import { COUNTS } from "../lib/content";

// ============================================================
// 🔴 İMZA ÖĞE — CANLI KURAL MATRİSİ
//
// Kahraman alanda ekran görüntüsü yerine ÜRÜNÜN KENDİSİ duruyor.
// Ziyaretçi kartını seçer, cevap anında değişir.
//
// Sebebi stratejik, dekoratif değil: tek gerçek farkımız kural
// motoru ve o motor BAŞKA KULLANICI GEREKTİRMİYOR. Sitede de
// aynı avantaj geçerli — kaydolmadan, üç saniyede değer görünür.
// Bir ekran görüntüsü "böyle görünüyor" der; canlı matris
// "işe yarıyor" dedirtir.
//
// Cesaretin tamamı burada. Sayfanın gerisi sessiz duracak.
//
// Veriler SQL 146/147'deki resmî THY matrisinden alınmıştır.
// ============================================================
const CARDS = [
  { k: "ELPL", label: "Elite Plus",
    tk:  { v: "yes", t: "Ailen veya bir misafir", d: "THY seferinde tam hak. Misafirin de aynı havayolu firmasıyla uçuyor olmalı — kural motoru bunu eşleşmeden önce kontrol ediyor." },
    sa:  { v: "yes", t: "Yalnız bir misafir", d: "Star Alliance üyesi başka havayolunda AİLE HAKKI YOK." } },
  { k: "ELITE", label: "Elite",
    tk:  { v: "yes", t: "Ailen veya bir misafir", d: "Elite ve Elite Plus aynı haktadır. Misafirin de aynı havayolu firmasıyla uçuyor olmalı — kural motoru bunu eşleşmeden önce kontrol ediyor." },
    sa:  { v: "yes", t: "Yalnız bir misafir", d: "Aile hakkı düşer." } },
  { k: "CLPL", label: "Classic Plus",
    // 🔴 v0.2.1 — 156 HİZALAMASI: eski metin "girersin" diyordu, iç/dış
    // ayrımı yoktu. Resmî kaynakta İÇ HAT sayfası "ücretsiz" der ama
    // DIŞ HAT tablolarında (Tablo-2/4) Classic Plus HİÇ YOKTUR.
    // Sitenin imza öğesi yanlış söz veremez — en kötü durumu söyler.
    // 🔴 v0.12 — CEVAP AYNI, CÜMLE BAŞKA. Vitrinde ilk gördüğü şey
    // "sende bu hak yok" olan ziyaretçi kalmaz. Bilgi eksiltmiyoruz:
    // kartın NE VERDİĞİNİ önce söylüyoruz, sınırı ikinci cümlede.
    tk:  { v: "self", t: "İç hatta ücretsiz girersin",
           d: "Kendi girişin iç hat salonlarında ücretsiz. Yanına birini alacaksan Elite ve üstü kartlar misafir hakkı veriyor — LoungeLink tam burada devreye giriyor. Misafirin de aynı havayolu firmasıyla uçuyor olmalı — kural motoru bunu eşleşmeden önce kontrol ediyor." },
    sa:  { v: "self", t: "İç hatta ücretsiz girersin",
           d: "Dış hat salonları için resmî tabloda Classic Plus tanımlı değil. Yine de o salonda oturabilirsin: hakkı olan biri seni misafir olarak alabilir." } },
  { k: "SAG", label: "Star Alliance Gold",
    tk:  { v: "yes", t: "Bir misafir", d: "2021'den beri misafirin AYNI UÇAKTA olması zorunlu. Misafirin de aynı havayolu firmasıyla uçuyor olmalı — kural motoru bunu eşleşmeden önce kontrol ediyor." },
    sa:  { v: "yes", t: "Bir misafir", d: "Misafirin aynı uçakta olmalı." } },
  { k: "PP", label: "Priority Pass",
    tk:  { v: "self", t: "iGA ve Primeclass'ta girersin",
           d: "Priority Pass IST'te iGA salonlarında geçerli; THY'nin kendi salonu programa dahil değil. Hangi salonun hangi kartı aldığını uygulama tek tek biliyor." },
    sa:  { v: "self", t: "iGA ve Primeclass'ta girersin",
           d: "Plan ne olursa olsun misafir ücretsiz dahil değil, kapıda tarifeden girer. Tutarı da yazıyoruz ki kapıda sürpriz olmasın." } },
];

const V = {
  yes:  { c: "var(--green)", bg: "rgba(237,230,218,.06)", b: "rgba(237,230,218,.26)", i: "✓" },
  self: { c: "var(--amber)", bg: "rgba(160,143,115,.09)", b: "rgba(160,143,115,.35)", i: "—" },
  // "no" tonu artık yalnız GERÇEK bir engel için ayrılmıştır (örn.
  // charter uçuş). Bilinmezlik ya da "başka salonda geçerli" durumu
  // engel değildir; onlar "self" tonuyla anlatılır.
  no:   { c: "var(--muted)", bg: "var(--bgAlt)",        b: "var(--line)",         i: "×" },
};

// Şart işareti — çizilerek gelir (pathLength=1 → kesik her boyda tamamlanır)
function Isaret({ v }) {
  return (
    <svg className={"demo-isaret " + v} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {v === "yes"
        ? <path pathLength="1" d="M4 12.5 L9.5 18 L20 6.5" />
        : <path pathLength="1" d="M5 12 L19 12" />}
    </svg>
  );
}

export default function RuleDemo() {
  const [card, setCard] = useState(CARDS[0]);
  const [tk, setTk] = useState(true);
  const r = tk ? card.tk : card.sa;
  const v = V[r.v];

  return (
    <div className="demo isikli">
      <div className="demo-head">
        <span className="demo-tag">CANLI</span>
        Kartına göre cevap veren kural motoru
      </div>

      <div className="demo-label">Kartın</div>
      <div className="demo-row">
        {CARDS.map((c) => (
          <button key={c.k} onClick={() => setCard(c)}
            className={"pill" + (c.k === card.k ? " on" : "")}>{c.label}</button>
        ))}
      </div>

      <div className="demo-label">Hangi havayoluyla uçuyorsun?</div>
      <div className="demo-row">
        <button onClick={() => setTk(true)} className={"pill" + (tk ? " on" : "")}>Türk Hava Yolları</button>
        <button onClick={() => setTk(false)} className={"pill" + (!tk ? " on" : "")}>Star Alliance üyesi başka</button>
      </div>

      {/* Cevap: serif — çünkü burada konuşan BİZ değil, KURAL.
          🔴 v0.68 · W2 (Gökberk onayı) — motor artık ŞART ŞART konuşuyor:
          kart → sefer → misafir hakkı sırayla onaylanır, hak varsa
          uygulamadaki "Onaylı" damgasının aynısı basılır. `key` her seçimde
          değişir: sahne baştan oynar. Veri aynı veri; yeni iddia yok. */}
      <div className="demo-out demo-sahne" key={card.k + (tk ? "-tk" : "-sa")}
           style={{ background: v.bg, borderColor: v.b }}>
        <div className="demo-out-code">
          <span className="mono">IST</span> · İstanbul Havalimanı
        </div>
        <ol className="demo-sart" aria-label="Kural motorunun baktığı şartlar">
          <li style={{ "--s": 0 }}><span className="demo-sart-m"><small>Kart</small><b>{card.label}</b></span><Isaret v="yes" /></li>
          <li style={{ "--s": 1 }}><span className="demo-sart-m"><small>Sefer</small><b>{tk ? "Türk Hava Yolları" : "Star Alliance üyesi başka havayolu"}</b></span><Isaret v="yes" /></li>
          <li style={{ "--s": 2 }}><span className="demo-sart-m"><small>Misafir hakkı</small><b>{r.v === "yes" ? "Var" : "Ücretsiz misafir yok"}</b></span><Isaret v={r.v} /></li>
        </ol>

        <div className="demo-karar">
          <div className="demo-out-verdict" style={{ color: v.c }}>
            <span aria-hidden="true">{v.i}</span> {r.t}
          </div>
          {/* v0.69 (Gökberk, 28 Eylül) — "Onaylı" mührü kaldırıldı. Şartların
              sırayla onaylanması (W2'nin geri kalanı) yerinde. */}
        </div>
        <div className="demo-out-detail">{r.d}</div>
      </div>

      {/* 🔴 v0.17 — "22 havalimanı, 35+ kart" uydurmaydı: rehber 12
          gösteriyordu, hiçbir kaynak 22'yi doğrulamıyordu. Sayılar
          artık lib/guide.js verisinden okunuyor; veri değişince
          rakam da değişir. Somut ve doğrulanabilir. */}
      {/* v0.18 — sayılar salon kataloğundan; "havalimanı" artık rehber
          sayfası sayısını değil GERÇEK kapsamı söylüyor. */}
      <div className="demo-foot">
        Kaynak: Türk Hava Yolları resmî lounge kuralları · {COUNTS.lounges} salon
        · {COUNTS.airports} havalimanı · {COUNTS.cards} kart programı
        · {COUNTS.pages} kural sayfası
      </div>
    </div>
  );
}
