import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://loungelink.co"),
  title: "LoungeLink — Havalimanı salonunda yalnız beklemeyin",
  description:
    "Aynı havalimanında aynı saatlerde bulunan doğrulanmış yolcuları buluşturur. " +
    "Hangi kartla hangi salona girebileceğinizi ve misafir götürüp götüremeyeceğinizi söyler.",
  // 🔴 OG etiketleri BAŞTAN kurulur, sonradan değil. Site paylaşıldığında
  // önizleme boş çıkarsa ilk izlenim kaybedilir ve ikinci şans olmaz.
  openGraph: {
    title: "LoungeLink — Aktarmada üç saat, yalnız geçmek zorunda değil",
    description:
      "Kartınla hangi salona girebilirsin, misafir götürebilir misin? " +
      "Türkiye'nin ilk lounge kural motoru.",
    locale: "tr_TR",
    type: "website",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
