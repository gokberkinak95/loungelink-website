import { AIRPORTS, CARDS, ENTRIES, slugOf } from "../../lib/guide";

export const metadata = {
  title: "Salon Rehberi — hangi kartla nereye girebilirsiniz? | LoungeLink",
  description:
    "Miles&Smiles, Star Alliance Gold, Priority Pass. İstanbul ve Sabiha Gökçen " +
    "salonlarında hangi kartla girilir, misafir götürülebilir mi?",
};

export default function GuideIndex() {
  const byAirport = {};
  ENTRIES.forEach((e) => { (byAirport[e.airport] ||= []).push(e); });
  const V = { yes: ["var(--green)", "misafir olur"], self_only: ["var(--muted)", "yalnız kendiniz"],
              paid: ["var(--amber)", "ücretli"], no: ["var(--ink)", "geçmez"] };

  return (
    <>
      <header style={{ borderBottom: "1px solid var(--line)", background: "var(--card)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", height: 66 }}>
          <a href="/" style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", fontWeight: 700 }}>
            ◈ LoungeLink
          </a>
        </div>
      </header>
      <div className="wrap" style={{ maxWidth: 820, padding: "48px 24px 80px" }}>
        <div className="eyebrow">Salon Rehberi</div>
        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)" }}>Kartınızla nereye girebilirsiniz?</h1>
        <p className="lead" style={{ marginTop: 16 }}>
          Kart tipi değişince sonuç değişir. Elite Plus ile Classic Plus aynı salonda
          bambaşka haklar verir; hangi havayoluyla uçtuğunuz da sonucu değiştirir.
        </p>
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
