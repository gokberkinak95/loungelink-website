import { LEGAL_DOCS, LEGAL_VERSION } from "../lib/legal-source";
import SiteHeader from "./SiteHeader";

export default function LegalPage({ docKey }) {
  // 🔴 App'teki yapı {key: {title, short, body}} — dil kırılımı YOK,
  // çünkü yasal metinler yalnız Türkçe tutuluyor (yürürlük Türkiye'de).
  // İlk yazımda `.tr` aradım ve boş döndü; yapıyı VARSAYMAK yerine
  // dosyaya bakmam gerekiyordu.
  const d = LEGAL_DOCS[docKey];
  if (!d) return <div className="wrap section">Belge bulunamadı.</div>;
  const missing = String(d.body).includes("{{");

  return (
    <>
      <SiteHeader />
      <div className="wrap" style={{ maxWidth: 720, padding: "44px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(26px,4vw,36px)" }}>{d.title}</h1>
        <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>
          Sürüm: {LEGAL_VERSION}
        </div>
        {/* 🔴 EKSİK ALAN GİZLENMİYOR, SÖYLENİYOR.
            Şirket unvanı henüz yok; sahte bir isim yazmak yerine
            eksik olduğunu açıkça belirtiyoruz. Yasal bir metinde
            uydurma bilgi, eksik bilgiden çok daha kötüdür. */}
        {missing && (
          <div style={{ background: "rgba(217,119,6,.08)", border: "1px solid rgba(217,119,6,.3)",
                        borderRadius: 12, padding: 14, marginTop: 18, fontSize: 13.5, color: "var(--body)" }}>
            ⚠ Bu belge beta sürümüdür. Şirket unvanı ve adres bilgileri tüzel kişilik
            kurulduğunda tamamlanacaktır.
          </div>
        )}
        <div style={{ whiteSpace: "pre-line", marginTop: 24, fontSize: 15, lineHeight: 1.75 }}>
          {d.body}
        </div>
      </div>
    </>
  );
}
