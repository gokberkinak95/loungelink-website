import Link from "next/link";
import { SITE } from "../lib/content";

// 🔴 v0.51 — ÖZEL 404. Next'in varsayılan "This page could not be found."
// sayfası markasız, İngilizce ve çıkışsızdı: kırık bir bağlantıdan gelen
// ziyaretçi (eski bir Instagram linki, yanlış yazılmış /rehber/…) orada
// bitiyordu. 404 bir hata sayfası değil, bir YÖNLENDİRME sayfasıdır:
// en çok aranan üç şeyi (rehber, kartlar, destek) ve ana sayfayı verir.
export const metadata = { title: "Sayfa bulunamadı — LoungeLink", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="legal" style={{ minHeight: "60vh" }}>
      <div className="eyebrow">404</div>
      <h1>Bu kapı burada değil.</h1>
      <p className="legal-lead">
        Aradığın sayfa taşınmış ya da hiç olmamış olabilir. Çoğu ziyaretçi
        aslında şunlardan birini arıyor:
      </p>
      <ul className="legal-list">
        <li><Link href="/rehber">Salon rehberi</Link> — hangi kartla hangi salona girilir</li>
        <li><Link href="/kartlar">Kartlar</Link> — kartına göre misafir hakkı</li>
        <li><Link href="/destek">Destek</Link> — bir sorun mu var, yaz</li>
        <li><Link href="/">Ana sayfa</Link></li>
      </ul>
      <p style={{ marginTop: 24 }}>
        Bağlantıyı bizden aldıysan kırık olduğunu söyle: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </main>
  );
}
