import SiteHeader from "../../components/SiteHeader";
import { FAQ, BOLUM } from "../../lib/content";

// 🔴 v0.52 — SSS ANA SAYFADAN AYRILDI (Gökberk: "ana sayfayı gereksiz
// uzatıyor"). Sorular ve cevaplar aynen; FAQPage şeması da buraya taşındı
// — Google şemayı içeriğin DURDUĞU sayfada ister, ana sayfada boş bir
// şema "zengin sonuç" değil yanlış beyan olurdu.
export const metadata = {
  title: "Sık sorulanlar — LoungeLink",
  description: "LoungeLink lounge erişimi satar mı, host neden birini içeri alır, kural bilgileri güvenilir mi — en sık sorulan soruların kısa cevapları.",
  alternates: { canonical: "/sss" },
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }) }}
      />
      <div className="wrap" style={{ maxWidth: 760, padding: "48px 24px 80px" }}>
        <div className="eyebrow">{BOLUM.sss.eyebrow}</div>
        <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)", marginBottom: 14 }}>{BOLUM.sss.h2}</h1>
        {/* v0.69.1 — sorular göz gezdirilir, cevap istenince açılır
            (rehber ve /kartlar ile aynı akordeon). FAQPage şeması
            cevapların tamamını taşımaya devam ediyor. */}
        <div style={{ marginTop: 18 }}>
          {FAQ.map((f) => (
            <details className="acc" key={f.q}>
              <summary>
                <h3>{f.q}</h3>
                <span className="acc-ok" aria-hidden="true" />
              </summary>
              <div className="acc-ic faq-item"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
        <p className="note" style={{ marginTop: 28 }}>
          Sorun burada yoksa: <a href="/destek">Destek</a> sayfasından yaz; hafta içi bir iş günü içinde dönüyoruz.
        </p>
      </div>
    </>
  );
}
