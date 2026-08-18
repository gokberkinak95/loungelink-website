import LegalPage from "../../components/LegalPage";
// 🔴 v0.17 — yasal sayfalarda `description` yoktu: arama sonucunda
// Google açıklamayı sayfadan RASTGELE bir parça alarak yazar ve çoğu
// zaman "Sürüm: 2026-01" gibi anlamsız bir satır çıkar. Bir cümlelik
// açıklama, o kararı bize geri verir.
export const metadata = {
  title: "Çerez Politikası — LoungeLink",
  description:
    "LoungeLink hangi çerezleri kullanıyor, ne kadar süre saklıyor ve " +
    "tercihini nasıl değiştirebilirsin?",
  alternates: { canonical: "/cerez" },
};
export default function Page() { return <LegalPage docKey="cerez" />; }
