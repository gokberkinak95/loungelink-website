"use client";
import { olay } from "./Olcum";
import { APP_STORE_URL, PLAY_URL, ELMA } from "../lib/magaza";

// ============================================================
// MAĞAZA ROZETİ — 10 Kasım (iOS yayını)
//
// Apple'ın rozet görseli siteye BAĞLANMIYOR (hotlink yok, dosya yok):
// rozet CSS ile çiziliyor, elma işareti rnapp/magaza/reels/apple.svg'deki
// tek path. Siyah zemin + açık kıl çizgi Apple rozetinin dili; yazı
// sitenin kendi sans ailesi.
//
// Tıklama `indir` olayını gönderir (Olcum.jsx'teki üç olaydan biri);
// kişisel veri geçmez, yalnız yer adı.
// ============================================================
// Tek renkli, genel bir oynat üçgeni — Google Play logosu DEĞİL.
const OYNAT = "M6 3.8v16.4c0 .6.7 1 1.2.7l13.4-8.2c.5-.3.5-1 0-1.3L7.2 3.1C6.7 2.8 6 3.2 6 3.8z";

export function AppStoreRozeti({ yer = "indir" }) {
  return (
    <a className="magaza-rozet" href={APP_STORE_URL} rel="noopener"
       aria-label="App Store'dan indir"
       onClick={() => olay("indir", { yer, magaza: "app_store" })}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="magaza-ikon"><path d={ELMA} /></svg>
      <span className="magaza-yazi">
        <b>App Store&apos;dan indir</b>
      </span>
    </a>
  );
}

// Android yayına çıkınca (lib/magaza.js · ANDROID_YAYINDA) gerçek bağlantı;
// o güne kadar tıklanamayan "yakında" kutusu.
export function PlayRozeti({ yayinda = false, yer = "indir" }) {
  if (yayinda) {
    return (
      <a className="magaza-rozet" href={PLAY_URL} rel="noopener"
         aria-label="Google Play'den indir"
         onClick={() => olay("indir", { yer, magaza: "google_play" })}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="magaza-ikon"><path d={OYNAT} /></svg>
        <span className="magaza-yazi"><b>Google Play&apos;den indir</b></span>
      </a>
    );
  }
  return (
    <span className="magaza-rozet magaza-yakinda" aria-disabled="true">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="magaza-ikon"><path d={OYNAT} /></svg>
      <span className="magaza-yazi"><b>Google Play · yakında</b></span>
    </span>
  );
}
