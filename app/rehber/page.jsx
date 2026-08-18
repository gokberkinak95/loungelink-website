import { AIRPORTS, CARDS, ENTRIES, CARRIER_RULE, slugOf } from "../../lib/guide";
import SiteHeader from "../../components/SiteHeader";
import Coverage from "../../components/Coverage";

export const metadata = {
  title: "Salon Rehberi — hangi kartla nereye girebilirsin? | LoungeLink",
  description:
    "Miles&Smiles, Star Alliance Gold, Priority Pass. Türkiye'nin " +
    `${Object.keys(AIRPORTS).length} havalimanındaki salonlarda hangi kartla girilir, ` +
    "misafir götürülebilir mi?",
  alternates: { canonical: "/rehber" },
  openGraph: {
    title: "Salon Rehberi — hangi kartla nereye girebilirsin?",
    url: "/rehber",
    siteName: "LoungeLink",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LoungeLink — lounge kural motoru" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function GuideIndex() {
  const byAirport = {};
  ENTRIES.forEach((e) => { (byAirport[e.airport] ||= []).push(e); });
  // 🔴 v0.17 §4 — "geçmez" bir kapıyı kapatıyordu. Aynı bilgi, yönü
  // gösteren hâliyle: kart bu salonda değil, BAŞKA salonda geçerli.
  const V = { yes: ["var(--green)", "misafir olur"], self_only: ["var(--muted)", "yalnız kendin"],
              paid: ["var(--amber)", "ücretli"], no: ["var(--ink)", "başka salonda"] };

  return (
    <>
      <SiteHeader />
      <div className="wrap" style={{ maxWidth: 820, padding: "48px 24px 80px" }}>
        <div className="eyebrow">Salon Rehberi</div>
        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)" }}>Kartınla nereye girebilirsin?</h1>
        <p className="lead" style={{ marginTop: 16 }}>
          Kart tipi değişince sonuç değişir. Elite Plus ile Classic Plus aynı salonda
          bambaşka haklar verir; hangi havayoluyla uçtuğun da sonucu değiştirir.
        </p>
        {/* 🔴 v0.17 — motorun ilk baktığı kural rehberin girişinde durur. */}
        <p className="note" style={{ marginTop: 14 }}>{CARRIER_RULE}</p>

        {/* 🔴 v0.18 — SAYFANIN BAŞLIĞI "Kartınla nereye girebilirsin?"
            ama sayfa yalnız kart×havalimanı kural sayfalarını sayıyordu:
            "nereye" sorusunun cevabı olan SALON LİSTESİ hiç yoktu.
            Kapsam artık burada, kural kartlarından ÖNCE — çünkü ziyaretçi
            önce kendi havalimanını arıyor. */}
        <div style={{ marginTop: 34 }}>
          <Coverage />
        </div>

        {/* 🔴 v0.20 — SALON LİSTESİ SAYFALARINA GİDEN TEK YOL.
            Rehber "hangi hak" sorusunu, /kartlar "hangi salon" sorusunu
            cevaplar. Rehber menüde olduğu için tarama buradan devam eder. */}
        <p className="note" style={{ marginTop: 34 }}>
          Terminal terminal salon listesi ve kartının orada ne verdiği:{" "}
          <a href="/kartlar">Kart kart lounge listesi</a>
        </p>

        <h2 style={{ fontSize: 24, marginTop: 46 }}>Kart kart kural sayfaları</h2>
        {Object.entries(byAirport).map(([code, list]) => (
          <div key={code} style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 24 }}>{AIRPORTS[code].name}</h2>
            <div style={{ marginTop: 14 }}>
              {list.map((e) => {
                const [col, lab] = V[e.verdict];
                return (
                  <a key={slugOf(e)} href={`/rehber/${slugOf(e)}`}
                     style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--card)",
                              border: "1px solid var(--line)", borderRadius: 13, padding: 15, marginBottom: 9 }}>
                    <div style={{ flex: 1 }}>
                      <b style={{ color: "var(--ink)", fontSize: 15.5 }}>{CARDS[e.card].label}</b>
                      <div style={{ fontSize: 13.5, color: col, marginTop: 2 }}>{e.headline}</div>
                    </div>
                    <span style={{ fontSize: 11.5, color: col, fontWeight: 700, whiteSpace: "nowrap" }}>{lab}</span>
                    <span style={{ color: "var(--gold)" }}>›</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
