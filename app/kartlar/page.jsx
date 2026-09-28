import { CARDS } from "../../lib/guide";
import { CARD_PAGES, SCOPES, SOURCE_NOTE, groupedPages } from "../../lib/card-pages";
import SiteHeader from "../../components/SiteHeader";
import WalletCalc from "../../components/WalletCalc";
import { BOLUM, SITE, PROGRAMS } from "../../lib/content";
import { LOUNGE_COUNTS } from "../../lib/lounges-data";

// 🔴 v0.69 (28 Eylül) — ANA SAYFADAN GELENLER: hak hesaplayıcı (#hesapla)
// ve dokuz programın kural kartları (#programlar). Ana sayfada 4.852 px
// tutuyorlardı; konuları zaten bu sayfanındı ("kartınla ne olur").
// Metinler aynen. Eski /#cuzdan ve /#kural bağlantıları buraya gelir.

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
  // v0.69.2 — "168 sayfa" ziyaretçiye bir şey söylemiyordu (Gökberk: "168 sayfa ne?").
  title: `Kartınla hangi lounge'a girersin? Türkiye'de ${AIRPORT_COUNT} havalimanı, dünyada ${LOUNGE_COUNTS.countries} ülke | LoungeLink`,
  description:
    `Miles&Smiles, Star Alliance Gold ve Priority Pass ile Türkiye'nin ${AIRPORT_COUNT} ` +
    "havalimanında hangi lounge'a girersin? İç hat ve dış hat ayrı ayrı, salon adı ve terminaliyle.",
  alternates: { canonical: "/kartlar" },
  openGraph: {
    title: "Kartınla hangi lounge'a girersin?",
    description: `Türkiye'de ${AIRPORT_COUNT} havalimanında kart kart, terminal terminal; dünyada ${LOUNGE_COUNTS.lounges} salon.`,
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
      {/* 🔴 v0.69.2 — SAYFANIN h1'İ EN ALTTAYDI (hesaplayıcı ve programlar
          v0.69'da üstüne eklenmişti). Başlık artık başta; altında sayfanın
          üç durağı ve DÜNYA kapsamı (Gökberk: "yalnız yurt içi değiliz"). */}
      <header className="wrap sayfa-bas">
        <div className="eyebrow">Kartlar ve kurallar</div>
        <h1 className="sayfa-h1">Kartınla hangi lounge&apos;a girersin?</h1>
        <p className="lead" style={{ marginTop: 14, maxWidth: 640 }}>
          Önce hakkının ne ettiğini gör, sonra programının misafir kuralını oku,
          en sonda havalimanı havalimanı hangi salona girdiğine bak.
        </p>
        <nav className="sayfa-duraklar" aria-label="Bu sayfada">
          <a href="#hesapla">Hakkın ne ediyor?</a>
          <a href="#programlar">Programların kuralı</a>
          <a href="#liste">Havalimanı listesi</a>
        </nav>
        <div className="dz-dunya">
          <div>
            <b>Türkiye&apos;de kart kart, dünyada salon salon.</b>
            <p>
              Kart–terminal sayfaları Türkiye&apos;deki {AIRPORT_COUNT} havalimanı için hazır.
              Yurt dışında {LOUNGE_COUNTS.abroadCountries} ülkede {LOUNGE_COUNTS.abroadAirports} havalimanı,
              {" "}{LOUNGE_COUNTS.abroadLounges} salon kataloğumuzda.
            </p>
          </div>
          <a className="beat" href="/rehber#yurtdisi">Yurt dışı salonlarını gör <span>→</span></a>
        </div>
      </header>

      <section className="section dark-band" id="hesapla">
        <div className="wrap">
          <WalletCalc />
        </div>
      </section>

      <section className="section dark-band" id="programlar">
        <div className="wrap">
          <div className="eyebrow">{BOLUM.kural.eyebrow}</div>
          <h2>{BOLUM.kural.h2}</h2>
          <p className="slogan">{SITE.ruleSlogan}</p>
          <p className="lead" style={{ marginTop: 12, maxWidth: 660 }}>
            Her programın misafir kuralı ayrı — ve birbirine benzemiyor.
            Hepsini tek cümlede toplamıyoruz, çünkü kapıda tek cümle diye
            bir şey yok. Her kart kendi cevabını veriyor; hepsi resmî
            kaynağından, tarih damgasıyla.
          </p>
          <p className="statement" style={{ marginTop: 22 }}>{SITE.ruleCompliance}</p>
          <p className="note" style={{ maxWidth: 640 }}>
            Aynı uçuş ve birlikte varış şartını eşleşmeden önce ararız —
            program kuralı bunu istediği için. {SITE.creditFrame}
          </p>
          <div className="prog-grid">
            {PROGRAMS.map((p) => (
              <div className="prog-card" key={p.t}>
                <div className="prog-tag">{p.tag}</div>
                <h3>{p.t}</h3>
                {!!p.alt && <p className="prog-alt">{p.alt}</p>}
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap" id="liste" style={{ maxWidth: 860, padding: "48px 24px 80px" }}>
        <div className="eyebrow">Türkiye · kart kart</div>
        <h2 style={{ fontSize: "clamp(24px,3.4vw,32px)" }}>Havalimanını aç, kartını seç.</h2>

        {/* v0.69.2 — "{TOTAL} sayfa" yerine sayfanın NE olduğu. */}
        <p className="lead" style={{ marginTop: 14 }}>
          Türkiye&apos;deki {AIRPORT_COUNT} havalimanında iç ve dış hat ayrı ayrı. Her düğme bir
          kartın o terminaldeki cevabı: hangi salona girersin, misafirini götürebilir misin —
          salon adı ve terminaliyle.
        </p>
        <p className="note" style={{ marginTop: 14 }}>
          Aynı kart iç hatta ve dış hatta farklı sonuç verir. Classic Plus iç hat
          salonuna ücretsiz girer, dış hatta tanımlı bir hakkı yoktur — bu yüzden
          iki terminal iki ayrı sayfadır.
        </p>

        {/* 🔴 v0.69.1 — 15 havalimanı × iç/dış hat hepsi açıkken liste
            sayfanın çoğunu tutuyordu. Rehberle aynı akordeon. */}
        <div style={{ marginTop: 34 }}>
        {groups.map(({ airport, scopes }) => (
          <details key={airport.code} className="acc">
            <summary>
              <h3>{airport.name}</h3>
              <span className="acc-say">{airport.code} · {airport.lounges.length} salon</span>
              <span className="acc-ok" aria-hidden="true" />
            </summary>
            <div className="acc-ic">
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              {airport.city} · katalogda {airport.lounges.length} salon
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
          </details>
        ))}
        </div>

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
