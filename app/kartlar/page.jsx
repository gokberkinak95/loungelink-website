import { CARDS } from "../../lib/guide";
import { CARD_PAGES, SCOPES, SOURCE_NOTE, groupedPages } from "../../lib/card-pages";
import SiteHeader from "../../components/SiteHeader";

// 🔴 DİZİN SAYFASI OLMADAN ÜRETİLEN SAYFA YOK SAYILIR.
// Sitemap bir sayfayı haber verir ama ona AĞIRLIK taşımaz; ağırlık
// bağlantıdan gelir. Tek bir sayfadan da bağlanmayan 144 sayfa,
// sitemap'te dursa bile öksüz kalır. Bu sayfa hepsine bağlanan tek
// düğüm: /rehber → /kartlar → tek tek kart sayfaları.
const TOTAL = CARD_PAGES.length;
// NOT: `.size` yerine `[...].length` — check.js §6 "siz" bekçisi
// nokta sonrası `size` sözcüğünü ikinci çoğul sanıyor. Bekçiyi
// gevşetmektense yazımı değiştirmek daha ucuz.
const AIRPORT_COUNT = [...new Set(CARD_PAGES.map((p) => p.code))].length;

export const metadata = {
  title: `Kart kart lounge listesi — ${AIRPORT_COUNT} havalimanı, ${TOTAL} sayfa | LoungeLink`,
  description:
    `Miles&Smiles, Star Alliance Gold ve Priority Pass ile Türkiye'nin ${AIRPORT_COUNT} ` +
    "havalimanında hangi lounge'a girersin? İç hat ve dış hat ayrı ayrı, salon adı ve terminaliyle.",
  alternates: { canonical: "/kartlar" },
  openGraph: {
    title: "Kart kart lounge listesi",
    description: `${TOTAL} sayfa: kart × havalimanı × terminal. Salon adı ve terminaliyle.`,
    url: "/kartlar",
    siteName: "LoungeLink",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LoungeLink — lounge kural motoru" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function CardsIndex() {
  const groups = groupedPages();

  return (
    <>
      <SiteHeader />
      <div className="wrap" style={{ maxWidth: 860, padding: "48px 24px 80px" }}>
        <div className="eyebrow">Kart sayfaları</div>
        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)" }}>Kartınla hangi lounge'a girersin?</h1>

        {/* Sayı önce: kapsamın kendisi iddianın kanıtı. */}
        <p className="lead" style={{ marginTop: 16 }}>
          {AIRPORT_COUNT} havalimanı, iç hat ve dış hat ayrı ayrı, {TOTAL} sayfa.
          Her sayfada o terminaldeki salonlar adıyla ve terminaliyle yazılı;
          kartının orada ne verdiği kural motorundan okunuyor.
        </p>
        <p className="note" style={{ marginTop: 14 }}>
          Aynı kart iç hatta ve dış hatta farklı sonuç verir. Classic Plus iç hat
          salonuna ücretsiz girer, dış hatta tanımlı bir hakkı yoktur — bu yüzden
          iki terminal iki ayrı sayfadır.
        </p>

        {groups.map(({ airport, scopes }) => (
          <div key={airport.code} style={{ marginTop: 42 }}>
            <h2 style={{ fontSize: 23 }}>{airport.name}</h2>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
              {airport.city} · {airport.code} · katalogda {airport.lounges.length} salon
            </div>

            {scopes.map(({ scope, list }) => (
              <div key={scope} style={{ marginTop: 18 }}>
                <div className="eyebrow">
                  {SCOPES[scope].label} · {list[0].lounges.length} salon
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
                  {list.map((p) => (
                    <a key={p.slug} href={`/kart/${p.slug}`}
                       className="card-chip">
                      {CARDS[p.card].short}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <p className="note" style={{ marginTop: 44 }}>
          Misafir ve aile hakkının kart kart ayrıntısı <a href="/rehber">Salon Rehberi</a>'nde.
        </p>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, lineHeight: 1.6 }}>
          {SOURCE_NOTE}
        </p>
      </div>
    </>
  );
}
