import { FAQ } from "../../lib/content";
import { AIRPORTS, CARDS, ENTRIES, slugOf } from "../../lib/guide";
import { CARD_PAGES, cardQuestion } from "../../lib/card-pages";
import { questionOf } from "../rehber/[slug]/page";

// 🔵 22 EKİM — llms.txt (GEO). Yapay zekâ arama motorları (ChatGPT, Perplexity, Gemini,
// Claude) siteyi özetlerken bu dosyayı okuyabiliyor. Sitemap gibi VERİDEN üretilir:
// SSS, rehber ve kart sayfaları eklendikçe kendiliğinden büyür; elle satır yazılmaz.
// Fiyat ve oran BİLEREK yok — BO'dan değişir, burada bayatlar; plan sayfasına yönlendirilir.
export const dynamic = "force-static";

const B = "https://loungelink.co";
const duz = (s) => s.replace(/\s+/g, " ").trim();

export function GET() {
  const satir = [
    "# LoungeLink",
    "",
    "> LoungeLink, havalimanında aynı saatlerde bulunan doğrulanmış yolcuları buluşturan bir mobil uygulamadır (iOS ve Android). " +
      "Kredi kartı, havayolu statüsü ya da lounge üyeliği sayesinde misafir hakkı olan yolcular (host) ile salona misafir olarak " +
      "girmek isteyen yolcuları eşleştirir; kural motoru hangi kartla hangi salona girilebileceğini ve misafir götürülüp " +
      "götürülemeyeceğini söyler. LoungeLink lounge erişimi satmaz ve hiçbir lounge işletmecisiyle bağlantılı değildir; " +
      "salona giriş kararı her zaman salonundur.",
    "",
    "## Temel sayfalar",
    `- [Ana sayfa](${B}/): ürünün nasıl çalıştığı`,
    `- [Ayrıcalıklar ve planlar](${B}/ayricaliklar): Yolcu, Sık Uçan ve Jetset planları; host kazancı, LoungePuan ve ödüller`,
    `- [Sık sorulan sorular](${B}/sss)`,
    `- [Salon rehberi](${B}/rehber): kart ve havalimanına göre misafir hakkı`,
    `- [Kart sayfaları](${B}/kartlar): Türkiye havalimanlarında kartına göre girebileceğin salonlar`,
    `- [Destek](${B}/destek) · [Hesap silme](${B}/hesap-sil)`,
    `- [Gizlilik](${B}/gizlilik) · [Kullanım koşulları](${B}/kosullar)`,
    `- [English](${B}/en): product summary in English`,
    "",
    "## Sık sorulan sorular",
    ...FAQ.flatMap((f) => [`### ${duz(f.q)}`, duz(f.a), ""]),
    "## Salon rehberi",
    ...ENTRIES.map((e) => `- [${questionOf(CARDS[e.card], AIRPORTS[e.airport])}](${B}/rehber/${slugOf(e)})`),
    "",
    "## Kart sayfaları",
    ...CARD_PAGES.map((p) => `- [${cardQuestion(p)}](${B}/kart/${p.slug})`),
    "",
    "## İletişim",
    "- Destek: destek@loungelink.co",
    "- Kişisel veriler (KVKK): kvkk@loungelink.co",
    "",
  ];
  return new Response(satir.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
