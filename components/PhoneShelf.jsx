// ============================================================
// PhoneShelf — gerçek cihaz ekranlarının eğimli "raf" dizilişi
//
// Lounge Surf'ün hero'sundaki en güçlü öğe telefonların DÜZ değil
// perspektifle dizilmesi: göz kaymayı sürdürüyor, ürün "çalışıyor"
// hissi veriyor. Aynı fikri kendi ekranlarımızla kuruyoruz — ama
// mockup değil, 13 Ağustos beta build'inin GERÇEK ekranları.
//
// 🔴 Erişilebilirlik ve performans notu: perspektif yalnız CSS
// transform ile yapılıyor (GPU), her karo lazy yükleniyor ve
// prefers-reduced-motion açıksa eğim düzleşiyor — hareket duyarlılığı
// olan kullanıcı içeriği yine görüyor.
// ============================================================
// 🔴 v0.17 — LCP: RAF HERO'NUN İÇİNDE ve hepsi `loading="lazy"` idi.
// Lazy, görünür alandaki bir görsel için yanlış: tarayıcı yükleme
// kararını düzen hesaplanana kadar erteler, en büyük içerik boyası
// (LCP) o kadar gecikir. Hero'daki ilk üç karo artık `eager`,
// ilkinde `fetchPriority="high"` — tarayıcıya "sayfanın yüzü bu"
// diyoruz. Dördüncüden sonrası ekran dışında, lazy kalıyor.
//
// Ayrıca her <img>'e width/height verildi: boyut bilinmeyince
// tarayıcı 0 yükseklikle yer ayırıyor, görsel gelince sayfa
// zıplıyordu (CLS). Değerler dosyaların GERÇEK boyutundan alındı.
export default function PhoneShelf({ shots, caption }) {
  return (
    <div className="shelf-wrap">
      <div className="shelf">
        {shots.map((s, i) => (
          <figure key={s.src} className="shelf-item" style={{ "--i": i }}>
            <img
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              loading={i < 3 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding={i === 0 ? "sync" : "async"}
            />
            {!!s.tag && <figcaption>{s.tag}</figcaption>}
          </figure>
        ))}
      </div>
      {!!caption && <p className="shelf-cap">{caption}</p>}
    </div>
  );
}
