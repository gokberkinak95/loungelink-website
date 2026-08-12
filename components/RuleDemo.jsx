"use client";
import { useState } from "react";

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
    tk:  { v: "yes", t: "Ailen veya bir misafir", d: "THY seferinde tam hak." },
    sa:  { v: "yes", t: "Yalnız bir misafir", d: "Star Alliance üyesi başka havayolunda AİLE HAKKI YOK." } },
  { k: "ELITE", label: "Elite",
    tk:  { v: "yes", t: "Ailen veya bir misafir", d: "Elite ve Elite Plus aynı haktadır." },
    sa:  { v: "yes", t: "Yalnız bir misafir", d: "Aile hakkı düşer." } },
  { k: "CLPL", label: "Classic Plus",
    // 🔴 v0.2.1 — 156 HİZALAMASI: eski metin "girersin" diyordu, iç/dış
    // ayrımı yoktu. Resmî kaynakta İÇ HAT sayfası "ücretsiz" der ama
    // DIŞ HAT tablolarında (Tablo-2/4) Classic Plus HİÇ YOKTUR.
    // Sitenin imza öğesi yanlış söz veremez — en kötü durumu söyler.
    tk:  { v: "self", t: "İç hatta girersin, misafir yok",
           d: "İç hat salonlarında kendin ücretsiz girersin; misafir ve aile hakkın yoktur. DIŞ HAT salonlarında Classic Plus'ın tanımlı bir giriş hakkı yoktur." },
    sa:  { v: "no", t: "Dış hatta hak tanımlı değil",
           d: "Star Alliance seferlerinde ve dış hat salonlarında Classic Plus resmî tablolarda yer almaz." } },
  { k: "SAG", label: "Star Alliance Gold",
    tk:  { v: "yes", t: "Bir misafir", d: "2021'den beri misafirin AYNI UÇAKTA olması zorunlu." },
    sa:  { v: "yes", t: "Bir misafir", d: "Misafirin aynı uçakta olmalı." } },
  { k: "PP", label: "Priority Pass",
    tk:  { v: "no", t: "THY salonunda geçmez", d: "Priority Pass Turkish Airlines Lounge'da kabul edilmez." },
    sa:  { v: "no", t: "THY salonunda geçmez", d: "iGA Lounge gibi salonlarda geçerlidir." } },
];

const V = {
  yes:  { c: "var(--green)", bg: "rgba(5,150,105,.09)", b: "rgba(5,150,105,.35)", i: "✓" },
  self: { c: "var(--amber)", bg: "rgba(217,119,6,.09)", b: "rgba(217,119,6,.35)", i: "—" },
  no:   { c: "var(--muted)", bg: "var(--bgAlt)",        b: "var(--line)",         i: "×" },
};

export default function RuleDemo() {
  const [card, setCard] = useState(CARDS[0]);
  const [tk, setTk] = useState(true);
  const r = tk ? card.tk : card.sa;
  const v = V[r.v];

  return (
    <div className="demo">
      <div className="demo-head">
        <span className="demo-tag">CANLI</span>
        Türkiye'nin ilk lounge kural motoru
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

      {/* Cevap: serif — çünkü burada konuşan BİZ değil, KURAL. */}
      <div className="demo-out" style={{ background: v.bg, borderColor: v.b }}>
        <div className="demo-out-code">
          <span className="mono">IST</span> · İstanbul Havalimanı
        </div>
        <div className="demo-out-verdict" style={{ color: v.c }}>
          <span aria-hidden="true">{v.i}</span> {r.t}
        </div>
        <div className="demo-out-detail">{r.d}</div>
      </div>

      <div className="demo-foot">
        Kaynak: Türk Hava Yolları resmî lounge kuralları · 22 havalimanı, 35+ kart
      </div>
    </div>
  );
}
