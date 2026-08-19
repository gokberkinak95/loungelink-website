import { AIRPORTS, CARDS, ENTRIES, CARRIER_RULE, allSlugs, findEntry, slugOf } from "../../../lib/guide";
import { SITE } from "../../../lib/content";
import { findCardPage } from "../../../lib/card-pages";
import SiteHeader from "../../../components/SiteHeader";

// 🔴 STATİK ÜRETİM: her kart×havalimanı için ayrı HTML dosyası.
// Arama motoru her birini ayrı sayfa olarak görür; tek sayfada
// gömülü içerik böyle bir görünürlük kazanamaz.
export async function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

// Soru cümlesi TEK yerde kurulur: H1, <title>, JSON-LD ve description
// aynı soruyu sormalı. Üç yerde üç farklı cümle olursa Google hangisini
// eşleştireceğini bilemez, kullanıcı da tıkladığı başlığı bulamaz.
export const questionOf = (c, a) =>
  `${c.label} ile ${a.name}'nda misafir götürebilir misin?`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = findEntry(slug);
  if (!e) return { title: "Salon Rehberi — LoungeLink" };
  const c = CARDS[e.card], a = AIRPORTS[e.airport];
  // 🔴 BAŞLIK ARAMA SORUSUNUN KENDİSİ OLMALI. İnsanlar
  // "Elite Plus misafir götürebilir mi" diye arıyor; başlık da
  // aynen bunu söylemeli, "Rehber | LoungeLink" değil.
  //
  // 🔴 v0.17 — ÖLÇÜM: 72 sayfa, 72 benzersiz title ama yalnız 13
  // benzersiz description ve 6 benzersiz H1 vardı. Aynı açıklama
  // 6 sayfada tekrarlanınca Google bunu "doorway page" sayar.
  // Description artık ŞEHRİ ve varsa UYARIYI taşıyor — yani her
  // sayfada gerçekten farklı.
  const desc =
    `${a.city} · ${e.headline}. ${e.detail.slice(0, 100)}` +
    (e.warning ? ` Sık atlanan ayrıntı: ${e.warning.slice(0, 80)}` : "");
  return {
    title: `${questionOf(c, a)} — LoungeLink`,
    description: desc,
    alternates: { canonical: `/rehber/${slug}` },
    openGraph: {
      title: questionOf(c, a),
      description: desc,
      url: `/rehber/${slug}`,
      siteName: "LoungeLink",
      locale: "tr_TR",
      type: "article",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LoungeLink — lounge kural motoru" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  };
}

const V = {
  yes: { c: "var(--green)", bg: "rgba(4,107,76,.08)", t: "MİSAFİR GÖTÜREBİLİRSİN" },
  self_only: { c: "var(--muted)", bg: "var(--bgAlt)", t: "YALNIZ KENDİN" },
  paid: { c: "var(--amber)", bg: "rgba(138,90,0,.08)", t: "ÜCRETLİ" },
  // 🔴 v0.17 §4 — OLUMSUZU GÜCE ÇEVİR. "GEÇERLİ DEĞİL" bir kapıyı
  // kapatır ve ziyaretçiyi durdurur; "BAŞKA SALON GEREKİR" aynı
  // gerçeği söyler ama okuyucuyu bir sonraki adıma taşır.
  no: { c: "var(--ink)", bg: "var(--bgAlt)", t: "BAŞKA SALON GEREKİR" },
};

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const e = findEntry(slug);
  if (!e) return <div className="wrap section">Bu sayfa bulunamadı.</div>;
  const c = CARDS[e.card], a = AIRPORTS[e.airport], v = V[e.verdict];
  const others = ENTRIES.filter((x) => x.airport === e.airport && slugOf(x) !== slug);
  // Salon listesi sayfası (iç hat) — her havalimanında iç hat salonu
  // kayıtlı, ama yine de veriden sorulur: katalog değişirse bağlantı
  // ölü kalmasın.
  const cardPage = findCardPage(`${e.card}-${e.airport.toLowerCase()}-ic-hat`);

  return (
    <>
      <SiteHeader />

      {/* 🔴 v0.17 SEO — QAPage şeması. Sayfanın tamamı TEK bir soruya
          cevap veriyor; FAQPage değil QAPage doğrusu. Soru H1'in
          kendisi, cevap headline + detail. Elle senkron yok: ikisi de
          aynı veriden okunuyor, metin değişince şema da değişir. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "QAPage",
          mainEntity: {
            "@type": "Question",
            name: questionOf(c, a),
            text: questionOf(c, a),
            answerCount: 1,
            acceptedAnswer: {
              "@type": "Answer",
              text: [e.headline, e.detail, e.warning, e.extra].filter(Boolean).join(" "),
              url: `https://loungelink.co/rehber/${slug}`,
            },
          },
        }) }}
      />

      <div className="wrap" style={{ maxWidth: 780, padding: "48px 24px 80px" }}>
        <div className="crumb">
          <a href="/">Ana sayfa</a> › <a href="/rehber">Salon Rehberi</a> › {a.city}
        </div>

        <div className="eyebrow">{a.name}</div>
        {/* 🔴 v0.17 — H1'DE HAVALİMANI YOKTU: 72 sayfa yalnız 6 farklı
            H1 taşıyordu. Havalimanı adı H1'e girince her sayfanın
            başlığı benzersizleşiyor ve aramadaki cümleyle örtüşüyor. */}
        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)" }}>{questionOf(c, a)}</h1>

        <div style={{ background: v.bg, border: `1px solid ${v.c}33`, borderRadius: 16, padding: 22, marginTop: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 700, color: v.c, marginBottom: 8 }}>
            {v.t}
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 23, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3 }}>
            {e.headline}
          </div>
          <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.65 }}>{e.detail}</p>
        </div>

        {/* 🔴 UYARI KUTUSU EN DEĞERLİ PARÇA.
            Kullanıcıyı kapıda geri çevirten şey ana kural değil,
            İSTİSNA'dır: taşıyıcı farkı, bölüm farkı, tarih değişikliği.
            Bunları bilen başka Türkçe kaynak yok. */}
        {e.warning && (
          <div style={{ background: "rgba(138,90,0,.07)", border: "1px solid rgba(138,90,0,.28)", borderRadius: 14, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.6, fontWeight: 700, color: "var(--amber)", marginBottom: 6 }}>
              ⚠ SIK ATLANAN AYRINTI
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{e.warning}</p>
          </div>
        )}

        {/* 🔴 v0.17 — ÜRÜNÜN EN TEMEL KURALI SİTEDE HİÇ GEÇMİYORDU.
            sql/177 md.41-47: misafirin de aynı taşıyıcıda olması ŞART
            (guest_must_match_carrier = true, tüm TK/VF/AJ satırlarında
            bekçili). Motorun eşleşmeden önce baktığı ilk şey bu; site
            bundan hiç söz etmiyordu. Misafir hakkı olan biri, misafiri
            başka havayolundaysa kapıda geri çevrilir. */}
        <p className="carrier-rule" style={{ marginTop: 16 }}>
          <b>{CARRIER_RULE}</b>
        </p>

        {e.extra && <p className="note" style={{ marginTop: 18 }}>{e.extra}</p>}

        <div style={{ background: "var(--goldSoft)", border: "1px solid var(--warmLine)", borderRadius: 14, padding: 20, marginTop: 34 }}>
          <b style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>
            {e.verdict === "yes"
              ? "Yanında götürecek kimse yok mu?"
              // 🔴 v0.17 §4 — eski cümle "Misafir götüremiyorsunuz —"
              // diye açılıyordu: dönüşüm noktasında ziyaretçiye önce
              // kaybı okutuyorduk. Aynı bilgi, kapı açık hâli.
              : "Seni içeri alabilecek biri var mı? Bakalım."}
          </b>
          <p style={{ fontSize: 14.5, marginTop: 8 }}>
            {e.verdict === "yes"
              ? `LoungeLink, ${a.city}'da aynı saatlerde bulunan doğrulanmış yolcularla eşleştirir. Kullanmadığın misafir hakkı boşa gitmez.`
              : `LoungeLink'te ${a.city}'da seni içeri alabilecek host'lar var. Uçuşunu gir, uygun olanları gör.`}
          </p>
          <a href="/#beta" className="btn" style={{ marginTop: 16 }}>{SITE.betaCta}</a>
        </div>

        {others.length > 0 && (
          <div style={{ marginTop: 44 }}>
            <div className="eyebrow">{a.city} için diğer kartlar</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
              {others.map((o) => (
                <a key={slugOf(o)} href={`/rehber/${slugOf(o)}`}
                   className="card-chip">
                  {CARDS[o.card].short}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 🔴 v0.20 — İKİ ROTA BİRBİRİNİ BESLER.
            Bu sayfa HAK sorusuna cevap veriyor ("misafir götürebilir
            misin"). Salon sorusunun cevabı /kart altında ve oraya giden
            tek yol dizindi. Bağlantı olmadan üretilen sayfa öksüz kalır:
            sitemap haber verir, ağırlık taşımaz. */}
        {cardPage && (
          <p className="note" style={{ marginTop: 22 }}>
            {a.city} iç hatlarda hangi salonların olduğu ve kartının orada ne verdiği:{" "}
            <a href={`/kart/${cardPage.slug}`}>{c.short} ile {a.city} salon listesi</a>
          </p>
        )}

        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 40, lineHeight: 1.6 }}>
          Bu bilgiler havayolu ve salon işletmecilerinin resmî sayfalarından derlenmiştir ve
          değişebilir. Kapıdaki son karar her zaman salona aittir.
        </p>
      </div>
    </>
  );
}
