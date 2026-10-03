import { SITE, BOLUM, SAHNE, STATS, FLOW, TRUST, SHELF, SHOTS_TRUST } from "../lib/content";
import SiteHeader from "../components/SiteHeader";
import OlayLink from "../components/OlayLink";
// 🔴 v0.41 — `PhoneShelf` yerine `EkranKarusel`.
// Eski bileşen SİLİNMEDİ, `components/_arsiv/`e taşındı: geri dönüş
// yolunu silmek, değişikliği geri alınamaz yapar.
import EkranKarusel from "../components/EkranKarusel";
import SectionScene from "../components/SectionScene";
import RuleDemo from "../components/RuleDemo";
import WaitlistForm from "../components/WaitlistForm";
import KurucuSayac from "../components/KurucuSayac";
import SahneCanlandir from "../components/SahneCanlandir";
// v0.68 — hareket katmanı (Gökberk onayı · W1–W9). Yeni kütüphane yok: SVG + CSS.
// v0.69 — W2'nin "Onaylı" mührü ve W9 kurucu çember kaldırıldı (Gökberk); diğerleri yerinde.
import HeroIz from "../components/HeroIz";
import RotaAkis from "../components/RotaAkis";
import GuvenKalkan from "../components/GuvenKalkan";
import TarafSecimi from "../components/TarafSecimi";
import Coverage from "../components/Coverage";
import PlanKartlari from "../components/PlanKartlari";
import EskiCapa from "../components/EskiCapa";

