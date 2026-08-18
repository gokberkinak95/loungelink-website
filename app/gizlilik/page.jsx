import LegalPage from "../../components/LegalPage";
export const metadata = {
  title: "Gizlilik Politikası — LoungeLink",
  description:
    "LoungeLink hangi verileri topluyor, neden topluyor, ne kadar saklıyor " +
    "ve verilerini silmek istediğinde ne oluyor?",
  alternates: { canonical: "/gizlilik" },
};
export default function Page() { return <LegalPage docKey="gizlilik" />; }
