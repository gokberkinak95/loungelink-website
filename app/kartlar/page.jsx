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
  // v0.69.3 — havalimanı listesi Salon rehberine taşındı; başlık sayfanın yeni işini söylüyor.
  title: "Kartın ne veriyor, kuralı ne diyor? Hak hesaplayıcı ve misafir kuralları | LoungeLink",
  description:
    "Miles&Smiles, Star Alliance Gold, Priority Pass, DragonPass: kullanılmayan misafir hakkın ne ediyor " +
    "ve her programın misafir kuralı ne diyor? Kaydolmadan, resmî kaynağından.",
  alternates: { canonical: "/kartlar" },
  openGraph: {
    title: "Kartın ne veriyor, kuralı ne diyor?",
    description: `Hak hesaplayıcı ve dokuz programın misafir kuralı. Salon rehberi: dünyada ${LOUNGE_COUNTS.lounges} salon.`,
    url: "/kartlar",
    siteName: "LoungeLink",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LoungeLink — lounge kural motoru" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function CardsIndex() {

  return (
    <>
      <SiteHeader />
      {/* 🔴 v0.69.2 — SAYFANIN h1'İ EN ALTTAYDI (hesaplayıcı ve programlar
          v0.69'da üstüne eklenmişti). Başlık artık başta; altında sayfanın
          üç durağı ve DÜNYA kapsamı (Gökberk: "yalnız yurt içi değiliz"). */}
      <header className="wrap sayfa-bas">
        {/* v0.69.3 (Gökberk) — havalimanı listesi Salon rehberine taşındı;
            bu sayfa kartın DEĞERİ ve programın KURALI. Başlık da bunu söylüyor. */}
        <div className="eyebrow">Kartlar ve kurallar</div>
        <h1 className="sayfa-h1">Kartın ne veriyor, kuralı ne diyor?</h1>
        <p className="lead" style={{ marginTop: 14, maxWidth: 640 }}>
          Önce hakkının ne ettiğini gör, sonra programının misafir kuralını oku.
          Hangi havalimanında hangi salona girdiğin Salon rehberinde.
        </p>
        <nav className="sayfa-duraklar" aria-label="Bu sayfada">
          <a href="#hesapla">Hakkın ne ediyor?</a>
          <a href="#programlar">Programların kuralı</a>
          <a href="/rehber">Salon rehberi →</a>
        </nav>
        <div className="dz-dunya">
          <div>
            <b>Türkiye&apos;de kart kart, dünyada salon salon.</b>
            <p>
              Türkiye&apos;deki {AIRPORT_COUNT} havalimanında kartının her terminaldeki cevabı hazır.
              Yurt dışında {LOUNGE_COUNTS.abroadCountries} ülkede {LOUNGE_COUNTS.abroadAirports} havalimanı,
              {" "}{LOUNGE_COUNTS.abroadLounges} salon kataloğumuzda.
            </p>
          </div>
          <a className="beat" href="/rehber">Salon rehberini aç <span>→</span></a>
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

      {/* 🔴 v0.69.3 — "Havalimanını aç, kartını seç" listesi Salon rehberinin
          havalimanı akordeonuna taşındı (orada salonlarla ve misafir kuralıyla
          birlikte). Eski /kartlar#liste bağlantısı kapanışa iner. */}
      <div className="wrap" id="liste" style={{ maxWidth: 860, padding: "48px 24px 80px" }}>
        <div className="dz-dunya">
          <div>
            <b>Havalimanını aç, kartını seç.</b>
            <p>
              Aynı kart iç hatta ve dış hatta farklı sonuç verir. Classic Plus iç hat
              salonuna ücretsiz girer, dış hatta tanımlı bir hakkı yoktur. Her
              havalimanında terminal terminal cevap Salon rehberinde.
            </p>
          </div>
          <a className="beat" href="/rehber">Salon rehberine git <span>→</span></a>
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, lineHeight: 1.6 }}>
          {SOURCE_NOTE}
        </p>
      </div>
    </>
  );
}
