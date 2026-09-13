// ============================================================
// SiteHeader — TEK marka işareti, TEK başlık çubuğu
//
// 🔴 v0.17 — AYNI SİTEDE İKİ MARKA İŞARETİ VARDI.
// Ana sayfa /mark.svg (gerçek konik kanat işareti) kullanıyordu;
// /rehber, /rehber/[slug], yasal sayfalar ve /hesap-sil ise eski
// metin sembolünü (U+25C8) kullanıyordu. Yani ziyaretçinin gördüğü 78
// alt sayfada marka BAŞKA bir işaretle duruyordu.
//
// Bu, "kopyala-yapıştır başlık" hatasının klasik sonucu: başlık beş
// dosyada beş kez yazılmıştı, biri güncellenince diğerleri kaldı.
// Çözüm bileşen çıkarmak — bir daha ayrışamaz.
// check.js §5 bekçisi: kaynakta o sembolü görürse derlemeyi durdurur.
// ============================================================
// 🔴 v0.18 — SALON REHBERİNE HEADER'DAN GİDİLEMİYORDU (Gökberk).
// Menü yalnız ana sayfada vardı: alt sayfalarda <SiteHeader /> çocuksuz
// çağrılıyordu, yani rehberde, yasal sayfalarda ve /hesap-sil'de hiç
// gezinme yoktu. Rehber sitenin en değerli varlığı ve ona giden tek
// yol ana sayfanın ortasındaki bir bağlantıydı.
//
// Menü artık bileşenin KENDİSİNDE: bir sayfa eklenince menüyü de
// eklemeyi unutmak imkânsız. Sade tutuldu —
//   Rehber · Nasıl çalışır · SSS  +  TEK çağrı (Beta listesi)
// MARKA_RUHU §9.5: iki çağrı yarışır, ikisi de kaybeder. Eski menüdeki
// "Kart sahibiysen" bağlantısı ikinci bir davetti; host bölümüne giden
// yol sayfanın içindeki davet vuruşlarında zaten var.
//
// Bağlantılar "/#..." biçiminde: alt sayfalardan da ana sayfanın
// doğru bölümüne gider. "#akis" yazsaydım rehberde hiçbir yere
// gitmezdi (aynı sayfada o çapa yok).
// 🔴 v0.28 — YUKARIDAKİ KARARIMI KISMEN GERİ ALIYORUM, sebebiyle.
// v0.18'de "Kart sahibiysen" bağlantısını menüden çıkardım ve gerekçem
// şuydu: "iki çağrı yarışır, ikisi de kaybeder." Gerekçe DOĞRUYDU ama
// yanlış şeye uygulandı — o kural İKİ BUTON için geçerlidir, iki menü
// maddesi için değil. Sonuç: sitenin ikna etmesi gereken taraf (host)
// menüde hiç adlandırılmadı; host bölümüne giden tek yol sayfanın
// ortasındaki bir vuruştu ve oraya inen ziyaretçi zaten ikna olmuş
// olandı.
// 🆕 SINIF: **"DOĞRU BİR KURALI YANLIŞ YERE UYGULAMAK, YANLIŞ BİR
// KURAL KADAR PAHALIYA MAL OLUR."**
// Buton hâlâ TEK (Beta listesi). Bu bir menü maddesi ve karşılığı
// olan bir söz veriyor: "ne kazanırım" sorusunun cevabı orada.
const NAV = [
  { href: "/rehber", label: "Rehber" },
  { href: "/#akis", label: "Nasıl çalışır" },
  { href: "/#kart-sahibi", label: "Kartın ne kazandırır" },
  { href: "/sss", label: "SSS" },
];

// v0.54.0 — `seffaf`: ana sayfada başlık çubuğu kahraman sahnesinin
// ÜSTÜNE biner (zemin yok, çizgi yok). Alt sayfalar eskisi gibi.
export default function SiteHeader({ children, seffaf = false }) {
  return (
    <header className={seffaf ? "site-head-seffaf" : undefined}
            style={seffaf ? undefined : { borderBottom: "1px solid var(--line)", background: "var(--card)" }}>
      <div className="wrap site-head-row">
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
          <img src="/mark.svg" alt="LoungeLink" width={44} height={44} style={{ display: "block" }} />
          <b style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", fontWeight: 700 }}>
            LoungeLink
          </b>
        </a>
        {/* v0.54.0 — şeffaf başlıkta çağrı düğmesi menünün DIŞINDA: mobilde
            marka ile aynı satırda sağda durur, bağlantılar alt satıra sarılır.
            Eskiden düğme kaydırılan menü satırının sonunda kesiliyordu
            (ölçüldü: 390'da "Beta li…"). Alt sayfalar eski yapıda. */}
        {seffaf && !children ? <a href="/#beta" className="btn site-cta">Beta listesi</a> : null}
        <nav className="site-nav" aria-label="Ana menü">
          {children || (
            <>
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>{n.label}</a>
              ))}
              {seffaf ? null : <a href="/#beta" className="btn">Beta listesi</a>}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