// ============================================================
// Ana sayfa
//
// 🔴 v0.69 (Gökberk, 28 Eylül: "aşağı indikçe bitmeyen bir alan fazlalığı")
// ÖLÇÜLDÜ: masaüstü 19.790 px = 22 ekran, telefon 26.657 px = 32,8 ekran,
// 2.362 kelime. "Kapı" 26, "kural motoru" 11, "misafir hakkı" 10 kez.
// Ana sayfa artık bir FRAGMAN: her bölüm tek şey söyler, derinlik
// isteyene yolu gösterir. İçerik SİLİNMEDİ, sayfasına taşındı:
//   · hak hesaplayıcı + 9 program kartı → /kartlar
//   · Türkiye kapsamı                  → /rehber (zaten oradaydı)
//   · kazanç, basamaklar, mağaza, plan, host soruları → /ayricaliklar
//   · SSS                               → /sss (v0.52'den beri)
// Eski çapalar (/#cuzdan, /#plan …) EskiCapa ile yeni yerine gider.
//
// SIRA: kahraman → KURAL MOTORU → nasıl çalışır → senin tarafın →
// güven → beta. Kural motoru 2. sırada: tek gerçek farkımız o.
// ============================================================
export default function Home() {
  return (
    <>
      <SahneCanlandir />
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
            <stop offset="0%" stopColor="#8A7247" stopOpacity="0.10" />
            <stop offset="55%" stopColor="#8A7247" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1A2B4C" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path d="M820 -60 C560 180, 300 430, 40 900 C300 520, 520 260, 860 60 Z" fill="url(#wg)" />
        <path d="M880 120 C660 320, 460 540, 250 980 C470 620, 660 400, 900 240 Z" fill="url(#wg)" opacity="0.7" />
        <path d="M840 -40 C580 200, 320 450, 60 920" fill="none" stroke="#8A7247" strokeOpacity="0.16" strokeWidth="1.5" />
      </svg>
      <div className="grain-fixed" aria-hidden="true" />
      {/* v0.17 — başlık çubuğu ortak bileşende. Beş dosyada beş kopya
          vardı ve dördü eski marka işaretinde kalmıştı. */}
      {/* v0.18 — menü artık SiteHeader'ın kendisinde: her sayfada aynı
          üç bağlantı ve TEK çağrı. Burada çocuk vermiyoruz ki ana sayfa
          ile alt sayfaların menüsü bir daha ayrışamasın. */}
      <SiteHeader seffaf />
      <EskiCapa />

      {/* --- KAHRAMAN ---
          🔴 Ekran görüntüsü YOK, ÜRÜNÜN KENDİSİ var.
          Tek gerçek farkımız kural motoru ve o motor başka kullanıcı
          gerektirmiyor — sitede de aynı avantajı kullanıyoruz.
          Ziyaretçi kaydolmadan, üç saniyede değeri görüyor. */}
      {/* --- KAHRAMAN: TAM SAHNE (v0.54.0) ---
          🔴 Gökberk'in getirdiği "video hero" prompt'u yapıya çevrildi:
          100svh sahne · ortalı tek başlık · tek altın çağrı · kademeli
          giriş. Prompt'tan ALINMAYANLAR ve sebepleri:
            · üçüncü taraf video URL'si → lisanssız ve geçici; sahne
              bizim `/bant.jpg` (app'in bandıyla aynı görsel) ve CSS'te
              28 sn'lik "nefes" — 0 KB, reduced-motion'a saygılı.
            · Tailwind + Inter → sitenin kendi token'ları ve serif/sans
              ayrımı; yeni font isteği yok.
            · "scrollbar gizle" → erişilebilirlik bedeli, yok.
            · kanıtsız kahraman → altta KANIT KARTI: üç kart, üç cevap;
              gösteri ile kanıt aynı karede (v0.4'ten beri ilke).
          RuleDemo, sayılar ve ekran karuseli hemen alttaki #kural
          bölümüne indi — kahraman yönlendirir, o bölüm ikna eder. */}
      <section className="hero-sahne" aria-label="Kahraman">
        <div className="hero-foto" aria-hidden="true" />
        <div className="hero-hale" aria-hidden="true" />
        <div className="hero-isik" aria-hidden="true" />
        <div className="hero-perde" aria-hidden="true" />
        <HeroIz />
        <div className="hero-orta rise">
          <p className="eyebrow hero-dugum">{SITE.heroEyebrow}</p>
          <h1>{SITE.heroLead}<br /><em>{SITE.heroEm}</em></h1>
          <p className="lead">{SITE.heroSub}</p>
          <div className="hero-cta">
            {/* Üç dönüşüm olayı — huninin tamamı. Ayrıntı ve neden
                yalnız üç tane olduğu: components/Olcum.jsx */}
            <OlayLink ad="indir" ozellik={{ yer: "hero" }}
                      href="#beta" className="btn-gold">{SITE.betaCta}</OlayLink>
            <OlayLink ad="kural_sorusu" ozellik={{ yer: "hero" }}
                      href="/rehber" className="btn-ghost">Kartını sor, cevabı gör</OlayLink>
          </div>
        </div>
        {/* KANIT KARTI — satırlar RuleDemo'nun kendi verisinden
            (IST · THY seferi). Uydurma cevap yok: Elite Plus misafir
            alır, Priority Pass'te misafir tarifeden girer, Classic Plus
            yalnız kendini sokar. Karta dokunmak canlı motora götürür. */}
        <a href="#kural-motoru" className="hero-kanit rise-gec" aria-label="Kartını sor — canlı kural motoru">
          <div className="kanit-bas"><span>KARTINI SOR</span><span className="kanit-yer">IST · İstanbul Havalimanı · THY seferi</span></div>
          <div className="kanit-satir"><div>Miles&amp;Smiles · Elite Plus<small>ailen veya bir misafir</small></div><span className="roz roz-ok">Misafir ücretsiz</span></div>
          <div className="kanit-satir"><div>Priority Pass<small>iGA ve Primeclass salonları</small></div><span className="roz roz-uc">Misafir ücretli girer</span></div>
          <div className="kanit-satir"><div>Miles&amp;Smiles · Classic Plus<small>iç hat · misafir hakkı yok</small></div><span className="roz roz-kendin">Yalnız kendin girersin</span></div>
        </a>
        <div className="hero-ipucu" aria-hidden="true">↓ NASIL ÇALIŞIR</div>
      </section>

      {/* --- KURAL MOTORU (kahramandan inen kanıt) --- */}
      <section id="kural-motoru" className="dark-band hero-dark kural-bolum">
        <div className="wrap split">
          <div className="col-text">
            <p className="eyebrow">Kural motoru</p>
            <h2>Kapıda alınıp alınmayacağını{"\n"}sen başvurmadan söyler.</h2>
            <p className="hero-baglanti">{SITE.heroBaglanti}</p>
            <p className="hero-pos">
              LoungeLink bir pazar yeri değil — bir <b>salon hakkı cüzdanı</b>.
              İçinde bir pazar yeri var.
            </p>
            <div className="hero-stats">
              {STATS.map((x) => (
                <div key={x.l}><b>{x.n}</b><span>{x.l}</span></div>
              ))}
            </div>
          </div>
          <div><RuleDemo /></div>
        </div>
        <div className="wrap">
          <EkranKarusel shots={SHELF} />
          <OlayLink ad="kural_sorusu" ozellik={{ yer: "kural_motoru" }} className="beat" href="/kartlar#programlar">{BOLUM.kural.beat} <span>→</span></OlayLink>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- NASIL ÇALIŞIR: 3 ADIM — numara gerçek sıra taşıyor ---
          W4 rota ve W6 sohbet anı burada kalıyor. */}
      <section className="section dark-band alt" id="akis">
        <SectionScene kind="contrail" />
        <div className="wrap">
          <div className="eyebrow">{BOLUM.akis.eyebrow}</div>
          <h2>{BOLUM.akis.h2}</h2>
          <div className="rota-kap canli">
            <RotaAkis />
            <div className="flow">
              {FLOW.map((f) => (
                <div className="flow-step" key={f.n}>
                  <div className="flow-n">{f.n}</div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="an" className="birlesik-alt birlesik-dar">
            <div className="eyebrow">Sohbet</div>
            <h2>Kalan tek iş, birbirinizi bulmak.</h2>
            {/* v0.68 · W6 — balonlar sırayla gelir, sonunda karşı taraf yazıyor */}
            <div className="an-sohbet canli">
              {SAHNE.map((m, i) => (
                <div key={i} className={"an-bal" + (m.kim === "sen" ? " ben" : "")} style={{ "--b": i }}>
                  <p>{m.m}</p>
                  <time>{m.saat}</time>
                </div>
              ))}
              <div className="an-yaziyor" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </div>
          {/* v0.69.3 — akışın (uçuşunu yaz → eşleş → salonda buluş) doğal devamı salonu görmek */}
          <a className="beat" href="#kapsam">Havalimanını seç, salonu gör <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- KAPSAM (v0.69.1 · Gökberk: "güzel bilgi, animasyonu güzel; ana sayfaya
          geri gelsin") — harita + havalimanı listesi; ayrıntı /rehber'de.
          Harita başlığındaki "· TÜRKİYE" kalktı (yurt dışı da katalogda). */}
      <section className="section dark-band" id="kapsam">
        <div className="wrap">
          <div className="eyebrow">{BOLUM.kapsam.eyebrow}</div>
          <h2>{BOLUM.kapsam.h2}</h2>
          <Coverage />
          <a className="beat" href="/rehber">Salon rehberini aç <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- SENİN TARAFIN — iki kitle sırayla değil, SEÇİMLE ---
          Eski çapalar: #kart-sahibi (host) ve #neden (misafir) buraya iner. */}
      <section className="section dark-band" id="kart-sahibi">
        <span id="neden" className="capa" aria-hidden="true" />
        <div className="wrap">
          <div className="eyebrow">{BOLUM.neden.eyebrow}</div>
          <h2>{BOLUM.neden.h2}</h2>
          <TarafSecimi />
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- GÜVEN — altı madde yerine üçü; kalanlar tarafların içinde --- */}
      <section className="section dark-band" id="guven">
        <SectionScene kind="radar" />
        <div className="wrap">
          <div className="eyebrow">{BOLUM.guven.eyebrow}</div>
          <p className="statement">Kartında bir kişilik yer var.<br />+1'in kim olacak? Onu sen seçersin, biz doğrularız.</p>
          <h2>{BOLUM.guven.h2}</h2>
          {/* v0.69.2 — kalkan ve gerçek ekran şeridi YAN YANA (Gökberk: "kayma var").
              Önce ikisi alt alta ayrı bloklardı; şerit sağa kayıp kalkanın
              altında boşlukta duruyordu. Eşit iki sütun, dikeyde ortalı. */}
          <div className="guven-ikili">
            <GuvenKalkan />
            <div className="shots shots-sm guven-ekran">
              {SHOTS_TRUST.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} className="shot" width={p.w} height={p.h} loading="lazy" />
              ))}
            </div>
          </div>
          <div className="prog-grid trust-grid trust-3">
            {[TRUST[0], TRUST[3], TRUST[4]].map((c, i) => (
              <div className="prog-card" key={c.t} style={{ "--i": i }}>
                <span className="idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
          {/* v0.69.3 (Gökberk: "yönlendirme cümleleri alanla uyumlu olsun") */}
          <a className="beat" href="/sss">Güven ve gizlilik soruları <span>→</span></a>
        </div>
      </section>

      <hr className="wing-rule" />

      {/* --- ABONELİK (v0.69.1 · Gökberk) — kartlar ana sayfada, ayrıntı
          (kredinin dört yolu, kazanç, basamaklar) /ayricaliklar'da. */}
      <section className="section dark-band" id="plan">
        <div className="wrap">
          <div className="eyebrow">{BOLUM.plan.eyebrow}</div>
          <h2>{BOLUM.plan.h2}</h2>
          <p className="lead" style={{ maxWidth: "52ch" }}>
            Ayda iki kişi ağırlayan host, o ay Sık Uçan ayrıcalıklarını ücretsiz
            kullanır. Beta boyunca tüm planlar ücretsiz.
          </p>
          <PlanKartlari ozet />
          <a className="beat" href="/ayricaliklar#plan">Planların ve kredinin ayrıntısı <span>→</span></a>
        </div>
      </section>

      {/* 🔴 v0.52 — SSS ANA SAYFADAN AYRILDI (Gökberk: "gereksiz uzatıyor").
          Burada yalnız ilk üç soru + tam listeye bağlantı; içerik /sss'te. */}
      {/* 4 Eylül — SSS bölümü ana sayfadan kalktı: soruların tam listesi /sss'te
          (menüde). Ana sayfa ritmi davetle (beta) kapanır; itiraz karşılama
          kendi sayfasında. `FAQ` burada artık okunmuyor. */}
      {/* --- BETA --- */}
      <section className="section dark-band" id="beta" style={{ textAlign: "center" }}>
        <SectionScene kind="horizon" />
        <div className="wrap" style={{ maxWidth: 620 }}>
          <div className="eyebrow">Kapalı beta</div>
          <h2>{SITE.closing} <em>{SITE.closingEm}</em></h2>
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

          {/* 🔴 v0.29 — CANLI SAYAÇ.
              "İlk 100 host" cümlesini v0.17'den beri yazıyoruz ama
              kaçının dolduğunu hiç söylemedik; söylenmeyen bir kontenjan
              aciliyet üretmez. Sayı `kurucu_cember()`ten geliyor —
              eşik altındaysa RPC ham sayıyı DÖNDÜRMÜYOR ve bu blok
              sayfada hiç görünmüyor. Bkz. components/KurucuSayac.jsx */}
          <KurucuSayac />

          {/* 🔴 v0.18 — MAILTO GİTTİ, FORM GELDİ.
              Eski yorum "mailto BUGÜN çalışıyor" diyordu; ölçtüğümüzde
              çalışmadığı yer tam da en kalabalık yerdi: posta uygulaması
              yapılandırılmamış telefonda tıklama hiçbir şey yapmaz ve
              kullanıcı bunu hata olarak bile görmez. Üstelik hangi
              kanaldan geldiği ölçülemiyor, sonradan yazılacak liste
              birikmiyordu. mailto silinmedi — formun dibinde küçük
              puntoda yedek yol olarak duruyor. */}
          {/* v0.69 — dört ayrı çağrı cümlesi ("Kurucu çembere katıl",
              "Beta listesine katıl", "Listeye yazıl"…) tek cümlede birleşti. */}
          <h3 className="beta-form-t">{SITE.betaCta}</h3>
          <p style={{ marginTop: 8 }}>İlk 100 host beta&apos;yı birlikte kuruyor.</p>
          <WaitlistForm />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "40px 0", background: "var(--card)" }}>
        <div className="wrap" style={{ display: "flex", gap: 30, flexWrap: "wrap", fontSize: 13.5, color: "var(--muted)" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <b className="foot-lockup">
              <img src="/mark-kanat.svg" alt="" width={32} height={15} /> LOUNGELINK
            </b>
            <p style={{ marginTop: 6, fontSize: 12.5 }}>
              {SITE.footerSlogan} Lounge erişimi satmaz; doğrulanmış yolcuları buluşturur.
            </p>
          </div>
          {/* v0.69 — ana sayfadan taşınan içeriğin sayfaları alt bilgide de. */}
          <nav className="foot-nav" aria-label="Sayfalar">
            <a href="/kartlar">Kartlar ve kurallar</a>
            <a href="/rehber">Salon rehberi</a>
            <a href="/ayricaliklar">Ayrıcalıklar ve üyelik</a>
            <a href="/sss">SSS</a>
          </nav>
          <div className="foot-legal">
            {/* 🔴 v0.34 — BEŞ YASAL METİNDEN İKİSİ FOOTER'DA YOKTU.
                `/cerez` sayfası vardı ama SİTEDE HİÇBİR YERDEN bağlantı
                verilmiyordu (tüm href taraması: 0 sonuç); `/aydinlatma`
                yalnız bekleme listesi formundan erişilebiliyordu.
                🆕 SINIF: "YAYINLANMIŞ AMA BAĞLANTI VERİLMEMİŞ BİR SAYFA,
                YAYINLANMAMIŞTIR." */}
            <a href="/gizlilik">Gizlilik</a>
            <a href="/aydinlatma">Aydınlatma Metni</a>
            <a href="/acik-riza">Açık Rıza</a>
            <a href="/cerez">Çerez Politikası</a>
            <a href="/kosullar">Kullanım Koşulları</a>
            <a href="/hesap-sil">Hesap Silme</a>
            <a href="/destek">Destek</a>
            <a href="/en">English</a>
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
