import LegalPage from "../../components/LegalPage";
// 🔴 v0.34 — BU SAYFA YOKTU.
// `lib/legal-source.js` BEŞ belge tanımlıyor (LEGAL_ORDER) ve uygulamada
// kayıt anında `acikRiza` onayı ALINIYOR — ama web'de karşılığı hiç
// yayınlanmamıştı. Yani kullanıcı onayladığı metni tarayıcıdan okuyamıyordu.
// 🆕 SINIF: "ONAYI ALINAN BİR METNİN OKUNABİLİR OLMAMASI, ONAYI GEÇERSİZ
// KILMASA BİLE SAVUNULAMAZ YAPAR."
export const metadata = {
  title: "Açık Rıza Metni — LoungeLink",
  description:
    "LoungeLink hangi verilerin işlenmesi için açık rızanı istiyor, bu rıza " +
    "neyi kapsıyor ve nasıl geri çekilir?",
  alternates: { canonical: "/acik-riza" },
};
export default function Page() { return <LegalPage docKey="acikRiza" />; }
