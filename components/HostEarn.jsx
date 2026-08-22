"use client";
import { useMemo, useState } from "react";

// ============================================================
// 🔴 "BEN BİR HOST OLSAM TEK İŞLEVİM İÇERİ BİRİNİ ALMAK MI OLACAK?"
//
// Gökberk'in cümlesi (21 Ağustos) ve sitenin en büyük boşluğunun
// teşhisi. Site host'a bugüne kadar ÜÇ şey söylüyordu: hakkın var,
// seçme hakkın var, riskin yok. Üçü de savunma. Hiçbiri "bana ne
// kazandırır"a cevap vermiyordu — ve bu, ARZ tarafını ikna etmesi
// gereken bir sitenin cevaplamadan geçemeyeceği tek soru.
//
// 🔴 KAZANÇ ZATEN KODDA VARDI, SİTEDE YOKTU. Yazmadan önce ölçtüm:
//
//   SQL 206_host_motoru.sql:81   host_credit_per_session = 3
//   SQL 007_request_engine.sql:52 request_hold            = -1
//     → 1 ağırlama = 3 kredi = 3 misafir isteği
//   SQL 004_auth_bridge.sql:40   signup_grant            = 2
//   SQL 206:82                   host_credit_daily_cap   = 9 (3 ağırlama)
//   rnapp/src/i18n.js:677        "Host +500 · Misafir +200"
//   rnapp/src/i18n.js:679/681/683 davet +500 · kimlik +400 · LinkedIn +150
//   SQL 017+022+228              8 ödül · 1200–5000 LoungePuan
//
// Yani ürün host'a İKİ para birimi ödüyor ve site ikisinden de hiç
// bahsetmiyordu. Asıl cümle de burada duruyordu, kimse kurmamıştı:
//
//     BİR KEZ AĞIRLA — ÜÇ KEZ MİSAFİR OL.
//
// 🆕 SINIF: **"ÜRÜNÜN EN İYİ CÜMLESİ ÇOĞU ZAMAN PAZARLAMA
// TOPLANTISINDA DEĞİL, VERİTABANINDA YAZILIDIR."**
//
// ⚠️ HİÇBİR SAYI UYDURULMADI. Aşağıdaki her sabitin kaynağı üstte
// dosya:satır olarak yazılı. Bir sayı değişirse burası yalan söyler —
// bu yüzden `check.js` bu dosyadaki sabitleri ayrıca denetliyor.
// ============================================================

// SQL 206_host_motoru.sql:81 · beta_settings.host_credit_per_session
const KREDI_BASINA_AGIRLAMA = 3;
// SQL 007_request_engine.sql:52 · reason='request_hold', delta=-1
const ISTEK_MALIYETI = 1;
// rnapp/src/i18n.js:677 · earnSessionD
const PUAN_HOST = 500;
const PUAN_MISAFIR = 200;

// Katalog: SQL 017_marketplace.sql + 022_rewards_parity.sql + 228.
// 228 lounge kategorisini mağazadan kaldırdı — sebebi aşağıda, "takas
// döngüsü" notunda.
const ODULLER = [
  { ad: "Emirates Skywards 750 mil", alt: "Mil transferi", puan: 1200 },
  { ad: "Marriott Bonvoy 20 $ kredi", alt: "Bonvoy otelleri", puan: 1200 },
  { ad: "Airalo eSIM 3 GB", alt: "Küresel veri", puan: 1500 },
  { ad: "Türk Hava Yolları 500 mil", alt: "Miles&Smiles", puan: 2500 },
  { ad: "Booking.com 25 $ kredi", alt: "Her konaklama", puan: 3000 },
  { ad: "SafetyWing 1 ay", alt: "Seyahat sigortası", puan: 3500 },
  { ad: "Airalo eSIM 10 GB", alt: "Küresel veri", puan: 4000 },
  { ad: "Booking.com 50 $ kredi", alt: "Her konaklama", puan: 5000 },
];

// SQL 206_host_motoru.sql:393 `host_tiers` + 207:415-420 güncellemeleri.
// `siralama_ek`, `one_cikar_saat`, `istek_bedava` gerçek kolonlar; buradaki
// her cümle o kolonun karşılığı. 207 "ekstra slot" sözünü geri çekmişti —
// bu yüzden burada da yok.
const BASAMAK = [
  { ad: "Yolcu", n: 0, s: "Başlangıç" },
  { ad: "Ev Sahibi", n: 1, s: "Keşifte öne geçiyorsun" },
  { ad: "Kâhya", n: 5, s: "Belirgin öncelik · her ilanın 24 saat öne çıkıyor" },
  { ad: "Konsiyerj", n: 15, s: "En üst sıralama · kendi isteklerin kredi harcamıyor" },
];

