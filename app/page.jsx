import { SITE, SECTIONS, FAQ, STATS, FLOW, SHOTS_MAIN, SHOTS_TRUST, PROGRAMS, TRUST, SHELF } from "../lib/content";
import Phone from "../components/Phone";
import NightScene from "../components/NightScene";
import PhoneShelf from "../components/PhoneShelf";
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
            {/* v0.6 — marka işareti: app ikonuyla AYNI konik kanat darbesi.
                Metin sembolü (◈) yerine gerçek işaret; SVG olduğu için
                her ekranda keskin ve 0 KB'a yakın. */}
            <img src="/mark.svg" alt="LoungeLink" width={44} height={44} style={{ display: "block" }} />
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
      {/* --- KAHRAMAN: GECE UÇUŞU ---
          🔴 v0.4 — ESKİ HERO "BASİC"Tİ ve haklı bir eleştiriydi: açık
          zemin + iki sütun, her SaaS şablonunda var. Rakibin gücü koyu
          tema değil SAHNE kurması — duyguyu görsel taşıyor, ürün sonra
          geliyor. Biz de sahne kuruyoruz ama kendi malzememizle:
          kanat/şehir ışıkları KODLA çizildi (lisans yok, 0 KB, her
          ekranda keskin), kural matrisi sahnenin İÇİNDE duruyor —
          yani gösteri ile kanıt aynı karede. */}
      <section className="dark-band hero-dark">
        <NightScene />
        <div className="wrap split rise">
          <div className="col-text">
            <div className="eyebrow">Havalimanı yol arkadaşı</div>
            <h1>Senin uçağında,<br /><em>lounge'da yeri olan biri var.</em></h1>
            <p className="lead">{SITE.heroSub}</p>
            <div className="hero-cta">
              <a href="#beta" className="btn-gold">{SITE.betaCta}</a>
              <a href="/rehber" className="btn-ghost">Kartını sor · 3 saniye</a>
            </div>
            <div className="hero-stats">
              {STATS.map((x) => (
                <div key={x.l}><b>{x.n}</b><span>{x.l}</span></div>
              ))}
            </div>
          </div>
          <div><RuleDemo /></div>
        </div>
        <div className="wrap">
          <PhoneShelf shots={SHELF} caption="13 Ağustos 2026 beta yapısından gerçek ekranlar — mockup değil." />
        </div>
      </section>

      <hr className="tear" />

      <hr className="tear" />

      {/* --- AKIŞ: 3 ADIM — numara gerçek sıra taşıyor --- */}
      <section className="section dark-band alt" id="akis">
        <div className="wrap">
          <div className="eyebrow">Nasıl çalışır</div>
          <h2>Uçuşunu yaz, eşleşmeni bul.</h2>
          <div className="flow">
            {FLOW.map((f) => (
              <div className="flow-step" key={f.n}>
                <div className="flow-n">{f.n}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        
          {/* v0.9 — §3 ritim: bölüm DAVET vuruşuyla kapanır. Okuyucu bilgiyle bırakılırsa akış durur; her bölüm bir sonraki adımı işaret etmeli. */}
          <a className="beat" href="/rehber">Kartını sor, cevabı 3 saniyede gör <span>→</span></a>
        </div>
      </section>

      <hr className="tear" />

      {/* --- NEDEN --- */}
      <section className="section dark-band" id="neden">
        <div className="wrap split">
          <div className="col-text">
            <div className="eyebrow">Neden LoungeLink</div>
            <h2>Her uçuşta biri yalnız uçuyor — ve yanında bir kişilik yer var.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Kartındaki misafir hakkı yıl sonunda sessizce siliniyor. Aynı anda,
              aynı terminalde biri üç saatlik aktarmayı telefonuna bakarak geçiriyor.
              İki tarafı da tanıyoruz; ikisini buluşturuyoruz.
            </p>
            <p className="note">
              Aynı uçuşta, aynı salonda — kalkıştan önce yanındaki koltuktaki kişiyle tanış.
            </p>
          </div>
          <div className="shots shots-sm">
            {SHOTS_TRUST.map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} className="shot" loading="lazy" />
            ))}
          </div>
        {/* v0.9 — §3 ritim: bölüm DAVET vuruşuyla kapanır. Okuyucu bilgiyle bırakılırsa akış durur; her bölüm bir sonraki adımı işaret etmeli. */}
          <a className="beat" href="#beta">Sıradaki uçuşunda yalnız uçma <span>→</span></a>
        </div>
      </section>

      <hr className="tear" />

      {/* --- KURAL MOTORU ---
          🔴 Rakipte 4 GENEL ittifak kartı var; bizde her kart gerçek
          kural verisinden konuşuyor. Bu bölüm bizim hendek. */}
      <section className="section dark-band alt" id="kural">
        <div className="wrap">
          <div className="eyebrow">Kural motoru</div>
          <h2>"Bu kartla misafir götürebilir miyim?"</h2>
          <p style={{ marginTop: 10, fontFamily: "var(--serif)", fontSize: 19, color: "var(--gold)", fontStyle: "italic" }}>
            {SITE.ruleSlogan}
          </p>
          <p className="lead" style={{ marginTop: 12, maxWidth: 640 }}>
            Türkiye'de bu sorunun cevabını üç saniyede veren tek yer. Her program
            resmî kaynağından, tarih damgasıyla modellenir — kapıda sürpriz yok.
          </p>
          <div className="prog-grid">
            {PROGRAMS.map((p) => (
              <div className="prog-card" key={p.t}>
                <div className="prog-tag">{p.tag}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        {/* v0.9 — §3 ritim: bölüm DAVET vuruşuyla kapanır. Okuyucu bilgiyle bırakılırsa akış durur; her bölüm bir sonraki adımı işaret etmeli. */}
          <a className="beat" href="/rehber">Kendi kartının cevabını gör <span>→</span></a>
        </div>
      </section>

      <hr className="tear" />

      {/* --- GÜVEN — hepsi app'te gerçekten var olan mekanizmalar --- */}
      <section className="section dark-band" id="guven">
        <div className="wrap">
          <div className="eyebrow">Güven & güvenlik</div>
          {/* v0.8 — İFADE SATIRI: LS kart ızgaralarının arasına tek
              cümlelik büyük ifadeler koyuyor; okuyucu nefes alıyor ve
              argüman ilerliyor. Bizim karşılığımız kural motoruna bağlı. */}
          <p className="statement">Çoğu lounge üyeliği yanına bir kişi alır.<br />Sorun hakkın olması değil — kimin yanında olacağı.</p>
          <h2>Güven, süs değil iskelet.</h2>
          <div className="prog-grid trust-grid">
            {/* v0.8 — LS kart grameri: sessiz ikon çipi + soru başlığı +
                somut ayrıntılı gövde. Çip tek renk ve düşük kontrast;
                dikkat başlığa gitsin, ikona değil. */}
            {TRUST.map((c, i) => (
              <div className="prog-card" key={c.t} style={{ "--i": i }}>
                <span className="chip-ico" aria-hidden="true">{c.i}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        {/* v0.9 — §3 ritim: bölüm DAVET vuruşuyla kapanır. Okuyucu bilgiyle bırakılırsa akış durur; her bölüm bir sonraki adımı işaret etmeli. */}
          <a className="beat" href="#beta">Güvenli tarafta başla <span>→</span></a>
        </div>
      </section>

      <hr className="tear" />

      {/* --- BÖLÜMLER --- */}
      {SECTIONS.map((s, i) => (
        <section className={"section dark-band" + (i % 2 ? " alt" : "")} id={s.id} key={s.id}>
          <div className={"wrap split" + (i % 2 ? " rev" : "")}>
            <div className="col-text">
              <div className="eyebrow">{s.eyebrow}</div>
              <h2>{s.title}</h2>
              <p className="lead" style={{ marginTop: 18 }}>{s.body}</p>
              {s.note && <p className="note">{s.note}</p>}
              {/* v0.9 — §3: bölüm metni DAVET vuruşuyla biter */}
              <a className="beat" href={s.cta?.href || "#beta"}>{s.cta?.label || "Beta listesine yazıl →"}</a>
            </div>
            {/* 🔴 v0.4 (Gokberk: "gerçekçi olmayan görseller iğrenç
                duruyor") — HAKLI. Bu bölümlerde ÇİZİM telefon vardı:
                elle kodlanmış sahte bir arayüz. Sahte arayüz iki kez
                zarar verir: (1) ürünün gerçeğine benzemez, (2) ürün
                değişince bayatlar ve kimse güncellemez. Artık gerçek
                cihaz ekranı — eğik çerçevede, tıklanabilir hissiyle. */}
            <div className="shot-tilt">
              <img src={s.shot} alt={s.shotAlt} loading="lazy" />
            </div>
          </div>
        </section>
      ))}
      <hr className="tear" />

      {/* --- SSS ---
          🔴 v0.3.1 SEO: FAQPage JSON-LD. Rakip FAQ-ağır SEO oynuyor;
          bizim SSS içeriğimiz zaten var, şema onu Google'ın zengin
          sonuçlarına aday yapar. Veri FAQ dizisinden üretilir — metin
          değişince şema kendiliğinden günceldir, elle senkron yok. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }) }}
      />
      {/* --- SSS --- */}
      <section className="section dark-band alt" id="sss">
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
      <section className="section dark-band" id="beta" style={{ textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 620 }}>
          <div className="eyebrow">Kapalı beta</div>
          <h2>{SITE.closing} <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{SITE.closingEm}</em></h2>
          <p className="lead" style={{ marginTop: 10 }}>{"İlk 100 host'tan biri olun — Kurucu Host rozeti kalıcıdır."}</p>
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
            <b style={{ fontFamily: "var(--serif)", color: "var(--ink)", fontSize: 16, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <img src="/mark.svg" alt="" width={20} height={20} /> LoungeLink
            </b>
            <p style={{ marginTop: 6, fontSize: 12.5 }}>
              {SITE.footerSlogan} Lounge erişimi satmaz; doğrulanmış yolcuları buluşturur.
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
