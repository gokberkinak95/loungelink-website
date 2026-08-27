"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================================
// EkranKarusel — HERO'DAKİ EKRAN GALERİSİ
//
// 🔴 NEDEN DEĞİŞTİ
// Önceki `PhoneShelf` beş ekranı sabit bir eğimle yan yana diziyordu.
// Güzeldi ama ÖLÜYDÜ: ziyaretçi bakıyor, bir şey olmuyor, geçiyor.
// Ürünün en güçlü kanıtı olan ekranlar, sayfada bir desen kadar
// dikkat çekiyordu.
//
// 🆕 SINIF: "BİR KANITI SAYFAYA KOYMAK, ONU GÖSTERMEK DEĞİLDİR —
// GÖZÜN ÜZERİNDE DURDUĞU SÜREYİ UZATMAYAN KANIT, DEKORDUR."
//
// Bu bileşen üç şey yapıyor:
//   1 · MERKEZ ODAK — ortadaki ekran büyük ve dik; komşular 3B döner,
//       küçülür, kararır. Göz nereye bakacağını bilir.
//   2 · SÜRÜKLENEBİLİR — fare/parmak ile çekilir, tekerlek yatay
//       kaydırır, ok tuşları çalışır, noktalar tıklanır.
//   3 · KENDİ ANLATIR — her ekranın altında NE OLDUĞU değil NE İŞE
//       YARADIĞI yazıyor. "Keşfet" bir etiket; "Kartına uyan ilanlar,
//       kural rozetiyle" bir vaat.
//
// ⚠️ ÜÇ TUZAK VE NASIL KAPATILDI
//
// (a) LCP — kahraman alandaki görseller JS'e bağlanırsa ilk boya
//     gecikir. Bu bileşen "use client" ama SUNUCUDA DA ÇİZİLİYOR:
//     ilk HTML'de beş <img> tam olarak var, JS yalnız etkileşim
//     ekliyor. İlk üç karo `eager`, ilki `fetchPriority="high"`.
//     JS hiç çalışmasa bile galeri okunur kalır (aşağıdaki
//     `.karusel:not([data-hazir]) ` kuralı düz şeride düşürür).
//
// (b) HAREKET DUYARLILIĞI — `prefers-reduced-motion` açıksa
//     otomatik ilerleme HİÇ başlamıyor ve 3B dönüş düzleşiyor.
//     Kapatılan şey süsleme; içerik aynen duruyor.
//
// (c) EKRAN DIŞINDA DÖNEN KARUSEL — kimsenin bakmadığı bir animasyon
//     pil ve CPU yakar. `IntersectionObserver` görünmediğinde
//     otomatik ilerlemeyi durduruyor; fare üstündeyken, odak
//     içerideyken ve sürükleme sırasında da duruyor.
// ============================================================================

const OTO_MS = 5200;

export default function EkranKarusel({ shots, caption }) {
  const n = shots.length;
  const [i, setI] = useState(0);
  const [hazir, setHazir] = useState(false);
  const [suruk, setSuruk] = useState(0);       // canlı sürükleme kayması (px)
  const [duraklat, setDuraklat] = useState(false);
  const [gorunur, setGorunur] = useState(true);
  const kok = useRef(null);
  const bas = useRef(null);                     // sürükleme başlangıcı
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
  function indir(e) {
    bas.current = { x: e.clientX, t: Date.now() };
    setDuraklat(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function oynat(e) {
    if (!bas.current) return;
    setSuruk(e.clientX - bas.current.x);
  }
  function kaldir() {
    if (!bas.current) return;
    const dx = suruk;
    bas.current = null;
    setSuruk(0);
    setDuraklat(false);
    if (Math.abs(dx) > 48) git(dx < 0 ? 1 : -1);
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
          // 🔴 İLK DENEMEDE KARTLAR ÜST ÜSTE YIĞILDI ve merkezdeki
          // ekran alttaki cümleyi de örttü. Sebep: `translateX`in
          // yüzdesi ELEMANIN KENDİ genişliğine göredir (200px), yani
          // `56%` = 112px — kartın yarısından az. Komşu kart merkezin
          // üstüne biniyordu.
          //
          // 🆕 SINIF: "YÜZDEYLE KONUMLANDIRIRKEN YÜZDENİN NEYE GÖRE
          // OLDUĞUNU ÖLÇ — translate'in yüzdesi KAPSAYICININ DEĞİL
          // ELEMANIN KENDİ ÖLÇÜSÜDÜR."
          const kaydir = d * 92 + suruk / 4;
          const stil = hazir && !azHareket.current
            ? {
                transform:
                  `translate3d(calc(-50% + ${kaydir}%), ${Math.abs(d) * 14}px, ${-Math.abs(d) * 150}px)` +
                  ` rotateY(${d * -21}deg) scale(${1 - Math.abs(d) * 0.13})`,
                opacity: gorunurMu ? (d === 0 ? 1 : 0.9 - Math.abs(d) * 0.2) : 0,
                filter: d === 0 ? "none" : `brightness(${1 - Math.abs(d) * 0.22})`,
                zIndex: 10 - Math.abs(d),
                pointerEvents: gorunurMu ? "auto" : "none",
              }
            : undefined;
          return (
            <figure
              key={s.src}
              className={"karusel-kart" + (d === 0 ? " etkin" : "")}
              style={stil}
              aria-hidden={hazir && d !== 0 ? "true" : undefined}
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
        {/* 🔴 İLK SÜRÜMDE ETİKET İKİ KEZ YAZIYORDU: telefonun altındaki
            `figcaption` ve burada kalın olarak. Aynı kelimeyi iki kez
            göstermek, ikisini de zayıflatır. Etiket telefona yakın
            durur; burası CÜMLENİN yeri. Ekran okuyucu ikisini de
            sırayla okuyor, bilgi kaybı yok. */}
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
