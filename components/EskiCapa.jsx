"use client";
import { useEffect } from "react";

// ============================================================
// ESKİ ÇAPALAR — v0.69'da ana sayfadan taşınan bölümler
//
// Ana sayfa 22 ekrandan kısaldı; içerik silinmedi, kendi sayfasına
// taşındı (v0.69.1: kapsam ve abonelik ana sayfaya DÖNDÜ, çapaları yerinde). Instagram'da, e-postada, app'te paylaşılmış "/#cuzdan" gibi
// bağlantılar boş bir yere düşmesin diye yeni adresine gider.
// 🆕 SINIF: "BİR BÖLÜMÜ TAŞIMAK, ONA GİDEN YOLU DA TAŞIMAKTIR."
// ============================================================
const YENI = {
  "#cuzdan": "/kartlar#hesapla",
  "#kural": "/kartlar#programlar",
};

export default function EskiCapa() {
  useEffect(() => {
    const bak = () => {
      const git = YENI[window.location.hash];
      if (git) window.location.replace(git);
    };
    bak();
    // Sayfa açıkken /#cuzdan'a tıklanırsa yeniden yükleme olmaz — hash dinlenir.
    window.addEventListener("hashchange", bak);
    return () => window.removeEventListener("hashchange", bak);
  }, []);
  return null;
}
