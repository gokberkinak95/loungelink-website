import { CARDS } from "../../../lib/guide";
import { SITE } from "../../../lib/content";
import {
  CARD_CARRIER_RULE, CARD_PAGES, SCOPES, SOURCE_NOTE,
  allCardSlugs, cardQuestion, findCardPage,
} from "../../../lib/card-pages";
import SiteHeader from "../../../components/SiteHeader";

// 🔴 STATİK ÜRETİM: her kart × havalimanı × terminal için ayrı HTML.
// "Elite Plus Antalya dış hat lounge" ile "Elite Plus Antalya iç hat
// lounge" iki ayrı aramadır ve iki ayrı cevabı vardır; tek sayfada
// gömülü içerik bu ayrımı arama motoruna hiç gösteremez.
export async function generateStaticParams() {
  return allCardSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = findCardPage(slug);
  if (!p) return { title: "Kart sayfaları — LoungeLink" };
  const q = cardQuestion(p);
  // 🔴 AÇIKLAMA HER SAYFADA GERÇEKTEN FARKLI OLMALI. /rehber'de
  // ölçtüğümüz hata buydu: 72 sayfa, 13 benzersiz açıklama. Aynı metni
  // taşıyan sayfa yığını Google'ın "doorway page" imzasıdır. Buradaki
  // açıklama sayıyı, terminali ve o terminaldeki ilk salonun adını
  // taşıyor — üçü birlikte her sayfada değişiyor.
  //
  // 🔴 ÖLÇÜLDÜ: kart adı olmadan 144 sayfa yalnız 122 benzersiz
  // açıklama veriyordu. Sebebi Elite ile Elite Plus'ın motorda AYNI
  // satırda olması — aynı havalimanında ikisinin cevabı birebir aynı
  // cümle. Kart adı açıklamaya girince 144/144 oldu. Aynı ölçümü
  // yapmadan "her sayfa farklı" demek, /rehber'de yaptığımız hataydı.
  const first = p.lounges[0];
  // Terminal adı salon adının içinde zaten geçiyorsa iki kez yazmayız.
  const firstTerm = first.terminal && !first.name.includes(first.terminal)
    ? ` (${first.terminal})` : "";
  const desc =
    `${CARDS[p.card].label} · ${p.airport.city} ${SCOPES[p.scope].label} · katalogda ` +
    `${p.lounges.length} salon, ${p.airline.length} tanesi Turkish Airlines işletmeli. ` +
    `${first.name}${firstTerm} dahil. ${p.headline}.`;
  return {
    title: `${q} — LoungeLink`,
    description: desc,
    alternates: { canonical: `/kart/${slug}` },
    openGraph: {
      title: q,
      description: desc,
      url: `/kart/${slug}`,
      siteName: "LoungeLink",
      locale: "tr_TR",
      type: "article",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "LoungeLink — lounge kural motoru" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  };
}

// Rozet dili /rehber ile aynı: aynı motor, aynı sözcükler.
const V = {
  yes: { c: "var(--green)", bg: "rgba(4,107,76,.08)", t: "MİSAFİR GÖTÜREBİLİRSİN" },
  self_only: { c: "var(--muted)", bg: "var(--bgAlt)", t: "YALNIZ KENDİN" },
  paid: { c: "var(--amber)", bg: "rgba(138,90,0,.08)", t: "ÜCRETLİ" },
  no: { c: "var(--ink)", bg: "var(--bgAlt)", t: "BAŞKA SALON GEREKİR" },
};

// Salon listesi bloğu. Salon adı ve terminal katalogdan birebir gelir;
// bu iki alan sayfanın kanıtı — genel cümle değil, kapıdaki tabela.
function LoungeBlock({ title, tone, line, list }) {
  return (
    <div style={{ border: "1px solid var(--line)", background: "var(--card)", borderRadius: 14, padding: 18, marginTop: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: 1.6, fontWeight: 700, color: tone, marginBottom: 8 }}>
        {title} · {list.length}
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--body)" }}>{line}</p>
      <ul style={{ marginTop: 12, paddingLeft: 18 }}>
        {list.map((l) => (
          <li key={l.name + l.terminal} style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink)" }}>
            {l.name}
            {l.terminal && !l.name.includes(l.terminal)
              ? <span style={{ color: "var(--muted)" }}> · {l.terminal}</span>
              : null}
            {l.operator && l.operator.trim().length > 1
              ? <span style={{ color: "var(--muted)" }}> · {l.operator}</span>
              : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CardPage({ params }) {
  const { slug } = await params;
  const p = findCardPage(slug);
  if (!p) return <div className="wrap section">Bu sayfa bulunamadı.</div>;

  const c = CARDS[p.card], sc = SCOPES[p.scope], v = V[p.badge];
  const q = cardQuestion(p);
  // Aynı terminaldeki diğer kartlar + aynı havalimanının diğer terminali:
  // iç bağlantı ağı sayfadan sayfaya buradan kuruluyor.
  const otherCards = CARD_PAGES.filter((x) => x.code === p.code && x.scope === p.scope && x.slug !== slug);
  const otherScope = CARD_PAGES.find((x) => x.code === p.code && x.card === p.card && x.scope !== p.scope);

  return (
    <>
      <SiteHeader />

      {/* Sayfanın tamamı TEK bir soruya cevap veriyor; şema da öyle
          diyor. Soru H1'in kendisi, cevap sayfadaki metinlerden
          birleştiriliyor — elle senkron tutulan ikinci bir kopya yok. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "QAPage",
          mainEntity: {
            "@type": "Question",
            name: q,
            text: q,
            answerCount: 1,
            acceptedAnswer: {
              "@type": "Answer",
              text: [
                p.headline, p.detail, p.scopeNote,
                p.airline.length ? `${p.airlineLine} ${p.airline.map((l) => l.name).join(", ")}.` : null,
                p.independent.length ? `${p.independentLine} ${p.independent.map((l) => l.name).join(", ")}.` : null,
                p.warning,
              ].filter(Boolean).join(" "),
              url: `https://loungelink.co/kart/${slug}`,
            },
          },
        }) }}
      />

      <div className="wrap" style={{ maxWidth: 780, padding: "48px 24px 80px" }}>
        <div className="crumb">
          <a href="/">Ana sayfa</a> › <a href="/kartlar">Kartlar</a> › {p.airport.city}
        </div>

        <div className="eyebrow">{p.airport.name} · {sc.label}</div>
        <h1 style={{ fontSize: "clamp(26px,4.2vw,40px)" }}>{q}</h1>

        {/* SAYI ÖNCE. Ziyaretçinin ilk gördüğü şey kaç salon olduğu ve
            kaçının kartını doğrudan tanıdığı — sıfat değil, sayı. */}
        <p className="lead" style={{ marginTop: 16 }}>
          {p.airport.name} {sc.word} katalogumuzda {p.lounges.length} salon kayıtlı;
          {" "}{p.airline.length} tanesi Turkish Airlines işletmeli,
          {" "}{p.independent.length} tanesi bağımsız işletmeci salonu.
        </p>

        {p.airline.length > 0 && (
          <LoungeBlock
            title="TURKISH AIRLINES SALONLARI"
            tone={v.c}
            line={p.airlineLine}
            list={p.airline}
          />
        )}

        {/* 🔴 BOŞLUĞU SESSİZ GEÇMİYORUZ. Bir terminalde havayolu salonu
            kayıtlı değilse bunu yazmak, yazmamaktan iyidir: kullanıcı
            "bulamadım" diye değil "yok" diye ayrılır. Ve cümle katalog
            hakkında konuşur — dünya hakkında değil. */}
        {p.airline.length === 0 && (
          <p className="note" style={{ marginTop: 14 }}>
            Katalogumuzda {p.airport.name} {sc.word} Turkish Airlines işletmeli salon kaydı yok.
            Buradaki {p.independent.length} salonu bağımsız işletmeciler yürütüyor.
          </p>
        )}

        {p.independent.length > 0 && (
          <LoungeBlock
            title="BAĞIMSIZ İŞLETMECİ SALONLARI"
            tone="var(--muted)"
            line={p.independentLine}
            list={p.independent}
          />
        )}

        {/* Kartın kendi kuralı: misafir hakkı ve ücret. Metin
            lib/guide.js'ten okunur, burada yeniden yazılmaz. */}
        <div style={{ background: v.bg, border: `1px solid ${v.c}33`, borderRadius: 16, padding: 22, marginTop: 26 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 700, color: v.c, marginBottom: 8 }}>
            {v.t}
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 700, lineHeight: 1.3 }}>
            {p.headline}
          </div>
          <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.65 }}>{p.detail}</p>
          {/* Terminal cevabı değiştiriyorsa düzeltme cevabın İÇİNDE
              durur. Sayfanın altına düşen bir not okunmaz; okunmayan
              düzeltme, düzeltme değildir. */}
          {p.scopeNote && (
            <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.65, color: "var(--ink)", fontWeight: 700 }}>
              {p.scopeNote}
            </p>
          )}
        </div>

        {/* İstisna ana kuraldan değerlidir: kapıda geri çevrilen kişi
            kuralı bilmediği için değil, istisnayı bilmediği için
            çevriliyor. */}
        {p.warning && (
          <div style={{ background: "rgba(138,90,0,.07)", border: "1px solid rgba(138,90,0,.28)", borderRadius: 14, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.6, fontWeight: 700, color: "var(--amber)", marginBottom: 6 }}>
              ⚠ SIK ATLANAN AYRINTI
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{p.warning}</p>
          </div>
        )}

        <p className="carrier-rule" style={{ marginTop: 16 }}>
          <b>{CARD_CARRIER_RULE}</b>
        </p>

        {/* ============================================================
            İKİ FARKLI ÇAĞRI — SAYFANIN ASIL İŞİ
            Aynı sayfa iki ayrı insana bakıyor:
              · hakkı OLAN → hak kullanılmazsa uçuşla birlikte yanıyor
              · hakkı OLMAYAN → yanına alacak birini arıyor
            Tek çağrı yazmak, ikisinden birini her seferinde kaybetmek
            demek. Dallanma tek alandan: p.canHost.
            ============================================================ */}
        <div style={{ background: "var(--goldSoft)", border: "1px solid var(--warmLine)", borderRadius: 14, padding: 20, marginTop: 30 }}>
          <b style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>
            {p.canHost
              ? "Kullanmazsan yanıyor — hakkını değerlendir"
              : "Ama girebilen biri seni misafir edebilir"}
          </b>
          <p style={{ fontSize: 14.5, marginTop: 8 }}>
            {p.canHost
              ? `Misafir hakkın uçuşla birlikte biter; bir sonraki uçuşa devretmez. ` +
                `LoungeLink ${p.airport.city}'da aynı saatlerde, aynı taşıyıcıda uçan doğrulanmış ` +
                `yolcuları gösterir. Boş duran hakkı bir yolculuğa çeviriyorsun.`
              : `${p.airport.city} ${sc.word} bu salonlara girme hakkı olan yolcular var ve çoğu ` +
                `hakkını kullanmadan uçuyor. Uçuşunu gir, aynı taşıyıcıda uçan uygun host'ları gör.`}
          </p>
          <a href="/#beta" className="btn" style={{ marginTop: 16 }}>{SITE.betaCta}</a>
        </div>

        {/* Hak sorusunun tam cevabı /rehber'de. İki rota birbirini
            besler; aynı soruyu iki kez cevaplamaz. */}
        <p className="note" style={{ marginTop: 22 }}>
          Misafir ve aile hakkının ayrıntısı için:{" "}
          <a href={`/rehber/${p.card}-${p.code.toLowerCase()}`}>
            {c.short} ile {p.airport.city} misafir kuralı
          </a>
        </p>

        {otherScope && (
          <p className="note" style={{ marginTop: 10 }}>
            Aynı kart, diğer terminal:{" "}
            <a href={`/kart/${otherScope.slug}`}>
              {c.short} ile {p.airport.city} {SCOPES[otherScope.scope].word}
            </a>
          </p>
        )}

        {otherCards.length > 0 && (
          <div style={{ marginTop: 34 }}>
            <div className="eyebrow">{p.airport.city} {sc.short} için diğer kartlar</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
              {otherCards.map((o) => (
                <a key={o.slug} href={`/kart/${o.slug}`}
                   className="card-chip">
                  {CARDS[o.card].short}
                </a>
              ))}
            </div>
          </div>
        )}

        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 40, lineHeight: 1.6 }}>
          {SOURCE_NOTE}
        </p>
      </div>
    </>
  );
}