export default function HostEarn() {
  const [n, setN] = useState(4);

  const { kredi, puan, acilan, sonraki } = useMemo(() => {
    const kredi = n * KREDI_BASINA_AGIRLAMA;
    const puan = n * PUAN_HOST;
    const acilan = ODULLER.filter((o) => o.puan <= puan);
    const sonraki = ODULLER.find((o) => o.puan > puan) || null;
    return { kredi, puan, acilan, sonraki };
  }, [n]);

  // Bir sonraki ödüle kaç ağırlama kaldı — "az kaldı" duygusu ancak
  // GERÇEKSE işe yarar; uydurma bir sayaç güveni bitirir.
  const kalanAgirlama = sonraki
    ? Math.ceil((sonraki.puan - puan) / PUAN_HOST)
    : 0;

  return (
    <div className="hearn">
      <div className="hearn-head">
        <span className="eyebrow">KARŞILIK</span>
        <h3>Bir kez ağırla — üç kez misafir ol.</h3>
        <p className="hearn-sub">
          Ağırlamak tek yönlü bir iyilik değil. Her tamamlanan oturum sana iki
          şey bırakıyor: kendi seyahatinde kullanacağın <b>kredi</b>, ve
          mağazada harcayacağın <b>LoungePuan</b>.
        </p>
      </div>

      {/* İKİ PARA BİRİMİ — hangisinin ne işe yaradığı tek satırda.
          Host'un kafasında "puan" kelimesi genelde "hiçbir işe yaramaz"
          demektir; o yüzden önce KREDİ geliyor: krediyle yapılan şey
          somut ve bu ürüne özel. */}
      <div className="hearn-cur">
        <div className="hearn-cur-card">
          <span className="hearn-ico" aria-hidden="true">⬡</span>
          <b>Kredi</b>
          <em>1 ağırlama = {KREDI_BASINA_AGIRLAMA} kredi</em>
          <p>
            Bir misafir isteği {ISTEK_MALIYETI} kredi tutuyor. Yani bir kez
            ağırladığında, hakkın <i>olmayan</i> bir salonda üç kez sen misafir
            olabilirsin — İstanbul&apos;da paylaştığın koltuk, Bangkok&apos;ta
            sana kapı açıyor.
          </p>
        </div>
        <div className="hearn-cur-card">
          <span className="hearn-ico" aria-hidden="true">★</span>
          <b>LoungePuan</b>
          <em>1 ağırlama = {PUAN_HOST} puan</em>
          <p>
            Mağazada eSIM, seyahat sigortası, otel kredisi ve mile dönüşüyor.
            Misafir tarafı da kazanıyor ({PUAN_MISAFIR}) — ama ağırlayan
            {" "}<b>iki buçuk katını</b> alıyor. Arzın karşılığı arzda.
          </p>
        </div>
      </div>

      {/* HESAP — soyut bir vaat değil, kendi sayısı. */}
      <label className="hearn-slider">
        <span>Yılda kaç kez ağırlarsın?</span>
        <input
          type="range"
          min={1}
          max={12}
          value={n}
          onChange={(e) => setN(+e.target.value)}
          aria-label="Yıllık ağırlama sayısı"
        />
        <b>{n}</b>
      </label>

      <div className="hearn-out">
        <div className="hearn-num">
          <b>{kredi}</b>
          <span>kredi · {kredi} misafir isteği hakkı</span>
        </div>
        <div className="hearn-num">
          <b>{puan.toLocaleString("tr-TR")}</b>
          <span>LoungePuan</span>
        </div>
      </div>

      <div className="hearn-rewards" aria-live="polite">
        {ODULLER.map((o) => {
          const on = o.puan <= puan;
          return (
            <div className={"hearn-rw" + (on ? " on" : "")} key={o.ad}>
              <span className="hearn-rw-t">{o.ad}</span>
              <span className="hearn-rw-s">{o.alt}</span>
              <span className="hearn-rw-p">
                {on ? "açıldı" : `${o.puan.toLocaleString("tr-TR")} puan`}
              </span>
            </div>
          );
        })}
      </div>

      {/* BASAMAK ŞERİDİ — "tek işlevim içeri birini almak mı?" sorusuna
          verilen üçüncü cevap: hayır, bir sicil biriktiriyorsun ve o
          sicil ürünün içinde işe yarıyor. */}
      <div className="hearn-tiers">
        {BASAMAK.map((b) => {
          const on = n >= b.n;
          return (
            <div className={"hearn-tier" + (on ? " on" : "")} key={b.ad}>
              <b>{b.ad}</b>
              <span className="hearn-tier-n">
                {b.n === 0 ? "0 ağırlama" : `${b.n} ağırlama`}
              </span>
              <span className="hearn-tier-s">{b.s}</span>
            </div>
          );
        })}
      </div>

      {sonraki ? (
        <p className="hearn-next">
          {kalanAgirlama} ağırlama daha → <b>{sonraki.ad}</b>
        </p>
      ) : (
        <p className="hearn-next">
          Bu tempoda katalogdaki her ödül açık — üstüne {kredi} kredin duruyor.
        </p>
      )}

      {/* 🔴 DÜRÜSTLÜK NOTU — pazarlama bölümünün ortasında.
          Bilerek buraya koyuldu: bir kısıtı gizleyip sonra kapıda
          söylemek, hiç söylememekten kötüdür. */}
      <div className="hearn-fine">
        <p>
          <b>Kredi basmanın üç kapısı var.</b> Oturum başına bir kez ödenir,
          günlük tavan {KREDI_BASINA_AGIRLAMA * 3} kredi, ve aynı iki kişi 30
          günde 3&apos;ten fazla oturum yaparsa kredi üretilmez. Birbirini
          sırayla &quot;ağırlayan&quot; iki arkadaş bu ürünün en bariz
          sömürüsü — motor onu tanıyor.
        </p>
        <p>
          <b>Mağazada lounge erişimi satılmaz.</b> Misafir hakkını paylaşan
          kişiye ödül olarak misafir hakkı vermek döngüyü kapatır ve ilişkiyi
          açık bir takasa çevirir; programların kuralları erişim hakkının
          devrini yasaklıyor. Katalogdaki her ödül bilerek lounge dışı.
        </p>
      </div>
    </div>
  );
}
