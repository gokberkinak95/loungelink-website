// ============================================================
// PLAN KARTLARI — abonelik üç kartı   (v0.69.1 · 28 Eylül)
// Ana sayfada ve /ayricaliklar'da AYNI kartlar. Tek kaynak: fiyat
// değişince iki yerde ayrışmasın (v0.17'nin "beş kopya başlık" dersi).
// ============================================================
// 18 Ekim (SQL 334 · son model · Gökberk: "ana sayfada kısaltmaya gerek yok", "kredi sayısı
// ve avantajlar detayda yok") — `ozet` kaldırıldı: iki sayfada da TAM kart. Her kartın başında
// planın asıl karşılığı (ayda kaç lounge girişi, giriş başına maliyet), altında uygulamanın plan
// kataloğuyla BİREBİR avantajlar. Altta paket fiyatları ve devretmeme kuralı.
// Fiyatlar mağazaya girilen fiyatlar (magaza_rehberi 6d).
const PLANLAR = [
  { ad: "Yolcu", fiyat: "Ücretsiz", yil: null,
    bas: "Kayıtta 1 kredi", alt: "İlk lounge girişin bizden",
    haklar: ["Aynı anda 1 açık istek",
             "Haftada 3 bağlantı isteği",
             "Ağırlayarak kredi kazan: her ağırlama 1 kredi",
             "Kural motoru, sohbet ve güvenlik araçları"] },
  { ad: "Sık Uçan", fiyat: "₺99,99", yil: "₺899,99 / yıl · %25 indirim", one: true,
    bas: "Ayda 3 lounge girişi", alt: "giriş başına ≈ ₺33,3",
    haklar: ["Aynı anda 3 host'a istek: kabul şansın katlanır",
             "Haftada 15 bağlantı isteği",
             "Ayda 3 ilan öne çıkarma",
             "Haftalık kaçırılan fırsat bildirimi",
             "Kart hakkı dolma uyarısı: 90 · 30 · 7 gün önce"] },
  { ad: "Kâhya", fiyat: "₺199,99", yil: "₺1.799,99 / yıl · %25 indirim",
    bas: "Ayda 7 lounge girişi", alt: "giriş başına ≈ ₺28,6",
    haklar: ["Aynı anda 6 host'a istek",
             "Sınırsız bağlantı isteği",
             "Ayda 8 ilan öne çıkarma",
             "Anlık kaçırılan fırsat bildirimi",
             "Kart hakkı dolma uyarısı: 90 · 30 · 7 gün önce",
             "Öncelikli destek"] },
];

export default function PlanKartlari() {
  return (
    <>
      <div className="plan-grid">
        {PLANLAR.map(p2 => (
          <div key={p2.ad} className={"plan-card" + (p2.one ? " on" : "")}>
            {p2.one && <span className="plan-tag">ÖNERİLEN</span>}
            <h3>{p2.ad}</h3>
            <div className="plan-price">{p2.fiyat}
              {p2.fiyat !== "Ücretsiz" && <span> / ay</span>}
            </div>
            {p2.yil && <div className="plan-year">{p2.yil}</div>}
            <div className="plan-giris">
              <b>{p2.bas}</b>
              <span>{p2.alt}</span>
            </div>
            <ul>{p2.haklar.map(h => <li key={h}>{h}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="plan-dip">
        Kredi yalnız buluşma gerçekleşirse harcanır: host reddederse, yanıt gelmezse ya da kapıda
        alınmazsan iade edilir. Aylık plan kredisi bir sonraki aya devretmez. Tek seferlik paketler:
        <b> 1 kredi ₺79,99 · 3 kredi ₺199,99 · 5 kredi ₺299,99</b>; paket ve ağırlama kredisi süresizdir.
      </p>
    </>
  );
}
