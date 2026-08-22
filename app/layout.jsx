import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://loungelink.co"),
  title: "LoungeLink — Havalimanı salonunda yalnız beklemeyin",
  description:
    "Aynı havalimanında aynı saatlerde bulunan doğrulanmış yolcuları buluşturur. " +
    "Hangi kartla hangi salona girebileceğinizi ve misafir götürüp götüremeyeceğinizi söyler.",
  // 🔴 OG etiketleri BAŞTAN kurulur, sonradan değil. Site paylaşıldığında
  // önizleme boş çıkarsa ilk izlenim kaybedilir ve ikinci şans olmaz.
  //
  // 🔴 v0.17 — ÜÇ EKSİK: canonical yoktu, og:image yoktu, twitter kartı
  // yoktu. og:image'siz bir bağlantı WhatsApp'ta ve X'te ÇIPLAK bir URL
  // olarak görünür; tıklanma oranı yarıya iner. Görsel artık var
  // (public/og.jpg — 01_kesif kampanya karesinden 1200×630 kırpıldı,
  // metin kesilmediği piksel taramasıyla doğrulandı).
  // canonical olmadan da "/" ile "/?utm_source=..." Google için iki
  // ayrı sayfadır; ikisi birbirinin sıralamasını yer.
  alternates: { canonical: "/" },
  openGraph: {
    title: "LoungeLink — Aktarmada üç saat, yalnız geçmek zorunda değil",
    description:
      "Kartınla hangi salona girebilirsin, misafir götürebilir misin? " +
      "Türkiye'nin ilk lounge kural motoru.",
    url: "/",
    siteName: "LoungeLink",
    locale: "tr_TR",
    type: "website",
    images: [{
      url: "/og.jpg", width: 1200, height: 630,
      alt: "LoungeLink — aynı terminalde, kartının ne verdiğini gösteren kural motoru",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoungeLink — Aktarmada üç saat, yalnız geçmek zorunda değil",
    images: ["/og.jpg"],
  },
  // 🔴 FAVICON ESKİ LOGOYU GÖSTERİYORDU. Dosya doğruydu (/favicon.png
  // yeni işaret) ama tarayıcı favicon'u agresif önbelleğe alır ve sabit
  // bir URL'de değişikliği fark etmez. Next App Router'ın `app/icon.png`
  // kuralı dosyayı HASH'Lİ bir URL ile yayınlar (/icon.<hash>.png) —
  // içerik değişince URL değişir, önbellek kendiliğinden kırılır.
  // Bu satır artık gereksiz ama zararsız: app/icon.png önceliklidir.
};

// 🔴 21 AĞUSTOS — SÜRÜM DAMGASI. Neden var:
// Ölçüm aracını çalıştırdım, 3 taşma + 1407 dokunma ihlali gördüm ve
// bir an "yeni blok her şeyi kırdı" sandım. Sebep başkaydı: 3401
// portunda ESKİ bir `next-server` süreci ayaktaydı (process adı
// "next-server" olduğu için `pkill -f "next start"` onu öldürmemişti)
// ve ölçüm ARADAN AYLAR ÖNCEKİ bir derlemeyi ölçüyordu.
//
// 🆕 SINIF: **"BİR ÖLÇÜM, NEYİ ÖLÇTÜĞÜNÜ İSPAT EDEMİYORSA ÖLÇÜM
// DEĞİLDİR."** (Kardeşi: zip `C:\website`'e açılıp build
// `C:\website-git`'te alınıyordu — scripts/konum.js aynı sınıf.)
//
// Bu damga sayesinde olcum/tam_olcum.py artık sayfayı açar açmaz
// sunulan sürümü package.json ile karşılaştırıyor; tutmuyorsa hiç
// ölçmeden duruyor.
const SURUM = require("../package.json").version;

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="ll-surum" content={SURUM} />
      </head>
      <body>{children}</body>
    </html>
  );
}
