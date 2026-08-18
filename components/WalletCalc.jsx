"use client";
import { useMemo, useState } from "react";

// ============================================================
// 🔴 GİRİŞ KAPISI — "HAKKIN NE EDİYOR?"
//
// Sitenin konumlandırması bu turda değişti:
//
//     LoungeLink bir pazar yeri değil — bir SALON HAKKI CÜZDANI.
//     İçinde bir pazar yeri var.
//
// Pazar yeri cümlesi ("lounge'a girmek isteyeni misafir hakkı olanla
// eşleştiriyoruz") ziyaretçiye "burada kimse yok galiba" dedirtir ve
// tavuk-yumurta problemini SİTEDE de yaşatır. Cüzdan cümlesi
// yaşatmaz: cüzdanın değeri karşı tarafta hiç kimse yokken de gerçek.
//
// Bu bileşen o cümlenin KANITI. Ziyaretçi kartını seçiyor ve üç şey
// görüyor — üçünü de başka hiçbir yerde göremez:
//   1. Kaç misafir hakkın var
//   2. Ne zaman yanacak (gerçek takvimden, canlı geri sayım)
//   3. Ne kadar ediyor (resmî misafir ücreti × kalan hak)
//
// Ve alt satırda ürünün asıl teklifi:
//   "Kullanmadığın hakkı, hakkın olmayan yerde misafir olma
//    hakkına çevir."
//
// ⚠️ HİÇBİR SAYI UYDURULMADI. Ücretler SQL 196'daki `program_plans`
// tablosundan geliyor ve o tablonun her satırında `source_url` var.
// Bilinmeyen bir değer varsa cümle KURULMUYOR — "yaklaşık 0 EUR"
// demek, kullanıcıya hakkının değersiz olduğunu söylemektir.
// ============================================================

// Kaynak: SQL 196 `program_plans` + `lounge_programs.typical_guest_fee`.
// Her satırın kaynağı veritabanında `source_url` olarak duruyor.
const KARTLAR = [
  {
    k: "ms_elite",
    ad: "Miles&Smiles Elite / Elite Plus",
    kisa: "Türk Hava Yolları",
    donem: "yil",
    hak: null,               // THY misafir hakkını SAYIYLA yayınlamıyor
    ucret: null,
    not: "THY, Elite ve Elite Plus için “aile bireyi veya bir misafir” diyor ama YILLIK BİR SAYI yayınlamıyor. Bu yüzden burada sayı uydurmuyoruz — uygulamada kendi hakkını girip takip edebilirsin.",
  },
  {
    k: "pp_standard",
    ad: "Priority Pass Standard",
    kisa: "89 €/yıl",
    donem: "yil",
    hak: 0,
    ucret: 30,
    not: "Standard üyelikte kendi girişin de ücretli. Misafir başına 30 €.",
  },
  {
    k: "pp_plus",
    ad: "Priority Pass Standard Plus",
    kisa: "289 €/yıl · 10 ücretsiz ziyaret",
    donem: "yil",
    hak: 10,
    ucret: 30,
    not: "10 ücretsiz ziyaret senin girişin için. Misafir her zaman 30 €.",
  },
  {
    k: "pp_prestige",
    ad: "Priority Pass Prestige",
    kisa: "459 €/yıl · sınırsız giriş",
    donem: "yil",
    hak: null,
    ucret: 30,
    not: "Kendi girişin sınırsız. Misafir başına 30 € — bu ücreti misafirin karşılaması, ikinizin de kazandığı yerdir.",
  },
  {
    k: "dp_pref",
    ad: "DragonPass Preferential",
    kisa: "249 €/yıl",
    donem: "yil",
    hak: 6,
    ucret: 36,
    not: "Paket dışı her ziyaret 36 €.",
  },
];

function kalanGun() {
  // 🔴 GERÇEK TAKVİM. Sabit bir sayı yazsaydık site yarın yalan
  // söylerdi. Uygulamadaki `host_wallet()` de aynı hesabı yapıyor:
  // yıl sonu eksi bugün. Yarın 1 azalır, 1 Ocak'ta 364'e döner.
  const bugun = new Date();
  const yilSonu = new Date(bugun.getFullYear(), 11, 31);
  return Math.max(0, Math.ceil((yilSonu - bugun) / 86400000));
}

