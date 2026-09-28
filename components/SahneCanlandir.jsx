"use client";
import { useEffect } from "react";

// ============================================================
// SAHNE CANLANDIR — v0.68 hareket katmanının tek JS'i
//
// İki iş, ikisi de süs değil yük yönetimi:
//   1. `.canli` öğe ekrandan ÇIKINCA `.durgun` alır ve CSS onun
//      animasyonunu durdurur — ekran dışında GPU'ya iş yok.
//      Ters mantık bilinçli: sonradan doğan bir sahne (kart değişince
//      yeniden çizilen jetonlar) ya da JS'siz sayfa hiçbir zaman
//      "durgun" olmaz; hareketi sürer, hiçbir metin görünmez kalmaz.
//   2. `.isikli` panellerde imlecin çevresinde çok hafif altın ışık
//      (yalnız fare/iz dörtgeni olan cihazda — telefonda kapalı).
// ============================================================
export default function SahneCanlandir() {
  useEffect(() => {
    let io = null;
    const sahneler = document.querySelectorAll(".canli");
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (girdiler) => girdiler.forEach((g) => g.target.classList.toggle("durgun", !g.isIntersecting)),
        { rootMargin: "0px 0px -8% 0px" }
      );
      sahneler.forEach((el) => io.observe(el));
    }

    const temizle = [];
    const ince = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (ince) {
      document.querySelectorAll(".isikli").forEach((el) => {
        const hareket = (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
          el.style.setProperty("--mo", "1");
        };
        const ayril = () => el.style.setProperty("--mo", "0");
        el.addEventListener("pointermove", hareket);
        el.addEventListener("pointerleave", ayril);
        temizle.push(() => { el.removeEventListener("pointermove", hareket); el.removeEventListener("pointerleave", ayril); });
      });
    }
    return () => { if (io) io.disconnect(); temizle.forEach((f) => f()); };
  }, []);
  return null;
}
