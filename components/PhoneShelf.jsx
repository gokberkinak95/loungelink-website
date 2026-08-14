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
export default function PhoneShelf({ shots, caption }) {
  return (
    <div className="shelf-wrap">
      <div className="shelf">
        {shots.map((s, i) => (
          <figure key={s.src} className="shelf-item" style={{ "--i": i }}>
            <img src={s.src} alt={s.alt} loading="lazy" />
            {!!s.tag && <figcaption>{s.tag}</figcaption>}
          </figure>
        ))}
      </div>
      {!!caption && <p className="shelf-cap">{caption}</p>}
    </div>
  );
}