export default function WalletCalc() {
  const [sec, setSec] = useState(KARTLAR[2].k);
  const [kullanilan, setKullanilan] = useState(0);
  const gun = useMemo(kalanGun, []);
  const kart = KARTLAR.find((x) => x.k === sec) || KARTLAR[0];

  const kalan = kart.hak == null ? null : Math.max(0, kart.hak - kullanilan);
  const deger = kalan != null && kart.ucret ? kalan * kart.ucret : null;

  return (
    <div className="wcalc">
      <div className="wcalc-head">
        <span className="eyebrow">CÜZDAN</span>
        <h3>Hakkın ne ediyor?</h3>
        <p className="wcalc-sub">
          Kartını seç. Elinde ne olduğunu, ne zaman yanacağını ve ne ettiğini
          söyleyelim — kaydolmadan.
        </p>
      </div>

      <div className="wcalc-chips" role="tablist" aria-label="Kart seçimi">
        {KARTLAR.map((x) => (
          <button
            key={x.k}
            role="tab"
            aria-selected={sec === x.k}
            className={"wchip" + (sec === x.k ? " on" : "")}
            onClick={() => { setSec(x.k); setKullanilan(0); }}
          >
            {x.ad}
          </button>
        ))}
      </div>

      <div className="wcalc-body">
        {kart.hak != null && kart.hak > 0 && (
          <label className="wcalc-slider">
            <span>Bu yıl kaçını kullandın?</span>
            <input
              type="range"
              min={0}
              max={kart.hak}
              value={kullanilan}
              onChange={(e) => setKullanilan(+e.target.value)}
              aria-label="Kullanılan hak sayısı"
            />
            <b>{kullanilan} / {kart.hak}</b>
          </label>
        )}

        {/* 🔴 KAYIP ÇERÇEVESİ, ama YALNIZ DOĞRUYSA. Sayı bilinmiyorsa
            aciliyet cümlesi kurulmaz; onun yerine dürüst cümle. */}
        {kalan != null && kalan > 0 ? (
          <div className="wcalc-out">
            <div className="wcalc-big">
              {kalan} hakkın <em>{gun} gün</em> sonra yanıyor
            </div>
            {deger ? (
              <div className="wcalc-val">≈ {deger} € değerinde</div>
            ) : null}
            <div className="wcalc-note">
              Bankaya yatmıyor, devretmiyor — kullanılmazsa siliniyor.
            </div>
          </div>
        ) : kalan === 0 ? (
          <div className="wcalc-out">
            <div className="wcalc-big">Bu yılki hakkını kullanmışsın.</div>
            <div className="wcalc-note">
              Yeni dönem 1 Ocak'ta başlıyor; uygulama sayacı senin için tutuyor.
            </div>
          </div>
        ) : (
          <div className="wcalc-out">
            <div className="wcalc-big">Bu kartta sayı yayınlanmıyor.</div>
            <div className="wcalc-note">{kart.not}</div>
          </div>
        )}

        {kart.ucret && kalan !== 0 && (
          <div className="wcalc-fee">
            Misafir ücreti: <b>{kart.ucret} €</b> · {kart.kisa}
          </div>
        )}
      </div>

      {/* ASIL TEKLİF — hesabın hemen altında, tek cümle. */}
      <div className="wcalc-offer">
        <strong>Kullanmadığın hakkı, hakkın olmayan yerde misafir olma hakkına çevir.</strong>
        <span>
          Birini ağırladığında kredi kazanırsın; o krediyle hakkın olmayan bir
          salonda sen misafir olursun.
        </span>
        <a href="#beta" className="btn-gold">Beta listesine katıl</a>
      </div>

      <p className="wcalc-src">
        Ücretler programların kendi resmî fiyat sayfalarından alındı ve
        veritabanımızda kaynak bağlantısıyla birlikte tutuluyor. Kendi hakkını
        kartını veren kurumdan teyit et.
      </p>
    </div>
  );
}
