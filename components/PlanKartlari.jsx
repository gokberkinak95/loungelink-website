// ============================================================
// PLAN KARTLARI — abonelik üç kartı   (v0.69.1 · 28 Eylül)
// Ana sayfada ve /ayricaliklar'da AYNI kartlar. Tek kaynak: fiyat
// değişince iki yerde ayrışmasın (v0.17'nin "beş kopya başlık" dersi).
// ============================================================
export default function PlanKartlari() {
  return (
    <div className="plan-grid">
      {[
        { ad: "Yolcu", fiyat: "Ücretsiz", yil: null,
          haklar: ["Cüzdan: hak takibi, yanma sayacı, değer hesabı",
                   "Kural motoru: kartın nerede geçer",
                   "Ağırlayarak kredi kazanma",
                   "Aylık kaçırılan değer özeti"] },
        { ad: "Sık Uçan", fiyat: "₺99", yil: "₺890 / yıl · %25 indirim", one: true,
          haklar: ["Yolcu'daki her şey",
                   "Haftalık kaçırılan değer bildirimi",
                   "Ayda 2 ilan öne çıkarma",
                   "Yanma uyarısı: 90 · 30 · 7 gün",
                   "3 karta kadar cüzdan"] },
        { ad: "Kâhya", fiyat: "₺249", yil: "₺2.290 / yıl",
          haklar: ["Sık Uçan'daki her şey",
                   "Anlık kaçırılan değer bildirimi",
                   "Sınırsız ilan öne çıkarma",
                   "Sınırsız kart ve uçuş doğrulama",
                   "Öncelikli destek"] },
      ].map(p2 => (
        <div key={p2.ad} className={"plan-card" + (p2.one ? " on" : "")}>
          {p2.one && <span className="plan-tag">ÖNERİLEN</span>}
          <h3>{p2.ad}</h3>
          <div className="plan-price">{p2.fiyat}
            {p2.fiyat !== "Ücretsiz" && <span> / ay</span>}
          </div>
          {p2.yil && <div className="plan-year">{p2.yil}</div>}
          <ul>{p2.haklar.map(h => <li key={h}>{h}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
