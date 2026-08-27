import { SITE } from "../../lib/content";

// 🔴 v0.34 — APP STORE CONNECT AYRI BİR "SUPPORT URL" İSTİYOR.
// Sitede yalnız footer'da bir `mailto:` vardı; mağaza formu bir SAYFA
// adresi ister ve inceleyici o sayfaya bakar.
// 🆕 SINIF: "MAĞAZANIN İSTEDİĞİ ŞEY BİR E-POSTA DEĞİL BİR ADRESTİR —
// ULAŞILABİLİRLİK, ULAŞMA YOLUNUN GÖRÜNÜR OLMASIDIR."
export const metadata = {
  title: "Destek — LoungeLink",
  description:
    "LoungeLink'e nasıl ulaşırsın, ne kadar sürede dönüş alırsın, " +
    "hesabını nasıl silersin ve bir sorunu nasıl bildirirsin?",
  alternates: { canonical: "/destek" },
};

const KONULAR = [
  ["Hesabımı silmek istiyorum",
   "Uygulamada Profil › Ayarlar › Hesabı Sil. Hesabın ve kişisel verilerin siliniyor; " +
   "yasal saklama süresi olan kayıtlar (şikâyet, uyuşmazlık) mevzuatın öngördüğü süre " +
   "boyunca anonimleştirilerek tutuluyor.",
   "/hesap-sil"],
  ["Bir kullanıcıyı bildirmek istiyorum",
   "Uygulamada kişinin profilinde ve sohbet ekranında “Bildir” var. Taciz ve " +
   "dolandırıcılık bildirimleri tek şikâyetle incelemeye alınır.", null],
  ["Acil bir durumdayım",
   "Hayati tehlike varsa önce 112'yi ara. Biz acil servis değiliz. Uygulamadaki SOS " +
   "düğmesi ekibimize ve oturumdaki karşı tarafa bildirim gönderir.", null],
  ["Verilerime erişmek / düzeltmek istiyorum",
   "KVKK kapsamındaki taleplerini aşağıdaki adrese yazabilirsin; en geç 30 gün " +
   "içinde dönüş yapıyoruz.", "/aydinlatma"],
  ["Kural motoru bana yanlış cevap verdi",
   "Salon kuralları haber verilmeden değişebilir. Uygulamadaki “Haber ver” ile " +
   "bildirdiğinde kaydı elden geçiriyoruz — kural kaynağını da gösteriyoruz.", "/rehber"],
];

export default function Page() {
  return (
    <main className="legal">
      <h1>Destek</h1>
      <p className="legal-lead">
        Sorularının çoğunun cevabı aşağıda. Bulamazsan yaz — hafta içi 1 iş günü
        içinde dönüyoruz.
      </p>
      <p className="legal-lead">
        <b>E-posta:</b> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      {KONULAR.map(([baslik, metin, link]) => (
        <section key={baslik} style={{ marginTop: 22 }}>
          <h2>{baslik}</h2>
          <p>{metin}</p>
          {link ? <p><a href={link}>Ayrıntı →</a></p> : null}
        </section>
      ))}
      <section style={{ marginTop: 28 }}>
        <h2>Yasal metinler</h2>
        <p>
          <a href="/gizlilik">Gizlilik Politikası</a> · <a href="/aydinlatma">Aydınlatma Metni</a> ·{" "}
          <a href="/acik-riza">Açık Rıza Metni</a> · <a href="/cerez">Çerez Politikası</a> ·{" "}
          <a href="/kosullar">Kullanım Koşulları</a>
        </p>
      </section>
    </main>
  );
}
