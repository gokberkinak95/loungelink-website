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
//     → 1 ağırlama = 1 kredi = 1 misafir isteği  (246 ile 3 → 1)
//   SQL 004_auth_bridge.sql:40   signup_grant            = 2
//   SQL 206:82                   host_credit_daily_cap   = 9 (3 ağırlama)
//   rnapp/src/i18n.js:677        "Host +500 · Misafir +200"
//   rnapp/src/i18n.js:679/681/683 davet +500 · kimlik +400 · LinkedIn +150
//   SQL 244_odul_ekonomisi.sql    6 ödül · 500–17.500 LoungePuan
//                                (maliyetten türetilmiş fiyatlar)
//
// Yani ürün host'a İKİ para birimi ödüyor ve site ikisinden de hiç
// bahsetmiyordu. Asıl cümle de burada duruyordu, kimse kurmamıştı:
//
//     BİR KEZ AĞIRLA — BİR KEZ MİSAFİR OL.   (23 Ağustos: 3 → 1)
//
// 🆕 SINIF: **"ÜRÜNÜN EN İYİ CÜMLESİ ÇOĞU ZAMAN PAZARLAMA
// TOPLANTISINDA DEĞİL, VERİTABANINDA YAZILIDIR."**
//
// ⚠️ HİÇBİR SAYI UYDURULMADI. Aşağıdaki her sabitin kaynağı üstte
// dosya:satır olarak yazılı. Bir sayı değişirse burası yalan söyler —
// bu yüzden `check.js` bu dosyadaki sabitleri ayrıca denetliyor.
// ============================================================

// SQL 246_ekonomi_ayari.sql · beta_settings.host_credit_per_session
// 🔴 23 AĞUSTOS: 3'TEN 1'E İNDİ. Sebep ekonomik değil, ANLAMSAL:
// host'a "misafir isteği hakkı" ödemek iki rolü tek para biriminde
// karıştırıyordu. 1:1 oran ürünün cümlesini de netleştiriyor —
// "bir kez ağırla, bir kez misafir ol": açtığın kapı sana BİR kapı açar.
// 🔴 19 EKİM (SQL 337 · Gökberk: "herkes kendi planına göre kazanacak"):
// puan ve ağırlama kredisi artık PLANA bağlı — plan_catalog.agirlama_puani /
// agirlama_kredisi. Host da misafir de KENDİ planının puanını alır. Yolcu'da
// ağırlama kredisi yalnız ilk ağırlamada bir kez verilir; 30 gün içinde 3 kişi
// ağırlayan Yolcu'ya Sık Uçan 30 gün açılır (beta_settings.host_free_upgrade_sessions).
const PLAN_KAZANC = [
  { id: "yolcu", ad: "Yolcu", puan: 100, kredi: 0, ilkKredi: 1 },
  { id: "sik_ucan", ad: "Sık Uçan", puan: 250, kredi: 1, ilkKredi: 0 },
  { id: "jetset", ad: "Jetset", puan: 500, kredi: 1, ilkKredi: 0 },
];
// SQL 007_request_engine.sql:52 · reason='request_hold', delta=-1
const ISTEK_MALIYETI = 1;
// SQL 337 · host_free_upgrade_sessions
const HEDIYE_ESIK = 3;

