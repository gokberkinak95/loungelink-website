import LegalPage from "../../components/LegalPage";
export const metadata = {
  title: "KVKK Aydınlatma Metni — LoungeLink",
  description:
    "Kişisel verilerin hangi amaçla işleniyor, kimlerle paylaşılıyor ve " +
    "KVKK kapsamındaki haklarını nasıl kullanırsın?",
  alternates: { canonical: "/aydinlatma" },
};
export default function Page() { return <LegalPage docKey="aydinlatma" />; }
