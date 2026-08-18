// ============================================================
// LoungeLink · Kart sayfaları (kart × havalimanı × terminal)
//
// 🔴 NEDEN AYRI BİR ROTA — /rehber ZATEN VARKEN
// /rehber bir HAK sorusuna cevap veriyor: "misafir götürebilir misin?"
// İnsanların arattığı ikinci soru bambaşka: "bu kartla HANGİ SALONA
// girerim?" İkisi aynı sayfada yanıtlanınca ikisi de yarım kalıyor.
// /kart sayfaları salon sorusunu cevaplar; hak sorusu için /rehber'e
// bağlanır. İki rota birbirini beslemeli, birbirinin kopyası olmamalı.
//
// 🔴 TERMİNAL AYRIMI SAYFANIN ASIL SEBEBİ.
// Aynı kart, aynı havalimanında iç hatta ve dış hatta FARKLI sonuç
// verir: Classic Plus iç hatta ücretsiz girer, dış hatta tanımlı bir
// hakkı yoktur (lib/guide.js · CARD_RULES.classic-plus). Salon listesi
// de değişir — IST iç hatta 3, dış hatta 2 salon kayıtlı. Tek sayfada
// "IST" demek, bu iki gerçeği tek cevaba sıkıştırmak demek.
//
// ⚠️ VERİ KAYNAĞI — BU DOSYA VERİ ÜRETMEZ, YALNIZ BİRLEŞTİRİR:
//   · kart kuralı, misafir hakkı, ücret  → lib/guide.js (ENTRIES)
//   · salon adı, terminal, kapsam, işletmeci → lib/lounges-data.js
// Tek yönlü akış: kural motoru → site. Buraya elle kural yazılmaz.
// Bir (kart × havalimanı) çiftinin guide.js'te kaydı yoksa o sayfa
// ÜRETİLMEZ; boşluk uydurmayla doldurulmaz.
// ============================================================
import { AIRPORTS, CARDS, CARRIER_RULE, findEntry } from "./guide";
import { TR_AIRPORTS, inScope } from "./lounges-data";

// Kapsam kolonu (lounges-data · scope) iki değer taşır. Sayfa dilinde
// karşılıkları burada TEK yerde kurulur: slug, H1, başlık ve açıklama
// aynı sözcüğü kullanmalı.
export const SCOPES = {
  domestic: { slug: "ic-hat", word: "iç hatlarda", label: "İç hat", short: "iç hat" },
  international: { slug: "dis-hat", word: "dış hatlarda", label: "Dış hat", short: "dış hat" },
};

// 🔴 İŞLETMECİ SINIFLANDIRMASI VERİDEN OKUNUR, ELLE YAZILMAZ.
// Katalogda işletmeci kolonu THY salonlarını "THY" ya da "Turkish
// Airlines" olarak taşıyor. Bir salonun havayolunun kendi salonu mu
// yoksa bağımsız bir işletmecinin salonu mu olduğu, kartın orada ne
// ifade ettiğini belirleyen tek ayrım — ve bu ayrım veride zaten var.
const isAirlineLounge = (l) => /^(THY|Turkish Airlines)$/i.test((l.operator || "").trim());

// Kart aileleri. Yalnız guide.js'teki 6 kart tanımlıdır; buraya yeni
// kart eklemek veri eklemek demektir ve yasaktır.
const FAMILY = {
  "elite-plus": "ms",
  "elite": "ms",
  "classic-plus": "ms",
  "classic": "ms",
  "star-alliance-gold": "star",
  "priority-pass": "pp",
};

