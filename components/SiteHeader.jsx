"use client";
import { useEffect, useState } from "react";

// ============================================================
// SiteHeader — TEK marka işareti, TEK başlık çubuğu
//
// 🔴 v0.17 — aynı sitede iki marka işareti vardı; başlık beş dosyada
// beş kez yazılmıştı. Çözüm bileşen: bir daha ayrışamaz.
// 🔴 v0.18 — menü bileşenin KENDİSİNDE: bir sayfa eklenince menüyü de
// eklemeyi unutmak imkânsız. Bağlantılar "/#..." biçiminde: alt
// sayfalardan da ana sayfanın doğru bölümüne gider.
// 🔴 v0.28 — "iki çağrı yarışır" kuralı İKİ BUTON içindir, iki menü
// maddesi için değil. Buton hâlâ TEK.
//
// 🔴 v0.69 (Gökberk, 28 Eylül: "header daha premium olmalı") —
// ÖLÇÜLDÜ: ana sayfa 22 ekran boyuydu ve başlık `position:absolute`
// olduğu için İLK EKRANDAN SONRA MENÜ YOKTU. Artık:
//   · yapışkan: kahramanın üstünde şeffaf, kaydırınca cam zemin + incelir
//   · menü sayfaları adlandırıyor (ana sayfa kısaldı, içerik sayfalara
//     taşındı: Kartlar · Rehber · Ayrıcalıklar · SSS)
//   · bulunulan sayfa işaretli (aria-current)
//   · telefonda iki satırlık sarılan menü yerine tam ekran menü
//   · çağrı her yerde aynı cümle: "Beta'ya katıl"
// ============================================================
const NAV = [
  { href: "/#akis", label: "Nasıl çalışır", yol: null },
  { href: "/kartlar", label: "Kartlar", yol: /^\/kart(lar|\/)/ },
  { href: "/rehber", label: "Rehber", yol: /^\/rehber/ },
  { href: "/ayricaliklar", label: "Ayrıcalıklar", yol: /^\/ayricaliklar/ },
  { href: "/sss", label: "SSS", yol: /^\/sss/ },
];

const CTA = "Beta'ya katıl";

// `seffaf`: ana sayfada çubuk kahraman sahnesinin ÜSTÜNE biner ve
// ilk kaydırmaya kadar zeminsizdir. Alt sayfalarda baştan cam zemin.
export default function SiteHeader({ children, seffaf = false }) {
  const [kaydi, setKaydi] = useState(false);
  const [acik, setAcik] = useState(false);
  const [yol, setYol] = useState("");

  useEffect(() => {
    setYol(window.location.pathname);
    const olc = () => setKaydi(window.scrollY > 24);
    olc();
    window.addEventListener("scroll", olc, { passive: true });
    return () => window.removeEventListener("scroll", olc);
  }, []);

  // Menü açıkken arka sayfa kaymaz; Esc kapatır.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-acik", acik);
    const tus = (e) => { if (e.key === "Escape") setAcik(false); };
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [acik]);

  const sinif = ["lx-head", seffaf ? "is-seffaf" : "is-alt", kaydi ? "is-kaydi" : "", acik ? "is-acik" : ""]
    .filter(Boolean).join(" ");

  const baglantilar = children || NAV.map((n) => {
    const aktif = n.yol ? n.yol.test(yol) : false;
    return (
      <a key={n.href} href={n.href} aria-current={aktif ? "page" : undefined}
         onClick={() => setAcik(false)}>{n.label}</a>
    );
  });

  return (
    <header className={sinif}>
      <div className="wrap lx-row">
        <a href="/" className="lx-marka" aria-label="LoungeLink ana sayfa">
          {/* 21 Eylül — sitenin 40px'lik yerlerinde KANAT (kemer bu ölçekte lekeye döner). */}
          <img src="/mark-kanat.svg" alt="" width={40} height={19} />
          <b>LOUNGELINK</b>
        </a>

        <nav className="lx-nav" aria-label="Ana menü">{baglantilar}</nav>

        <a href="/#beta" className="lx-cta">{CTA}</a>

        <button type="button" className="lx-burger" aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={acik} aria-controls="lx-menu" onClick={() => setAcik((x) => !x)}>
          <span /><span />
        </button>
      </div>

      {/* Telefon menüsü — serif, büyük, sessiz. Çağrı en altta, tek. */}
      <div id="lx-menu" className="lx-menu" hidden={!acik}>
        <nav aria-label="Menü">{baglantilar}</nav>
        <a href="/#beta" className="btn-gold lx-menu-cta" onClick={() => setAcik(false)}>{CTA}</a>
      </div>
    </header>
  );
}
