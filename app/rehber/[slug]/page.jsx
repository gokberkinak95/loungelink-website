import { AIRPORTS, CARDS, ENTRIES, allSlugs, findEntry, slugOf } from "../../../lib/guide";
import { SITE } from "../../../lib/content";

// 🔴 STATİK ÜRETİM: her kart×havalimanı için ayrı HTML dosyası.
// Arama motoru her birini ayrı sayfa olarak görür; tek sayfada
// gömülü içerik böyle bir görünürlük kazanamaz.
export async function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = findEntry(slug);
  if (!e) return { title: "Salon Rehberi — LoungeLink" };
  const c = CARDS[e.card], a = AIRPORTS[e.airport];
  // 🔴 BAŞLIK ARAMA SORUSUNUN KENDİSİ OLMALI. İnsanlar
  // "Elite Plus misafir götürebilir mi" diye arıyor; başlık da
  // aynen bunu söylemeli, "Rehber | LoungeLink" değil.
  return {
    title: `${c.label} ile ${a.name}'nda misafir götürebilir misiniz? — LoungeLink`,
    description: `${e.headline}. ${e.detail.slice(0, 110)}`,
  };
}

const V = {
  yes: { c: "var(--green)", bg: "rgba(5,150,105,.08)", t: "MİSAFİR GÖTÜREBİLİRSİNİZ" },
  self_only: { c: "var(--muted)", bg: "var(--bgAlt)", t: "YALNIZ KENDİNİZ" },
  paid: { c: "var(--amber)", bg: "rgba(217,119,6,.08)", t: "ÜCRETLİ" },
  no: { c: "var(--ink)", bg: "var(--bgAlt)", t: "GEÇERLİ DEĞİL" },
};

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const e = findEntry(slug);
  if (!e) return <div className="wrap section">Bu sayfa bulunamadı.</div>;
  const c = CARDS[e.card], a = AIRPORTS[e.airport], v = V[e.verdict];
  const others = ENTRIES.filter((x) => x.airport === e.airport && slugOf(x) !== slug);

  return (
    <>
      <header style={{ borderBottom: "1px solid var(--line)", background: "var(--card)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", height: 66 }}>
          <a href="/" style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", fontWeight: 700 }}>
            ◈ LoungeLink
          </a>
        </div>
      </header>

      <div className="wrap" style={{ maxWidth: 780, padding: "48px 24px 80px" }}>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
          <a href="/">Ana sayfa</a> › Salon Rehberi › {a.city}
        </div>

        <div className="eyebrow">{a.name}</div>
        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)" }}>
          {c.label} ile misafir götürebilir misiniz?
        </h1>

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
          <div style={{ background: "rgba(217,119,6,.07)", border: "1px solid rgba(217,119,6,.28)", borderRadius: 14, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.6, fontWeight: 700, color: "var(--amber)", marginBottom: 6 }}>
              ⚠ SIK ATLANAN AYRINTI
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{e.warning}</p>
          </div>
        )}

        {e.extra && <p className="note" style={{ marginTop: 18 }}>{e.extra}</p>}

        <div style={{ background: "var(--goldSoft)", border: "1px solid var(--warmLine)", borderRadius: 14, padding: 20, marginTop: 34 }}>
          <b style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>
            {e.verdict === "yes"
              ? "Yanınızda götürecek kimse yok mu?"
              : "Misafir götüremiyorsunuz — peki siz nasıl girersiniz?"}
          </b>
          <p style={{ fontSize: 14.5, marginTop: 8 }}>
            {e.verdict === "yes"
              ? `LoungeLink, ${a.city}'da aynı saatlerde bulunan doğrulanmış yolcularla eşleştirir. Kullanmadığınız misafir hakkı boşa gitmez.`
              : `LoungeLink'te ${a.city}'da sizi içeri alabilecek host'lar var. Uçuşunuzu girin, uygun olanları görün.`}
          </p>
          <a href="/#beta" className="btn" style={{ marginTop: 16 }}>{SITE.betaCta}</a>
        </div>

        {others.length > 0 && (
          <div style={{ marginTop: 44 }}>
            <div className="eyebrow">{a.city} için diğer kartlar</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
              {others.map((o) => (
                <a key={slugOf(o)} href={`/rehber/${slugOf(o)}`}
                   style={{ border: "1px solid var(--line)", background: "var(--card)", borderRadius: 20, padding: "9px 16px", fontSize: 13.5 }}>
                  {CARDS[o.card].short}
                </a>
              ))}
            </div>
          </div>
        )}

        <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 40, lineHeight: 1.6 }}>
          Bu bilgiler havayolu ve salon işletmecilerinin resmî sayfalarından derlenmiştir ve
          değişebilir. Kapıdaki son karar her zaman salona aittir.
        </p>
      </div>
    </>
  );
}
