"use client";
import { useRef, useState } from "react";

// ============================================================================
// EgikEkran — BÖLÜM İÇİ EKRANIN FAREYE TEPKİ VEREN 3B EĞİMİ
//
// 🔴 NEDEN
// Bölüm ekranları (`.shot-tilt`) sabit bir açıyla duruyordu ve `:hover`da
// tek bir son duruma "sıçrıyordu". İki durum arasında geçiş, etkileşim
// değil animasyondur: kullanıcı bir şey YAPMIŞ hissetmez.
//
// Burada eğim, işaretçinin kart üzerindeki KONUMUNDAN hesaplanıyor —
// yani hareket kullanıcının kendi hareketi. Ucuz bir numara değil:
// gözü kartın üzerinde tutan şey tam olarak bu geri bildirim.
//
// 🆕 SINIF: "ETKİLEŞİM, İKİ DURUM ARASINDA GEÇİŞ DEĞİL; KULLANICININ
// GİRDİSİNİ SÜREKLİ BİR ÇIKTIYA ÇEVİRMEKTİR."
//
// ⚠️ SINIRLAR
// · `prefers-reduced-motion` açıksa hiç dinlemiyoruz — CSS'teki
//   düzleştirme kuralı zaten devrede.
// · Dokunmatikte `pointermove` yalnız parmak bastığında gelir; orada
//   varsayılan eğim korunuyor, sürükleme sayfayı kaydırmaya engel olmuyor.
// · Sunucuda da çiziliyor; JS gelmezse `style` boş kalır ve CSS'teki
//   sabit eğim geçerli olur. Görsel hiçbir koşulda kaybolmuyor.
// ============================================================================
export default function EgikEkran({ src, alt, w, h, ters }) {
  const [t, setT] = useState(null);
  const ref = useRef(null);

  function oynat(e) {
    if (typeof window !== "undefined" && window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT(`rotateY(${x * 22}deg) rotateX(${-y * 14}deg) translateY(-8px) scale(1.02)`);
  }

  return (
    <div
      className={"shot-tilt" + (ters ? " ters" : "")}
      ref={ref}
      onPointerMove={oynat}
      onPointerLeave={() => setT(null)}
    >
      <img src={src} alt={alt} width={w} height={h} loading="lazy"
           style={t ? { transform: t } : undefined} draggable={false} />
    </div>
  );
}
