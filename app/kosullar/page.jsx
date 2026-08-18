import LegalPage from "../../components/LegalPage";
export const metadata = {
  title: "Kullanım Koşulları — LoungeLink",
  description:
    "LoungeLink'i kullanırken geçerli kurallar: host ve misafir " +
    "sorumlulukları, kredi işleyişi ve platformun sınırları.",
  alternates: { canonical: "/kosullar" },
};
export default function Page() { return <LegalPage docKey="platform" />; }
