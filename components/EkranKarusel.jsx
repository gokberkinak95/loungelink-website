"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================================
// EkranKarusel — HERO'DAKİ EKRAN GALERİSİ
//
// 🔴 NEDEN DEĞİŞTİ
// Önceki `PhoneShelf` beş ekranı sabit bir eğimle yan yana diziyordu.
// Güzeldi ama ÖLÜYDÜ: ziyaretçi bakıyor, bir şey olmuyor, geçiyor.
//
// 🔴 v0.43 — İKİNCİ DÜZELTME, GÖKBERK'İN GÖZLEMİ:
// "Ok'a tıklamak ilk aklıma gelen aksiyon olmuyor."
// Haklıydı ve sebebi ölçülebilir: ekranda BEŞ TELEFON var, oklar ise
// 44 pikselik iki daire. Göz nereye giderse el oraya gider — göz
// telefonlara gidiyordu, el ise okları arıyordu. Yani arayüz kendi
// dikkat dağılımıyla çelişiyordu.
//
// 🆕 SINIF: **"BİR ARAYÜZDE EN BÜYÜK ÖĞE, EN BÜYÜK DÜĞMEDİR —
// TIKLANABİLİR OLMASINI SEN İSTEMESEN DE KULLANICI ONA TIKLAR.
// AFFORDANS'I ÖĞEYE GÖRE DEĞİL, DİKKATE GÖRE TASARLA."**
//
// Üç şey eklendi:
//   1 · KOMŞU KARTA TIKLAMAK onu merkeze getirir. En büyük hedef,
//       en beklenen eylem. Oklar duruyor — ama artık tek yol değil.
//   2 · SÜRÜKLEME GERÇEKTEN TAKİP EDİYOR. Eskiden parmağın 100px
//       gidiyordu, kartlar 25px oynuyordu (`suruk / 4`) ve his
//       "tutmuyor" oluyordu. Artık oran 1:1'e yakın.
//   3 · EKSEN KİLİDİ. İlk birkaç pikselde yön kararı veriliyor:
//       dikey ise sürükleme HİÇ başlamıyor, sayfa normal kayıyor.
//       Yatay ise sayfa kaymıyor, karusel dönüyor.
//
// ⚠️ TIKLAMA vs SÜRÜKLEME — aynı işaretçi, iki niyet.
// Sürükleyip bırakınca tıklama da tetiklenirse kullanıcı iki adım
// birden atlar. `oynadi` bayrağı 6 pikselden fazla hareket olduğunda
// tıklamayı yutuyor.
//
// ⚠️ ÜÇ TUZAK VE NASIL KAPATILDI
//
// (a) LCP — ilk HTML'de yedi <img> tam olarak var, JS yalnız
//     etkileşim ekliyor. İlk üç karo `eager`, ilki `fetchPriority`.
//
// (b) HAREKET DUYARLILIĞI — `prefers-reduced-motion` açıksa otomatik
//     ilerleme hiç başlamıyor ve 3B dönüş düzleşiyor.
//
// (c) EKRAN DIŞINDA DÖNEN KARUSEL — `IntersectionObserver`
//     görünmediğinde otomatik ilerlemeyi durduruyor.
// ============================================================================

const OTO_MS = 5200;
const TIK_ESIGI = 6;    // px — bundan azı "tıklama", fazlası "sürükleme"
const EKSEN_ESIGI = 10; // px — yön kararının verildiği mesafe