// ============================================================
// 🔴 23 AĞUSTOS — BU LİSTE İKİ AYRI ŞEKİLDE YALAN SÖYLÜYORDU
//
// (1) SAYILAR VERİTABANIYLA TUTMUYORDU. Sitede "Airalo eSIM 3 GB ·
//     1500 puan" yazıyordu; katalogda 1000'di. "THY 500 mil · 2500"
//     yazıyordu; katalogda 1000'di. Yani kaynak gösterilmiş ama kaynağa
//     BAKILMAMIŞTI.
//
// (2) FİYATLAR MALİYETİ KARŞILAMIYORDU. Gökberk'in tespiti: 1000 THY
//     mili ≈ 30 USD. 750 Emirates mili 1200 puan = 1,7 ağırlama — yani
//     iki ağırlamaya ~22 dolarlık hediye. SQL 244 kataloğu maliyete
//     oturttu; ulaşılamayan ödüller vitrinden çıktı.
//
// (3) VE MARKA ADI VERİYORDUK. Emirates, Marriott, Booking.com,
//     SafetyWing — hiçbiriyle imzalanmış bir ortaklık YOK. Bir markanın
//     adını vitrine koymak, o markayla anlaşmış olmak demektir.
//
// 🆕 SINIF: **"HENÜZ ANLAŞMADIĞIN BİR MARKANIN ADINI VİTRİNE KOYMAK,
// ÜRÜNÜ DEĞİL SÖZÜ SATMAKTIR."**
//
// Bu yüzden site artık MARKA DEĞİL KATEGORİ gösteriyor ve puanlar
// SQL 244'ün maliyetten türettiği gerçek fiyatlar. Bir ortaklık
// imzalandığında adı buraya yazılır — önce değil.
// `check.js` bu dosyada marka adı geçmesini engelliyor.
// ============================================================
// 19 Ekim · SQL 337 ödül fiyatları (rewards.cost_points).
const ODULLER = [
  { ad: "Havalimanı kahvesi", alt: "Ortak kafelerde", puan: 300 },
  { ad: "İlan öne çıkarma · 3 gün", alt: "Keşifte en üstte", puan: 750 },
  { ad: "+2 misafir isteği kredisi", alt: "Hemen hesabına", puan: 800 },
  { ad: "Airalo eSIM 3 GB", alt: "Küresel veri", puan: 1500 },
  { ad: "Amazon hediye kartı ₺500", alt: "Dijital kod", puan: 2000 },
  { ad: "Sık Uçan planı · 1 ay", alt: "Aylık 3 kredi", puan: 2000 },
  { ad: "Marriott Bonvoy 20 $ kredi", alt: "Bonvoy otelleri", puan: 3500 },
  { ad: "Booking.com 25 $ kredi", alt: "Her konaklama", puan: 4500 },
  { ad: "Türk Hava Yolları 1000 mil", alt: "Miles&Smiles", puan: 8000 },
];

// ⚠️ MARKA ADI GEÇEN SATIRLAR ÖRNEKTİR — imzalanmış bir ortaklık yok.
// Bu cümle kozmetik değil: `check.js` §9 vitrinde marka adı görünce
// aşağıdaki notun ekranda BASILDIĞINI ayrıca doğruluyor. Marka adı
// yazıp bu notu kaldıramazsın; ikisi birlikte durur ya da ikisi de
// durmaz.
const ORNEK_NOTU =
  "Mağaza örnektir; ortaklıklar imzalandıkça gerçek karşılıklarıyla değişecek.";

// SQL 206_host_motoru.sql:393 `host_tiers` + 207:415-420 güncellemeleri.
// `siralama_ek`, `one_cikar_saat`, `istek_bedava` gerçek kolonlar; buradaki
// her cümle o kolonun karşılığı. 207 "ekstra slot" sözünü geri çekmişti —
// bu yüzden burada da yok.
const BASAMAK = [
  { ad: "Yolcu", n: 0, s: "Başlangıç" },
  { ad: "Ev Sahibi", n: 1, s: "Keşifte öne geçiyorsun" },
  { ad: "Kaptan", n: 5, s: "Belirgin öncelik · her ilanın 24 saat öne çıkıyor" },
  { ad: "Konsiyerj", n: 15, s: "En üst sıralama · kendi isteklerin kredi harcamıyor" },
];