// ============================================================
// Havayolu salonları için kart cümlesi.
// Kaynak: guide.js ENTRIES[card].verdict — sayfa kendi cümlesini
// uydurmaz, motorun verdiği kararı terminal diline çevirir.
// ============================================================
function airlineLine(card, verdict, scope) {
  const fam = FAMILY[card];
  if (fam === "pp") {
    // guide.js · ENTRIES[priority-pass/IST].warning:
    // "Priority Pass Turkish Airlines Lounge'da GEÇMEZ."
    return "Priority Pass bu salonlarda geçmez — Turkish Airlines salonları programın dışındadır.";
  }
  if (verdict === "yes") {
    return "Kartın bu salonlarda tanınır; yanına alacağın kişi için de hakkın var.";
  }
  if (verdict === "self_only") {
    return scope === "domestic"
      ? "Kendi girişin ücretsiz; yanına birini alma hakkın yok."
      : "Motorda bu kartın ücretsiz girişi iç hat salonlarıyla sınırlı — dış hatta tanımlı bir hakkın yok.";
  }
  // paid
  return "Ücretsiz giriş hakkın yok; ücret ödeyerek ya da hakkı olan birinin misafiri olarak girersin.";
}

// ============================================================
// Bağımsız işletmeci salonları için kart cümlesi.
// 🔴 BURADA NE BİLDİĞİMİZİ AŞMIYORUZ. Katalogda bu salonların hangi
// üyelik programını kabul ettiği kayıtlı DEĞİL. "Priority Pass burada
// geçer" demek uydurma olurdu; söylenebilecek doğru şey, girişin kart
// tipiyle değil salon bazlı kuralla belirlendiğidir.
// ============================================================
function independentLine(card) {
  if (FAMILY[card] === "pp") {
    return "Bağımsız işletmeci salonları. Priority Pass kabulü salon bazlıdır; katalogda salon salon kayıtlı ve uygulamada tek tek gösteriliyor.";
  }
  return "Bağımsız işletmeci salonları. Giriş kart statünle değil, salonun kendi kuralıyla belirlenir — ücretli giriş ya da ayrı bir üyelik gerekir.";
}

// ============================================================
// 🔴 TERMİNAL, CEVABI DEĞİŞTİRDİĞİNDE CEVAP DA DEĞİŞMELİ.
// Ölçüldü: Classic Plus'ın dış hat sayfaları "İç hatta kendin ücretsiz
// girersin" başlığıyla ve "YALNIZ KENDİN" rozetiyle çıkıyordu. Yani
// Antalya dış hatta uçan bir Classic Plus üyesi, kendisine ait olmayan
// bir hakkı okuyup kapıya gidiyordu. Kural motoru bu konuda net:
// ücretsiz giriş İÇ HAT salonlarıyla sınırlı (guide.js · CARD_RULES
// .classic-plus + ENTRIES classic-plus/IST).
//
// Düzeltme yeni cümle yazmıyor: motorun elle yazılmış IST kaydındaki
// başlığı kullanıyor — o cümle havalimanından bağımsız ve zaten doğru.
// Rozet de "self_only"den "no"ya düşüyor; dış hatta "yalnız kendin"
// diye bir hak yok.
const CP_IST = findEntry("classic-plus-ist");
function scopeOverride(card, scope, base) {
  if (card !== "classic-plus" || scope !== "international") return base;
  return {
    ...base,
    headline: CP_IST.headline,
    badge: "no",
    scopeNote:
      "Motorda Classic Plus'ın ücretsiz girişi iç hat salonlarıyla sınırlı. " +
      "Bu terminalde tanımlı bir giriş hakkın yok — Elite ve üstü kart gerekir.",
  };
}

