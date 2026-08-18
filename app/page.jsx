import { SITE, SECTIONS, FAQ, STATS, FLOW, SHOTS_MAIN, SHOTS_TRUST, PROGRAMS, TRUST, SHELF, HOST_WHY, HOST_RISK } from "../lib/content";
import NightScene from "../components/NightScene";
import SiteHeader from "../components/SiteHeader";
import PhoneShelf from "../components/PhoneShelf";
import SectionScene from "../components/SectionScene";
import RuleDemo from "../components/RuleDemo";
import Coverage from "../components/Coverage";
import WaitlistForm from "../components/WaitlistForm";
import WalletCalc from "../components/WalletCalc";

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
      {/* Sayfa boyunca süren atmosfer — sabit katman, scroll eden
          kapsayıcıya konsa her karede yeniden boyanırdı. */}
      <div className="aurora" aria-hidden="true" />
      {/* Dev kanat kesiti — sayfa boyunca sabit. Lounge Surf arka planda
          fotoğrafla bir form taşıyor; bizde o form MARKANIN İŞARETİ:
          aynı konik darbe, dev ölçekte, neredeyse görünmez opaklıkta.
          SVG olduğu için 0 KB'a yakın ve her ekranda keskin. */}
      <svg className="wing-bg" viewBox="0 0 800 1000" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8943A" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#B8943A" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M820 -60 C560 180, 300 430, 40 900 C300 520, 520 260, 860 60 Z" fill="url(#wg)" />
        <path d="M880 120 C660 320, 460 540, 250 980 C470 620, 660 400, 900 240 Z" fill="url(#wg)" opacity="0.7" />
        <path d="M840 -40 C580 200, 320 450, 60 920" fill="none" stroke="#B8943A" strokeOpacity="0.22" strokeWidth="1.5" />
      </svg>
      <div className="grain-fixed" aria-hidden="true" />
      {/* v0.17 — başlık çubuğu ortak bileşende. Beş dosyada beş kopya
          vardı ve dördü eski marka işaretinde kalmıştı. */}
      {/* v0.18 — menü artık SiteHeader'ın kendisinde: her sayfada aynı
          üç bağlantı ve TEK çağrı. Burada çocuk vermiyoruz ki ana sayfa
          ile alt sayfaların menüsü bir daha ayrışamasın. */}
      <SiteHeader />

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
            <div className="eyebrow">Salon hakkı cüzdanı</div>
            <h1>Senin uçağında,<br /><em>lounge'da yeri olan biri var.</em></h1>
            {/* 🔴 v0.20 — KONUMLANDIRMA CÜMLESİ, kahramanın içinde.
                Eskiden ilk satır "Havalimanı yol arkadaşı" idi: doğru
                ama ayırt edici değil — o cümleyi rakip de kurabilir
                (nitekim kuruyor: "connecting flights, connecting
                travelers"). Bu cümleyi kuramaz, çünkü kural motoru
                onda yok. */}
            <p className="hero-pos">
              LoungeLink bir pazar yeri değil — bir <b>salon hakkı cüzdanı</b>.
              İçinde bir pazar yeri var.
            </p>
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

      {/* v0.17 — burada İKİ tane <hr className="wing-rule" /> üst üsteydi:
          kopyala-yapıştır artığı. İkinci çizgi ritmi bozuyordu. */}
      <hr className="wing-rule" />

      {/* --- CÜZDAN: SİTENİN YENİ GİRİŞ KAPISI (v0.20) ---
          🔴 SIRALAMA DEĞİŞTİ VE SEBEBİ STRATEJİK.
          Bugüne kadar sıra "kahraman → akış → neden biz"di; yani
          ziyaretçiye önce PAZAR YERİ anlatılıyordu. Pazar yeri
          cümlesi ("seni hakkı olan biriyle eşleştiriyoruz") tavuk-
          yumurta problemini SİTEDE de yaşatır: ziyaretçi "burada
          kimse yok galiba" der ve çıkar.

          Cüzdan cümlesi bunu yaşatmaz — cüzdanın değeri karşı tarafta
          HİÇ KİMSE YOKKEN DE gerçek. Bu yüzden akıştan ÖNCE, kahramanın
          hemen ardında duruyor: ziyaretçi ilk 15 saniyede kaydolmadan
          kendi hakkının kaç para ettiğini öğreniyor.

          Ve bu, host toplamanın da kapısı: kartını sorup "3 hakkın 136
          gün sonra yanıyor, ≈90 €" cevabını alan kişi, o an host
          olduğunu öğreniyor. İkna ile haber vermenin kesiştiği yer. */}
      <section className="section dark-band" id="cuzdan" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <WalletCalc />
          {/* §3 ritmi: her içerik bölümü DAVET VURUŞUYLA kapanır.
              İlk yazımda iki yeni bölümü vuruşsuz bıraktım ve sitenin
              kendi denetimi yakaladı — kural işliyor. */}
          <a className="beat" href="/kartlar">Kendi kartının cevabını gör <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- AKIŞ: 3 ADIM — numara gerçek sıra taşıyor --- */}
      <section className="section dark-band alt" id="akis">
        <SectionScene kind="contrail" />
        <div className="ghost" aria-hidden="true">AKIŞ</div>
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

      <hr className="wing-rule" />

      {/* --- NEDEN --- */}
      <section className="section dark-band" id="neden">
        <SectionScene kind="wing" flip />
        <div className="ghost" aria-hidden="true">NEDEN</div>
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
              <img key={p.src} src={p.src} alt={p.alt} className="shot" width={p.w} height={p.h} loading="lazy" />
            ))}
          </div>
        {/* v0.9 — §3 ritim: bölüm DAVET vuruşuyla kapanır. Okuyucu bilgiyle bırakılırsa akış durur; her bölüm bir sonraki adımı işaret etmeli. */}
          <a className="beat" href="#beta">Sıradaki uçuşunda yalnız uçma <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- KURAL MOTORU ---
          🔴 Rakipte 4 GENEL ittifak kartı var; bizde her kart gerçek
          kural verisinden konuşuyor. Bu bölüm bizim hendek. */}
      <section className="section dark-band alt" id="kural">
        <SectionScene kind="runway" />
        <div className="ghost" aria-hidden="true">KURAL</div>
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
          {/* 🔴 v0.18 — ÜRÜNÜN EN GÜÇLÜ CÜMLESİ, ŞİMDİYE KADAR HİÇ
              YAZILMAMIŞTI. Aynı uçuş / birlikte varış şartı bir kısıt
              gibi anlatılıyordu; oysa o şart bir UYUM aracı: kart sahibi
              zaten orada ve birlikte giriyorlar — programların misafir
              kuralının öngördüğü senaryonun ta kendisi. Riski satış
              argümanına çeviren tek cümle bu. */}
          <p className="statement" style={{ marginTop: 22 }}>{SITE.ruleCompliance}</p>
          <p className="note" style={{ maxWidth: 640 }}>
            Aynı uçuş ve birlikte varış şartını eşleşmeden önce ararız —
            program kuralı bunu istediği için. {SITE.creditFrame}
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

      <hr className="wing-rule" />

      {/* --- KAPSAM ---
          🔴 Gökberk: "Kartınızla nereye girebilirsiniz ekranında sadece
          IST ve Sabiha Gökçen var. Bizim kapsamımız bundan çok çok daha
          fazlası." Doğru teşhis: kapsam vardı, SİTEDE yoktu. Ziyaretçi
          kendi havalimanını göremezse "bu ürün bana göre değil" der ve
          çıkar — ve haklıdır, çünkü gördüğü şey doğruydu.
          Veri lib/lounges-data.js'ten gelir, o da data/salonlar.csv'den
          ÜRETİLİR. Buraya elle sayı yazılmaz. */}
      <section className="section dark-band" id="kapsam">
        {/* radar = kapsama alanı; sahne bölümün konusunu taşır */}
        <SectionScene kind="radar" />
        <div className="ghost" aria-hidden="true">KAPSAM</div>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="eyebrow">Kapsam</div>
          <h2>Kartınla nereye girebilirsin?</h2>
          <Coverage />
          <a className="beat" href="/rehber">Havalimanını seç, salonu gör <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- GÜVEN — hepsi app'te gerçekten var olan mekanizmalar --- */}
      <section className="section dark-band" id="guven">
        <SectionScene kind="radar" />
        <div className="ghost" aria-hidden="true">GÜVEN</div>
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

      <hr className="wing-rule" />

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
              <img src={s.shot} alt={s.shotAlt} width={s.shotW} height={s.shotH} loading="lazy" />
            </div>
          </div>
        </section>
      ))}
      <hr className="wing-rule" />

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
      {/* --- HOST BÖLÜMÜ ---
          🔴 İki taraflı pazarda ARZ önce gelir. Misafir, host olmadan
          hiçbir şey göremez; host ise misafir olmadan da kartını
          kullanmaya devam eder. İkna edilmesi gereken taraf host, ve
          site bugüne kadar misafire konuşuyordu. */}
      <section className="section dark-band host-band" id="kart-sahibi">
        <SectionScene kind="wing" />
        <div className="ghost" aria-hidden="true">KART</div>
        <div className="wrap">
          <div className="sec-no">04</div>
          <div className="eyebrow">KART SAHİBİNE</div>
          <p className="statement">
            Bu yıl kartındaki misafir haklarından kaçını kullandın?<br />
            <span style={{ color: "var(--gold)" }}>Kullanmadıkların 31 Aralık&apos;ta siliniyor.</span>
          </p>
          {/* 🔴 v0.18 — host'un ilk itirazı "hakkımı mı veriyorum?".
              Cevap tek cümlede: hak devredilmiyor, koltuk paylaşılıyor. */}
          <p className="lead" style={{ maxWidth: 660 }}>
            Hakkın sende kalır. Sen zaten içeri giriyorsun — yanındaki koltuk
            boş gitmesin.
          </p>

          <div className="host-grid">
            {HOST_WHY.map((c, i) => (
              <div className="host-card" key={c.t} style={{ "--i": i }}>
                <span className="chip-ico" aria-hidden="true">{c.i}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>

          {/* İtirazlar: host'un aklından geçen soruyu ONUN cümlesiyle
              sorup cevaplıyoruz. Sormadan cevaplamak güven verir. */}
          <h3 className="host-qa-title">Aklından geçenler</h3>
          <div className="host-qa">
            {HOST_RISK.map((x) => (
              <div className="qa" key={x.q}>
                <b>{x.q}</b>
                <span>{x.a}</span>
              </div>
            ))}
          </div>

          <a className="beat" href="#beta">Kurucu çembere katıl <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- SSS --- */}
      {/* --- ABONELİK (v0.21) ---
          🔴 Fiyat sayfası SSS'den ÖNCE, host bandından SONRA geliyor.
          Sıra bir tez: ziyaretçi önce ürünü ve host tarafını görsün,
          sonra fiyatı — ve fiyatı gördüğü an ilk okuduğu şey
          ÖDEMEMENIN yolu olsun. */}
      <section className="section dark-band" id="plan">
        <div className="wrap">
          <div className="eyebrow">Abonelik</div>
          <h2>Ağırlarsan ödemezsin.</h2>
          <p className="lead" style={{ maxWidth: "52ch" }}>
            Ayda iki kişi ağırlayan host, o ay Sık Uçan ayrıcalıklarını ücretsiz
            kullanır. Abonelik bir maliyet değil, ağırlamadığın aylarda devreye
            giren bir seçenek.
          </p>

          <div className="plan-grid">
            {[
              { ad: "Yolcu", fiyat: "Ücretsiz", yil: null,
                haklar: ["Cüzdan: hak takibi, yanma sayacı, değer hesabı",
                         "Kural motoru: kartın nerede geçer",
                         "Ağırlayarak kredi kazanma",
                         "Aylık kaçırılan değer özeti"] },
              { ad: "Sık Uçan", fiyat: "₺99", yil: "₺890 / yıl · %25 indirim", one: true,
                haklar: ["Yolcu'daki her şey",
                         "Haftalık kaçırılan değer bildirimi",
                         "Ayda 2 ilan öne çıkarma",
                         "Yanma uyarısı: 90 · 30 · 7 gün",
                         "3 karta kadar cüzdan"] },
              { ad: "Kâhya", fiyat: "₺249", yil: "₺2.290 / yıl",
                haklar: ["Sık Uçan'daki her şey",
                         "Anlık kaçırılan değer bildirimi",
                         "Sınırsız ilan öne çıkarma",
                         "Sınırsız kart ve uçuş doğrulama",
                         "Öncelikli destek"] },
            ].map(p2 => (
              <div key={p2.ad} className={"plan-card" + (p2.one ? " on" : "")}>
                {p2.one && <span className="plan-tag">EN ÇOK SEÇİLEN</span>}
                <h3>{p2.ad}</h3>
                <div className="plan-price">{p2.fiyat}
                  {p2.fiyat !== "Ücretsiz" && <span> / ay</span>}
                </div>
                {p2.yil && <div className="plan-year">{p2.yil}</div>}
                <ul>{p2.haklar.map(h => <li key={h}>{h}</li>)}</ul>
              </div>
            ))}
          </div>

          {/* 🔴 KREDİ SATMIYORUZ — ve bunu açıkça yazıyoruz.
              Söylemezsek ziyaretçi "neden kredi paketi yok" diye
              sorar ve cevabı bilmez. */}
          <p className="note" style={{ marginTop: 24, maxWidth: "60ch" }}>
            Kredi parayla satılmaz. Krediye üç yoldan sahip olursun: kayıt hediyesi,
            planının aylık payı ve <b>ağırlama</b>. Ürünün cümlesi bu:
            kullanmadığın hakkı, hakkın olmayan yerde misafir olma hakkına çevirmek.
            Krediyi satsaydık o cümle bozulurdu.
          </p>
          <p className="note">Beta boyunca tüm planlar ücretsiz.</p>
          <a className="beat" href="#cuzdan">Önce hakkının ne ettiğini gör <span>→</span></a>
        </div>
      </section>

      <section className="section dark-band alt" id="sss">
        <SectionScene kind="contrail" flip />
        <div className="ghost" aria-hidden="true">SSS</div>
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
        <SectionScene kind="horizon" />
        <div className="ghost" aria-hidden="true">BETA</div>
        <div className="wrap" style={{ maxWidth: 620 }}>
          <div className="eyebrow">Kapalı beta</div>
          <h2>{SITE.closing} <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{SITE.closingEm}</em></h2>
          {/* 🔴 v0.17 — SİTENİN DÖNÜŞÜM NOKTASINDA AYNI CÜMLE İKİ KEZ
              yazılıydı ("Kurucu Host rozeti kalıcıdır" iki paragrafta).
              Kopyala-yapıştır artığı, hem de en pahalı yerde: ziyaretçi
              tam kaydolacakken metnin özensiz olduğunu görüyordu.
              Yeni metin tekrar etmiyor ve NE ALACAĞINI sayıyor. */}
          <p className="lead" style={{ marginTop: 10 }}>
            Kurucu çemberdeki ilk 100 host şunu alır:
          </p>
          <ul className="beta-list">
            <li>İlanların keşifte önce görünür</li>
            <li>Kurucu Host rozeti profilinde kalıcı durur — sonradan alınamaz</li>
            <li>Yeni özellikleri ilk sen denersin, yönünü sen söylersin</li>
            <li>Beta boyunca kredi sınırı yok</li>
          </ul>
          {/* 🔴 v0.18 — MAILTO GİTTİ, FORM GELDİ.
              Eski yorum "mailto BUGÜN çalışıyor" diyordu; ölçtüğümüzde
              çalışmadığı yer tam da en kalabalık yerdi: posta uygulaması
              yapılandırılmamış telefonda tıklama hiçbir şey yapmaz ve
              kullanıcı bunu hata olarak bile görmez. Üstelik hangi
              kanaldan geldiği ölçülemiyor, sonradan yazılacak liste
              birikmiyordu. mailto silinmedi — formun dibinde küçük
              puntoda yedek yol olarak duruyor. */}
          <h3 style={{ marginTop: 26, fontSize: 22 }}>Kurucu çembere katıl</h3>
          <p style={{ marginTop: 8 }}>İlk 100 host beta&apos;yı birlikte kuruyor.</p>
          <WaitlistForm />
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
        <div className="wrap" style={{ marginTop: 22, fontSize: 11.5, color: "var(--muted)" }}>
          © {new Date().getFullYear()} LoungeLink · Kural bilgileri resmî kaynaklardan derlenmiştir;
          kapıdaki son karar salona aittir.
        </div>
      </footer>
    </>
  );
}