export default function HostEarn() {
  const [n, setN] = useState(4);
  const [planId, setPlanId] = useState("sik_ucan");
  const plan = PLAN_KAZANC.find((p) => p.id === planId) || PLAN_KAZANC[0];

  const { kredi, puan, sonraki } = useMemo(() => {
    // Yolcu: yalnız ilk ağırlama 1 kredi. Ücretli plan: her ağırlama 1 kredi.
    const kredi = plan.kredi > 0 ? n * plan.kredi : Math.min(n, 1) * plan.ilkKredi;
    const puan = n * plan.puan;
    const sonraki = ODULLER.find((o) => o.puan > puan) || null;
    return { kredi, puan, sonraki };
  }, [n, plan]);

  // Bir sonraki ödüle kaç ağırlama kaldı — "az kaldı" duygusu ancak
  // GERÇEKSE işe yarar; uydurma bir sayaç güveni bitirir.
  const kalanAgirlama = sonraki
    ? Math.ceil((sonraki.puan - puan) / plan.puan)
    : 0;

  return (
    <div className="hearn">
      <div className="hearn-head">
        <span className="eyebrow">KREDİ VE LOUNGEPUAN</span>
        <h3>Bir kez ağırla — bir kez misafir ol.</h3>
        {/* 🔴 MARKA CÜMLESİ. Kredi oranı 1:1 olduğu için artık BİREBİR
            doğru — 3 iken bu cümle kurulamazdı. Bir mottonun taşıması
            gereken tek şart bu: ürünün gerçekten yaptığı şeyi söylemesi. */}
        <p className="hearn-motto">Açtığın kapı, sana bir kapı açar.</p>
        <p className="hearn-sub">
          Ağırlamak tek yönlü bir iyilik değil. Her tamamlanan oturum sana
          mağazada harcayacağın <b>LoungePuan</b> bırakıyor; Sık Uçan ve
          Jetset&apos;te üstüne kendi seyahatinde kullanacağın bir <b>kredi</b>.
        </p>
      </div>

      {/* İKİ PARA BİRİMİ — hangisinin ne işe yaradığı tek satırda.
          Host'un kafasında "puan" kelimesi genelde "hiçbir işe yaramaz"
          demektir; o yüzden önce KREDİ geliyor: krediyle yapılan şey
          somut ve bu ürüne özel. */}
      <div className="hearn-cur">
        <div className="hearn-cur-card">
          <span className="idx" aria-hidden="true">01</span>
          <b>Kredi</b>
          <em>Sık Uçan ve Jetset: 1 ağırlama = 1 kredi</em>
          <p>
            Bir misafir isteği {ISTEK_MALIYETI} kredi tutuyor. Yani bir kez
            ağırladığında, hakkın <i>olmayan</i> bir salonda bir kez sen misafir
            olabilirsin — İstanbul&apos;da paylaştığın koltuk, Bangkok&apos;ta
            sana kapı açıyor. Ücretsiz Yolcu planında ilk ağırlaman 1 kredi;
            30 gün içinde {HEDIYE_ESIK} kişi ağırlarsan Sık Uçan 1 ay bizden.
          </p>
        </div>
        <div className="hearn-cur-card">
          <span className="idx" aria-hidden="true">02</span>
          <b>LoungePuan</b>
          <em>Her buluşma: {PLAN_KAZANC.map((p) => p.puan).join(" · ")} puan</em>
          <p>
            Mağazada eSIM, otel kredisi, hediye kartı ve mile dönüşüyor.
            Host da misafir de <b>kendi planına göre</b> kazanıyor:
            {" "}{PLAN_KAZANC.map((p) => `${p.ad} ${p.puan}`).join(", ")}.
          </p>
        </div>
      </div>

      {/* HESAP — soyut bir vaat değil, kendi sayısı; planına göre. */}
      <div className="hearn-plan" role="radiogroup" aria-label="Plan">
        {PLAN_KAZANC.map((p) => (
          <button
            type="button"
            key={p.id}
            role="radio"
            aria-checked={p.id === planId}
            className={"hearn-plan-b" + (p.id === planId ? " on" : "")}
            onClick={() => setPlanId(p.id)}
          >
            {p.ad}
          </button>
        ))}
      </div>
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
          <span>
            kredi · {kredi} misafir isteği hakkı
            {plan.kredi === 0 ? " · Yolcu'da yalnız ilk ağırlama" : ""}
          </span>
        </div>
        <div className="hearn-num">
          <b>{puan.toLocaleString("tr-TR")}</b>
          <span>LoungePuan · ağırlama başına {plan.puan}</span>
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

      <p className="hearn-note">{ORNEK_NOTU}</p>

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
          günlük tavan 3 kredi, ve aynı iki kişi 30
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
