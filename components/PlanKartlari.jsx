"use client";
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
//
// 19 Ekim (SQL 337) — üst plan adı Jetset; buluşma başına puan plana göre (100/250/500);
// ağırlama kredisi Yolcu'da yalnız ilk ağırlamada; host premium satırları; kuruluş fiyatı
// rozeti. Rozet KURULUS_BITIS gününden sonra kendiliğinden kalkar (beta_settings.kurulus_fiyat_bitis).
import { useEffect, useState } from "react";
import { planOdulIndirimleri } from "../lib/supabase";

const KURULUS_BITIS = "2027-03-31";
const KURULUS_YAZI = "31 Mart 2027";

const PLANLAR = [
  { ad: "Yolcu", fiyat: "Ücretsiz", yil: null,
    bas: "Kayıtta 1 kredi", alt: "İlk ilan başvurun bizden",
    haklar: ["Bir seferde 1 host'a başvuru",
             "Haftada 3 bağlantı isteği",
             "Her buluşmada 100 LoungePuan",
             "Host isen: ilk ağırlamanda 1 kredi; 30 günde 3 ağırlamada Sık Uçan 1 ay bizden",
             "Kural motoru, sohbet ve güvenlik araçları"] },
  { ad: "Sık Uçan", kod: "sik_ucan", fiyat: "₺99,99", yil: "₺899,99 / yıl · %25 indirim", one: true, ucretli: true,
    bas: "Ayda 3 ilan başvurusu", alt: "başvuru başına ≈ ₺33,3",
    haklar: ["Aynı anda 3 host'a başvur: kabul şansın artar",
             "Haftada 15 bağlantı isteği",
             "Her buluşmada 250 LoungePuan",
             "Host isen: her ağırlamada 1 kredi",
             "Host isen: ilanını kaç kişinin gördüğünü gör, yalnız kimliği doğrulanmış misafir kabul et",
             "Ayda 3 ilan öne çıkarma: daha çok misafir",
             "Haftalık kaçırılan fırsat bildirimi",
             "Kart hakkı dolma uyarısı: 90 · 30 · 7 gün önce"] },
  { ad: "Jetset", kod: "kahya", fiyat: "₺199,99", yil: "₺1.799,99 / yıl · %25 indirim", ucretli: true,
    bas: "Ayda 7 ilan başvurusu", alt: "başvuru başına ≈ ₺28,6",
    haklar: ["Aynı anda 6 host'a başvur",
             "Sınırsız bağlantı isteği",
             "Her buluşmada 500 LoungePuan",
             "Host isen: her ağırlamada 1 kredi",
             "Host isen: ilanını kaç kişinin gördüğünü gör, yalnız kimliği doğrulanmış misafir kabul et",
             "Ayda 8 ilan öne çıkarma: daha çok misafir",
             "Anlık kaçırılan fırsat bildirimi",
             "Kart hakkı dolma uyarısı: 90 · 30 · 7 gün önce",
             "Öncelikli destek"] },
];

// Sunucuda derlenen sayfa eski kalabilir; rozeti tarayıcıda yeniden tartıyoruz.
function kurulusSuruyor() {
  return new Date() <= new Date(KURULUS_BITIS + "T23:59:59+03:00");
}

export default function PlanKartlari() {
  const [kurulus, setKurulus] = useState(kurulusSuruyor());
  // 20 Ekim (SQL 338) — ödül indirimi canlı okunur; oran 0 ya da cevap yoksa satır çizilmez.
  const [indirim, setIndirim] = useState(null);
  useEffect(() => {
    setKurulus(kurulusSuruyor());
    let iptal = false;
    planOdulIndirimleri().then((m) => { if (!iptal) setIndirim(m); });
    return () => { iptal = true; };
  }, []);
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
            {p2.ucretli && kurulus && <div className="plan-kurulus">Kuruluş fiyatı</div>}
            <div className="plan-giris">
              <b>{p2.bas}</b>
              <span>{p2.alt}</span>
            </div>
            <ul>
              {p2.haklar.map(h => <li key={h}>{h}</li>)}
              {p2.ucretli && indirim && indirim[p2.kod] > 0 && <li>Ödüllerde %{indirim[p2.kod]} indirim</li>}
              {p2.ucretli && <li>Yeni ödüllere erken erişim</li>}
            </ul>
          </div>
        ))}
      </div>
      {kurulus && (
        <p className="plan-dip">
          <b>Kuruluş fiyatı:</b> {KURULUS_YAZI} tarihine kadar abone olanlar, abonelikleri
          kesintisiz sürdükçe bu fiyattan yenilenir.
        </p>
      )}
      <p className="plan-dip">
        Kredi yalnız buluşma gerçekleşirse harcanır: host reddederse, yanıt gelmezse ya da kapıda
        alınmazsan iade edilir. Aynı uçuş için birden fazla host&apos;a başvurduysan biri kabul
        edince diğer başvuruların kendiliğinden geri çekilir ve kredileri iade edilir. Aylık plan
        kredisi bir sonraki aya devretmez. Tek seferlik paketler:
        <b> 1 kredi ₺79,99 · 3 kredi ₺199,99 · 5 kredi ₺299,99</b>; paket ve ağırlama kredisi süresizdir.
      </p>
    </>
  );
}
