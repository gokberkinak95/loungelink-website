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
  // 🔴 FAVICON ESKİ LOGOYU GÖSTERİYORDU. Dosya doğruydu (/favicon.png
  // yeni işaret) ama tarayıcı favicon'u agresif önbelleğe alır ve sabit
  // bir URL'de değişikliği fark etmez. Next App Router'ın `app/icon.png`
  // kuralı dosyayı HASH'Lİ bir URL ile yayınlar (/icon.<hash>.png) —
  // içerik değişince URL değişir, önbellek kendiliğinden kırılır.
  // Bu satır artık gereksiz ama zararsız: app/icon.png önceliklidir.
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
