"use client";
import { useEffect, useState } from "react";
import { BOLUM, HOST_WHY, TRUST, SITE, SECTIONS } from "../lib/content";
import OlayLink from "./OlayLink";
// v0.68 · W8 boş koltuk — host bölümündeydi; host tarafıyla birlikte geldi.
import BosKoltuk from "./BosKoltuk";
// Her taraf kendi GERÇEK app ekranıyla (eski ana sayfa hikâyelerinin ekranları).
import EgikEkran from "./EgikEkran";

// ============================================================
// TARAF SEÇİMİ — "Kartım var / Kartım yok"   (v0.69 · 28 Eylül)
//
// 🔴 NEDEN: Ana sayfa iki ayrı kitleye SIRAYLA konuşuyordu: önce
// misafire (neden · keşfet), sonra host'a (kart sahibi · kazanç ·
// basamaklar · mağaza). Ölçüldü: ana sayfa 22 ekran, host bölümü tek
// başına 4.628 px. Her ziyaretçi, kendisiyle ilgisi olmayan yarıyı da
// kaydırıyordu.
// Şimdi ziyaretçi tarafını seçer, yalnız kendi üç cümlesini okur;
// derinlik isteyen sayfasına gider (/ayricaliklar).
//
// ⚠️ YENİ METİN YOK. Kartlar content.js'teki onaylı cümleler
// (HOST_WHY · TRUST); ekrandaki her iddia zaten sitede yazılıydı.
//
// Eski çapalar kırılmasın: /#kart-sahibi ile gelen host tarafında,
// /#neden ile gelen misafir tarafında açılır.
// ============================================================
const TARAF = {
  host: {
    etiket: "Kartım var",
    baslik: BOLUM.host.h2,
    kartlar: [HOST_WHY[0], HOST_WHY[1], HOST_WHY[3]],
    ekran: SECTIONS[1],
    derin: { href: "/ayricaliklar", label: "Ağırlayınca ne kazanırsın" },
  },
  misafir: {
    etiket: "Kartım yok",
    baslik: SECTIONS[0].title,
    kartlar: [TRUST[1], TRUST[2], TRUST[5]],
    ekran: SECTIONS[0],
    derin: { href: "/kartlar", label: "Kartları ve salonları gör" },
  },
};

export default function TarafSecimi() {
  const [taraf, setTaraf] = useState("host");

  useEffect(() => {
    const h = window.location.hash;
    if (h === "#neden" || h === "#misafir") setTaraf("misafir");
  }, []);

  const t = TARAF[taraf];

  return (
    <div className="taraf">
      <div className="taraf-sec" role="tablist" aria-label="Hangi taraftasın?">
        {Object.entries(TARAF).map(([k, v]) => (
          <button key={k} type="button" role="tab" id={`taraf-${k}`}
                  aria-selected={taraf === k} aria-controls="taraf-panel"
                  className={taraf === k ? "on" : undefined} onClick={() => setTaraf(k)}>
            {v.etiket}
          </button>
        ))}
      </div>

      <div id="taraf-panel" role="tabpanel" aria-labelledby={`taraf-${taraf}`} className="taraf-panel" key={taraf}>
        <div className="taraf-ust">
          <div>
            <h3 className="taraf-baslik">{t.baslik}</h3>
            {taraf === "host" && <BosKoltuk />}
          </div>
          <EgikEkran src={t.ekran.shot} alt={t.ekran.shotAlt} w={t.ekran.shotW} h={t.ekran.shotH} />
        </div>
        <div className="taraf-grid">
          {t.kartlar.map((c, i) => (
            <div className="taraf-kart" key={c.t}>
              <span className="idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
        <div className="taraf-alt">
          <OlayLink ad={taraf === "host" ? "host_ol" : "indir"} ozellik={{ yer: "taraf_" + taraf }}
                    href="#beta" className="btn-gold">{SITE.betaCta}</OlayLink>
          <a className="beat" href={t.derin.href}>{t.derin.label} <span>→</span></a>
        </div>
      </div>
    </div>
  );
}