export default function EkranKarusel({ shots, caption }) {
  const n = shots.length;
  const [i, setI] = useState(0);
  const [hazir, setHazir] = useState(false);
  const [suruk, setSuruk] = useState(0);       // canlı sürükleme kayması (px)
  const [duraklat, setDuraklat] = useState(false);
  const [gorunur, setGorunur] = useState(true);
  const kok = useRef(null);
  const bas = useRef(null);                     // sürükleme başlangıcı
  const eksen = useRef(null);                   // null | "x" | "y"
  const oynadi = useRef(false);                 // tıklamayı yutmak için
  const azHareket = useRef(false);

  // JS çalıştı → 3B kip. Çalışmazsa CSS düz şeride düşürüyor.
  useEffect(() => {
    azHareket.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setHazir(true);
  }, []);

  const git = useCallback((d) => setI((v) => (v + d + n) % n), [n]);

  // otomatik ilerleme — yalnız görünürken, duraklatılmamışken ve
  // hareket kısıtlaması yokken
  useEffect(() => {
    if (!hazir || azHareket.current || duraklat || !gorunur) return;
    const t = setTimeout(() => git(1), OTO_MS);
    return () => clearTimeout(t);
  }, [hazir, duraklat, gorunur, i, git]);

  useEffect(() => {
    const el = kok.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setGorunur(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── sürükleme ──────────────────────────────────────────────
  // 🔴 EKSEN KİLİDİ: dokunmatikte bir jest hem sayfayı kaydırmak hem
  // karuseli çevirmek için kullanılabilir. Hangisi olduğuna İLK ON
  // PİKSELDE karar veriyoruz ve o karardan dönmüyoruz. Karar verilene
  // kadar hiçbir şey yapmıyoruz — yani dikey kaydırma hiç takılmıyor.
  function indir(e) {
    bas.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    eksen.current = null;
    oynadi.current = false;
    setDuraklat(true);
  }

  function oynat(e) {
    if (!bas.current) return;
    const dx = e.clientX - bas.current.x;
    const dy = e.clientY - bas.current.y;

    if (eksen.current === null) {
      if (Math.abs(dx) < EKSEN_ESIGI && Math.abs(dy) < EKSEN_ESIGI) return;
      eksen.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      // Yatay karar verildiyse işaretçiyi yakala: parmak kartın
      // dışına çıksa da olay akışı bize gelmeye devam etsin.
      if (eksen.current === "x") {
        try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
      }
    }
    if (eksen.current !== "x") return;   // dikey jest → sayfaya bırak

    if (Math.abs(dx) > TIK_ESIGI) oynadi.current = true;
    setSuruk(dx);
  }

  function kaldir() {
    if (!bas.current) return;
    const dx = eksen.current === "x" ? suruk : 0;
    const sure = Math.max(1, Date.now() - bas.current.t);
    const hiz = Math.abs(dx) / sure;          // px/ms

    bas.current = null;
    eksen.current = null;
    setSuruk(0);
    setDuraklat(false);

    // 🔴 İKİ KOŞULDAN BİRİ YETER: uzun sürükleme YA DA hızlı fiske.
    // Eskiden yalnız 48px eşiği vardı; telefonda hızlı bir fiske
    // 30px'te biter ve hiçbir şey olmazdı — "kaydırma çalışmıyor"
    // hissinin sebebi buydu.
    const genislik = kok.current?.offsetWidth || 900;
    const mesafeEsigi = Math.min(56, Math.max(24, genislik * 0.06));
    if (Math.abs(dx) > mesafeEsigi || hiz > 0.45) {
      git(dx < 0 ? 1 : -1);
    }
  }

  function tus(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); git(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); git(-1); }
  }

  // dairesel uzaklık: -2 -1 0 1 2 …
  function uzaklik(k) {
    let d = k - i;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  return (
    <div
      className="karusel"
      ref={kok}
      data-hazir={hazir ? "1" : undefined}
      role="group"
      aria-roledescription="galeri"
      aria-label="LoungeLink ekranları"
      onMouseEnter={() => setDuraklat(true)}
      onMouseLeave={() => setDuraklat(false)}
      onFocus={() => setDuraklat(true)}
      onBlur={() => setDuraklat(false)}
    >
      <div
        className="karusel-sahne"
        onPointerDown={indir}
        onPointerMove={oynat}
        onPointerUp={kaldir}
        onPointerCancel={kaldir}
        onKeyDown={tus}
        tabIndex={0}
        aria-label="Ekranlar arasında gezinmek için sol ve sağ ok tuşlarını kullan"
      >
        {shots.map((s, k) => {
          const d = uzaklik(k);
          const gorunurMu = Math.abs(d) <= 2;
          const merkez = d === 0;
          // 🔴 İLK DENEMEDE KARTLAR ÜST ÜSTE YIĞILDI ve merkezdeki
          // ekran alttaki cümleyi de örttü. Sebep: `translateX`in
          // yüzdesi ELEMANIN KENDİ genişliğine göredir (200px), yani
          // `56%` = 112px — kartın yarısından az.
          //
          // 🆕 SINIF: "YÜZDEYLE KONUMLANDIRIRKEN YÜZDENİN NEYE GÖRE
          // OLDUĞUNU ÖLÇ — translate'in yüzdesi KAPSAYICININ DEĞİL
          // ELEMANIN KENDİ ÖLÇÜSÜDÜR."
          //
          // 🔴 v0.43 — `suruk / 4` → `suruk / 1.6`. Parmağın gittiği
          // yolun dörtte birini göstermek, jestin "tutmadığı" hissini
          // veriyordu. Tam 1:1 de doğru değil (kartlar 92% aralıkla
          // dizili, px ile % aynı ölçek değil); 1.6 ölçülerek seçildi.
          const kaydir = d * 92 + suruk / 1.6;
          const stil = hazir && !azHareket.current
            ? {
                transform:
                  `translate3d(calc(-50% + ${kaydir}%), ${Math.abs(d) * 14}px, ${-Math.abs(d) * 150}px)` +
                  ` rotateY(${d * -21}deg) scale(${1 - Math.abs(d) * 0.13})`,
                opacity: gorunurMu ? (merkez ? 1 : 0.9 - Math.abs(d) * 0.2) : 0,
                filter: merkez ? "none" : `brightness(${1 - Math.abs(d) * 0.22})`,
                zIndex: 10 - Math.abs(d),
                pointerEvents: gorunurMu ? "auto" : "none",
                // Sürükleme sırasında geçişi kapat: yoksa her kare
                // 620ms'lik bir easing'e giriyor ve parmak "gecikmeli"
                // hissediliyor.
                transition: suruk !== 0 ? "none" : undefined,
              }
            : undefined;
          return (
            <figure
              key={s.src}
              className={
                "karusel-kart" + (merkez ? " etkin" : "") +
                (hazir && !merkez && gorunurMu ? " tiklanir" : "")
              }
              style={stil}
              // 🔴 KOMŞU KARTLAR ARTIK ETKİLEŞİMLİ — bu yüzden
              // `aria-hidden` YALNIZ görünmeyenlerde. Ekran okuyucudan
              // gizlenmiş bir öğeye düğme koymak, klavye kullanıcısını
              // adı olmayan bir hedefe göndermektir.
              aria-hidden={hazir && !gorunurMu ? "true" : undefined}
            >
              <img
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                draggable={false}
                loading={k < 3 ? "eager" : "lazy"}
                fetchPriority={k === 0 ? "high" : undefined}
                decoding={k === 0 ? "sync" : "async"}
              />
              {/* Komşu kartın üstünde şeffaf bir düğme: tıklanınca o
                  ekran merkeze gelir. Merkezdekinde YOK — merkezdeki
                  karta tıklamak hiçbir şey yapmamalı, yoksa kullanıcı
                  "bir şey oldu mu" diye bakar. */}
              {hazir && !merkez && gorunurMu && (
                <button
                  type="button"
                  className="karusel-kart-tik"
                  onClick={() => { if (!oynadi.current) setI(k); }}
                  tabIndex={-1}
                  aria-label={`${s.tag || s.alt} ekranını göster`}
                />
              )}
              {!!s.tag && <figcaption>{s.tag}</figcaption>}
            </figure>
          );
        })}
      </div>

      <div className="karusel-alt">
        <button type="button" className="karusel-ok" onClick={() => git(-1)}
                aria-label="Önceki ekran">‹</button>

        {/* Etkin ekranın CÜMLESİ. Etiket ne olduğunu söyler; bu satır
            ne işe yaradığını. `aria-live` ile ekran okuyucuya da gider. */}
        <p className="karusel-soz" aria-live="polite">
          {shots[i].soz || shots[i].alt}
        </p>

        <button type="button" className="karusel-ok" onClick={() => git(1)}
                aria-label="Sonraki ekran">›</button>
      </div>

      <div className="karusel-nokta" role="tablist" aria-label="Ekran seç">
        {shots.map((s, k) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={s.tag || s.alt}
            className={k === i ? "etkin" : undefined}
            onClick={() => setI(k)}
          />
        ))}
      </div>

      {!!caption && <p className="shelf-cap">{caption}</p>}
    </div>
  );
}