// ============================================================
// Sayfa evreni.
// Kural: bir (kart × havalimanı) çiftinin guide.js'te kaydı YOKSA ya da
// o terminalde katalogda salon YOKSA sayfa üretilmez. 15 havalimanının
// 6'sında dış hat salonu kayıtlı değil; oralar için dış hat sayfası
// açmıyoruz — boş bir sayfa, olmayan bir sayfadan kötüdür.
// ============================================================
const PAGES = [];
for (const a of TR_AIRPORTS) {
  if (!AIRPORTS[a.code]) continue;              // guide.js kapsamı dışındaysa atla
  for (const [scope, sc] of Object.entries(SCOPES)) {
    // 🔴 v0.21 — KAPSAM ÜÇ DEĞERLİ: "domestic" · "international" · "both".
    // Burada `l.scope === scope` yazılıydı; üreteç de "both"u dış hata
    // çeviriyordu. İki hata üst üste gelince "both" salonları iç hat
    // sayfalarından tamamen düşüyordu (Türkiye'de 9 salon, örn. IST
    // Primeclass). inScope, "both" kaydını iki terminalde de sayar.
    const lounges = a.lounges.filter((l) => inScope(l, scope));
    if (!lounges.length) continue;              // veri yok → sayfa yok
    const airline = lounges.filter(isAirlineLounge);
    const independent = lounges.filter((l) => !isAirlineLounge(l));
    for (const card of Object.keys(CARDS)) {
      const entry = findEntry(`${card}-${a.code.toLowerCase()}`);
      if (!entry) continue;                     // kural kaydı yok → sayfa yok
      PAGES.push(scopeOverride(card, scope, {
        card, code: a.code, scope,
        slug: `${card}-${a.code.toLowerCase()}-${sc.slug}`,
        airport: a,                             // katalog kaydı (ad, şehir, salonlar)
        lounges, airline, independent,
        verdict: entry.verdict,
        badge: entry.verdict,                   // rozet terminale göre düşebilir
        headline: entry.headline,
        detail: entry.detail,
        warning: entry.warning || null,
        scopeNote: null,                        // terminal cevabı değiştiriyorsa dolar
        airlineLine: airlineLine(card, entry.verdict, scope),
        independentLine: independentLine(card),
        // Misafir hakkı yalnız motorun "yes" dediği yerde vardır.
        // Sayfanın alt çağrısı bu tek alandan dallanır.
        canHost: entry.verdict === "yes",
      }));
    }
  }
}

export const CARD_PAGES = PAGES;
export const allCardSlugs = () => PAGES.map((p) => p.slug);
export const findCardPage = (slug) => PAGES.find((p) => p.slug === slug);

// Soru cümlesi TEK yerde kurulur: H1, <title>, description ve JSON-LD
// aynı soruyu sormalı. Üç yerde üç farklı cümle olursa arama sonucunda
// gördüğü başlığı sayfada bulamayan bir ziyaretçi geri döner.
export const cardQuestion = (p) =>
  `${CARDS[p.card].label} ile ${p.airport.name} ${SCOPES[p.scope].word} hangi lounge'a girersin?`;

// Havalimanı adı katalogdan gelir (guide.js'teki kısa adla aynı olmak
// zorunda değil); şehir de öyle. Sayfa hep katalogu gösterir.
export const CARD_CARRIER_RULE = CARRIER_RULE;

// 🔴 HER SAYFADA DURAN BEYAN. Kural motoru resmî tabloları okur ama
// kapıdaki karar salonundur ve tarifeler değişir. Bu cümle olmadan
// sayfa, veremeyeceği bir garantiyi vermiş olur.
export const SOURCE_NOTE =
  "Kendi hakkını kartını veren kurumdan teyit et. Buradaki bilgiler havayolu ve " +
  "salon işletmecilerinin resmî sayfalarından derlenmiştir, değişebilir; kapıdaki " +
  "son karar her zaman salona aittir.";

// Dizin sayfası için: havalimanı → terminal → sayfalar.
export const groupedPages = () => {
  const out = [];
  for (const a of TR_AIRPORTS) {
    const scopes = [];
    for (const scope of Object.keys(SCOPES)) {
      const list = PAGES.filter((p) => p.code === a.code && p.scope === scope);
      if (list.length) scopes.push({ scope, list });
    }
    if (scopes.length) out.push({ airport: a, scopes });
  }
  return out;
};
