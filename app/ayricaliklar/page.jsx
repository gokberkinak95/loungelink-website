import SiteHeader from "../../components/SiteHeader";
import OlayLink from "../../components/OlayLink";
import EgikEkran from "../../components/EgikEkran";
import HostEarn from "../../components/HostEarn";
import HostStories from "../../components/HostStories";
import PlanKartlari from "../../components/PlanKartlari";
import { BOLUM, SECTIONS, HOST_WHY, HOST_RISK, SITE } from "../../lib/content";

// ============================================================
// /ayricaliklar — ağırlayınca ne kazanırsın   (v0.69 · 28 Eylül)
//
// 🔴 Bu içerik ana sayfadaydı ve ana sayfanın en uzun bölümüydü
// (host bandı 4.628 px + abonelik 1.089 px). Gökberk: "aşağı indikçe
// bitmeyen bir alan fazlalığı". İçerik SİLİNMEDİ, KISALTILMADI —
// kendi sayfasına taşındı; ana sayfa "Kartım var" tarafından buraya
// bağlanıyor. Eski /#plan bağlantısı EskiCapa ile /ayricaliklar#plan'a gelir.
// Metinler ve sayılar aynen: HOST_WHY, HostEarn (SQL 206/007/246),
// HOST_RISK, plan fiyatları.
// ============================================================
export const metadata = {
  title: "Ayrıcalıklar ve üyelik — ağırlayınca ne kazanırsın | LoungeLink",
  description:
    "Kartındaki kullanılmayan misafir hakkını paylaş: her ağırlama 1 kredi ve 500 LoungePuan. " +
    "Basamaklar, mağaza, abonelik ve host'un aklındaki sorular.",
  alternates: { canonical: "/ayricaliklar" },
};

export default function Ayricaliklar() {
  const s = SECTIONS[1];
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section dark-band host-band" id="kart-sahibi">
          <div className="wrap split">
            <div className="col-text">
              <div className="eyebrow">{s.eyebrow}</div>
              <h1 className="sayfa-h1">{s.title}</h1>
              <p className="lead" style={{ marginTop: 18 }}>{s.body}</p>
              {s.note && <p className="note">{s.note}</p>}
            </div>
            <EgikEkran src={s.shot} alt={s.shotAlt} w={s.shotW} h={s.shotH} />
          </div>
          <div className="wrap">
            <div className="eyebrow">{BOLUM.host.eyebrow.toLocaleUpperCase("tr-TR")}</div>
            <h2>{BOLUM.host.h2}</h2>
            <p className="statement">
              {BOLUM.host.statement}<br />
              <span style={{ color: "var(--gold)" }}>Kullanmadıkların 31 Aralık&apos;ta siliniyor.</span>
            </p>
            <div className="host-grid">
              {HOST_WHY.map((c, i) => (
                <div className="host-card" key={c.t} style={{ "--i": i }}>
                  <span className="idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
            <HostEarn />
            <HostStories />
            <h3 className="host-qa-title">Aklından geçenler</h3>
            <div className="host-qa">
              {HOST_RISK.map((x) => (
                <div className="qa" key={x.q}>
                  <b>{x.q}</b>
                  <span>{x.a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="wing-rule" />

        <section className="section dark-band" id="plan">
          <div className="wrap">
            <div className="eyebrow">{BOLUM.plan.eyebrow}</div>
            <h2>{BOLUM.plan.h2}</h2>
            <p className="lead" style={{ maxWidth: "52ch" }}>
              Ayda iki kişi ağırlayan host, o ay Sık Uçan ayrıcalıklarını ücretsiz
              kullanır. Abonelik bir maliyet değil, ağırlamadığın aylarda devreye
              giren bir seçenek.
            </p>

            <PlanKartlari />

            {/* 🔴 26 AĞUSTOS — BU PARAGRAF "KREDİ PARAYLA SATILMAZ" DİYORDU
                ve uygulama ₺ fiyatlı kredi paketleri listeliyordu. İki yüzey
                iki farklı cevap veriyordu. Karar verildi: kredi satılıyor.
                O yüzden burada satılmadığını söylemek değil, SATILAN ŞEYİN NE
                OLDUĞUNU söylemek gerekiyor. */}
            <p className="note" style={{ marginTop: 24, maxWidth: "60ch" }}>
              Krediye dört yoldan sahip olursun: kayıt hediyesi, planının aylık payı,
              <b> ağırlama</b> ve kredi paketi. Satın aldığın şey <b>giriş değil</b>,
              bir host'a istek gönderme hakkı — host reddederse, kimse yanıtlamazsa
              ya da kapıda alınmazsan kredin geri döner. Ürünün cümlesi değişmedi:
              kullanmadığın hakkı, hakkın olmayan yerde misafir olma hakkına çevirmek.
            </p>
            <p className="note">Beta boyunca tüm <b>planlar</b> ücretsiz; kredi paketleri ücretlidir.</p>
            <OlayLink ad="host_ol" ozellik={{ yer: "ayricaliklar" }}
                      className="btn-gold" href="/#beta">{SITE.betaCta}</OlayLink>
          </div>
        </section>
      </main>
    </>
  );
}
