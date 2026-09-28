import { AIRPORTS, CARDS, ENTRIES, CARRIER_RULE, slugOf } from "../../lib/guide";
import SiteHeader from "../../components/SiteHeader";
import KapsamDizini from "../../components/KapsamDizini";
import { LOUNGE_COUNTS } from "../../lib/lounges-data";
import { SCOPES, groupedPages } from "../../lib/card-pages";

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
  // 🔴 20 AĞUSTOS — ETİKETLER KİMDEN BAHSETTİĞİNİ SÖYLEMİYORDU.
  // "misafir olur / ücretli / yalnız kendin" üçü de EKSİK ÖZNELİ:
  // ücretli olan kim, hakkı olmayan kim? Sayfanın sorusu "misafir
  // götürebilir misin"; cevap da misafir üzerinden kurulmalı.
  const V = {
    yes:       ["var(--green)",  "misafir hakkın var"],
    self_only: ["var(--muted)",  "misafir hakkın yok"],
    paid:      ["var(--amber)",  "misafir ücretle girer"],
    no:        ["var(--ink)",    "bu salonda hakkın yok"],
  };

  // 🔴 v0.69.3 (Gökberk: "iki benzer alanı iki sayfada vermek gereksiz") —
  // /kartlar'daki "Havalimanını aç, kartını seç" listesi ve bu sayfanın
  // alttaki "Kart kart kural sayfaları" listesi AYNI 15 havalimanını iki kez
  // sayıyordu. Artık tek akordeon: her havalimanında salonlar + kartınla bu
  // terminalde (/kart/…) + misafir kuralı (/rehber/…). Bağlantılar HTML'de
  // durur: kart ve kural sayfalarının tek giriş düğümü burası.
  const trEk = {};
  for (const { airport, scopes } of groupedPages()) {
    (trEk[airport.code] ||= { kartlar: [], kurallar: [] }).kartlar = scopes.map(({ scope, list }) => ({
      etiket: SCOPES[scope].label, salon: list[0].lounges.length,
      dugmeler: list.map((p) => ({ href: `/kart/${p.slug}`, ad: CARDS[p.card].short })),
    }));
  }
  for (const [code, list] of Object.entries(byAirport)) {
    (trEk[code] ||= { kartlar: [], kurallar: [] }).kurallar = list.map((e) => ({
      href: `/rehber/${slugOf(e)}`, kart: CARDS[e.card].label, baslik: e.headline,
      renk: V[e.verdict][0], sonuc: V[e.verdict][1],
    }));
  }

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
        {/* 🔴 v0.69.2 (Gökberk: "yalnız yurt içini kapsamadığımızı göstermeliyiz")
            Harita + Türkiye listesi ana sayfada (vitrin). Burası TAM DİZİN:
            Türkiye ve yurt dışı iki sekme, yurt dışında arama. */}
        <h2 style={{ fontSize: "clamp(24px,3.4vw,32px)", marginTop: 40 }}>
          Türkiye&apos;den dünyaya: {LOUNGE_COUNTS.countries} ülkede {LOUNGE_COUNTS.lounges} salon.
        </h2>
        <div style={{ marginTop: 20 }}>
          <KapsamDizini trEk={trEk} />
        </div>

      </div>
    </>
  );
}
