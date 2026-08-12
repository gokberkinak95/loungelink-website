import { SITE, SECTIONS, FAQ, STATS } from "../lib/content";
import Phone from "../components/Phone";
import RuleDemo from "../components/RuleDemo";

// ============================================================
// Ana sayfa
//
// 🔴 SIRALAMA BİLİNÇLİ: kahraman → KURAL MOTORU → keşif → güven → host.
// Kural motorunu 2. sıraya koydum çünkü tek gerçek farkımız o.
// Rakip sitesinde "nasıl çalışır" en başta; bizde önce "neden biz"
// gelmeli — çünkü ziyaretçi bizi bilmiyor ve ilk 10 saniyede
// "bunu başka kim yapıyor" sorusunun cevabını almalı.
// ============================================================
export default function Home() {
  return (
    <>
      <header style={{ borderBottom: "1px solid var(--line)", background: "var(--card)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", height: 66, gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
            <span style={{ fontSize: 20 }}>◈</span>
            <b style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>
              LoungeLink
            </b>
          </div>
          <a href="#rehber" style={{ fontSize: 14, color: "var(--muted)" }}>Salon Rehberi</a>
          <a href="#sss" style={{ fontSize: 14, color: "var(--muted)" }}>SSS</a>
          <a href="#beta" className="btn" style={{ padding: "9px 18px", fontSize: 13.5 }}>
            {SITE.betaCta}
          </a>
        </div>
      </header>

      {/* --- KAHRAMAN ---
          🔴 Ekran görüntüsü YOK, ÜRÜNÜN KENDİSİ var.
          Tek gerçek farkımız kural motoru ve o motor başka kullanıcı
          gerektirmiyor — sitede de aynı avantajı kullanıyoruz.
          Ziyaretçi kaydolmadan, üç saniyede değeri görüyor. */}
      <section style={{ padding: "76px 0 64px", background: "var(--bgAlt)" }}>
        <div className="wrap split rise">
          <div className="col-text">
            <div className="eyebrow">Havalimanı yol arkadaşı</div>
            <h1>{SITE.tagline}</h1>
            <p className="lead" style={{ marginTop: 20, maxWidth: 500 }}>{SITE.intro}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#beta" className="btn">{SITE.betaCta}</a>
              <a href="/rehber" className="btn btn-ghost">Salon Rehberi</a>
            </div>
            <div className="stats">
              {STATS.map((s) => (
                <div className="stat" key={s.l}>
                  <b>{s.n}</b>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div><RuleDemo /></div>
        </div>
      </section>

      <hr className="tear" />

      {/* --- BÖLÜMLER --- */}
      {SECTIONS.map((s, i) => (
        <section className="section" id={s.id} key={s.id}>
          <div className={"wrap split" + (i % 2 ? " rev" : "")}>
            <div className="col-text">
              <div className="eyebrow">{s.eyebrow}</div>
              <h2>{s.title}</h2>
              <p className="lead" style={{ marginTop: 18 }}>{s.body}</p>
              {s.note && <p className="note">{s.note}</p>}
            </div>
            <div><Phone id={s.screen} tilt={i % 2 ? "left" : "right"} /></div>
          </div>
        </section>
      ))}
      <hr className="tear" />

      {/* --- SSS --- */}
      <section className="section" id="sss" style={{ background: "var(--bgAlt)" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Sık sorulanlar</div>
          <h2 style={{ marginBottom: 14 }}>Aklınızdaki soru muhtemelen burada.</h2>
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BETA --- */}
      <section className="section" id="beta" style={{ textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 620 }}>
          <div className="eyebrow">Kapalı beta</div>
          <h2>İlk 100 host'tan biri olun.</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Kurucu Host rozeti kalıcıdır ve sonradan alınamaz. Beta'ya katılmak için
            e-posta gönderin; sizi listeye ekleyelim.
          </p>
          {/* 🔴 FORM YOK, MAILTO VAR — ve bu bilinçli.
              Form, çalışan bir backend + spam koruması + KVKK aydınlatma
              metni ister. Beta'da 100 kişi için mailto yeterli ve
              BUGÜN çalışıyor. Çalışmayan bir form, olmayan bir formdan
              kötüdür: ziyaretçi yazdığını sanır, kimse görmez. */}
          <a
            href={`mailto:${SITE.email}?subject=Beta%27ya%20katılmak%20istiyorum`}
            className="btn"
            style={{ marginTop: 26 }}
          >
            {SITE.email}
          </a>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "40px 0", background: "var(--card)" }}>
        <div className="wrap" style={{ display: "flex", gap: 30, flexWrap: "wrap", fontSize: 13.5, color: "var(--muted)" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <b style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: 16 }}>◈ LoungeLink</b>
            <p style={{ marginTop: 6, fontSize: 12.5 }}>
              Lounge erişimi satmaz. Doğrulanmış yolcuları buluşturur.
            </p>
          </div>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            <a href="/gizlilik">Gizlilik</a>
            <a href="/kosullar">Kullanım Koşulları</a>
            <a href="/hesap-sil">Hesap Silme</a>
            <a href={`mailto:${SITE.email}`}>İletişim</a>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 22, fontSize: 11.5, color: "var(--dim)" }}>
          © {new Date().getFullYear()} LoungeLink · Kural bilgileri resmî kaynaklardan derlenmiştir;
          kapıdaki son karar salona aittir.
        </div>
      </footer>
    </>
  );
}
