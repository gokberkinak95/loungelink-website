// ============================================================
// LoungeLink · Salon Rehberi verisi (site sürümü)
//
// 🔴 NEDEN SİTEDE AYRI BİR KOPYA
// Site tanıtım amaçlı; canlı veritabanına bağlanmıyor ve
// bağlanmamalı (anahtar sızdırmak, ücret ödemek, çökme riski).
// Buradaki veri app'in kural motorundan ÜRETİLİR ve statik yayınlanır.
//
// 🔴 BU SAYFALAR SİTENİN ASIL DEĞERİ.
// "IST Elite Plus misafir" araması ayda yüzlerce kez yapılıyor ve
// doğru cevabı veren Türkçe sayfa YOK. Rakibin sitesinde tek bir
// aranabilir sayfa bile yok — hepsi tek sayfada gömülü.
// Her kart × havalimanı kombinasyonu bir URL demek.
//
// ⚠️ Değerler 146/147 numaralı SQL dosyalarındaki resmî matristen
// alınmıştır. Kural değişirse ORASI güncellenir, sonra buraya taşınır.
// Tek yönlü akış: kural motoru → site. Asla tersi.
// ============================================================

// 🔴 REHBER YALNIZ İKİ HAVALİMANI KAPSIYORDU. Elimizde gerçek salon
// verisi olan havalimanları var; rehber ikisiyle sınırlı kalınca hem SEO
// fırsatı hem kullanıcı güveni kayboluyor ("benim havalimanım yok = bu
// ürün bana göre değil"). Kapsam gerçek katalogla hizalandı.
//
// 🔴 v0.17 — UYDURULMUŞ HAVALİMANI. Burada KYA (Konya) ve VAN (Van Ferit
// Melen) yazılıydı; ikisi de SQL kataloğunda YOK:
//   grep -rnE "'(KYA|VAN)'" sql/*.sql  →  0 satır
// Yani 12 rehber sayfası, veritabanında karşılığı olmayan bir salona
// "MİSAFİR GÖTÜREBİLİRSİN" diyordu. Bu hata derlemede patlamaz, denetim
// de görmezdi — çünkü kimse listeyi KAYNAĞA karşı ölçmüyordu.
// Artık ölçüyor: lib/sql-airports.txt + check.js §4.
//
// Kaynak: sql/001 + sql/002 + sql/107 (country = 'TR'), 15 havalimanı.
// İsimler de katalogtan: ADA "Çukurova Havalimanı" yazıyordu — o isim
// COV'a (Mersin) ait. ADA Adana Şakirpaşa'dır. İki havalimanına aynı
// ismi vermek, ikisini de yanlış yere yollar.
export const AIRPORTS = {
  IST: { name: "İstanbul Havalimanı", city: "İstanbul" },
  SAW: { name: "Sabiha Gökçen Havalimanı", city: "İstanbul" },
  ESB: { name: "Esenboğa Havalimanı", city: "Ankara" },
  ADB: { name: "Adnan Menderes Havalimanı", city: "İzmir" },
  AYT: { name: "Antalya Havalimanı", city: "Antalya" },
  ADA: { name: "Adana Şakirpaşa Havalimanı", city: "Adana" },
  COV: { name: "Çukurova Uluslararası Havalimanı", city: "Mersin" },
  GZT: { name: "Gaziantep Havalimanı", city: "Gaziantep" },
  TZX: { name: "Trabzon Havalimanı", city: "Trabzon" },
  BJV: { name: "Milas-Bodrum Havalimanı", city: "Bodrum" },
  DLM: { name: "Dalaman Havalimanı", city: "Muğla" },
  DIY: { name: "Diyarbakır Havalimanı", city: "Diyarbakır" },
  ASR: { name: "Kayseri Erkilet Havalimanı", city: "Kayseri" },
  HTY: { name: "Hatay Havalimanı", city: "Hatay" },
  RZV: { name: "Rize-Artvin Havalimanı", city: "Rize" },
};

export const CARDS = {
  "elite-plus": {
    label: "Miles&Smiles Elite Plus",
    short: "Elite Plus",
    program: "Turkish Airlines Miles&Smiles",
  },
  elite: { label: "Miles&Smiles Elite", short: "Elite", program: "Turkish Airlines Miles&Smiles" },
  "classic-plus": { label: "Miles&Smiles Classic Plus", short: "Classic Plus", program: "Turkish Airlines Miles&Smiles" },
  classic: { label: "Miles&Smiles Classic", short: "Classic", program: "Turkish Airlines Miles&Smiles" },
  "star-alliance-gold": { label: "Star Alliance Gold", short: "Star Gold", program: "Star Alliance" },
  "priority-pass": { label: "Priority Pass", short: "Priority Pass", program: "Priority Pass" },
  dragonpass: { label: "DragonPass", short: "DragonPass", program: "DragonPass" },
};

// 🔴 v0.17 — SES BİRLİĞİ: "sen".
// Ana sayfa ve uygulama "sen" diyordu, rehber baştan sona "siz".
// Aynı markanın iki ağzı olmaz; okuyucu bunu "iki farklı ürün" diye
// hisseder. Rehber "sen"e çevrildi, check.js §6 bekçisi geri dönmeyi
// engelliyor.
//
// 🔴 v0.17 — ÜRÜNÜN EN TEMEL KURALI ARTIK HER SAYFADA:
// sql/177 md.41-47: "THY seferinde seyahat eden yolcu, sadece THY
// seferinde seyahat eden yolcuyu misafir olarak davet edebilir."
// Motorda guest_must_match_carrier = true olarak bekçili; sitede
// karşılığı SIFIRDI. Misafir hakkının olması yetmiyor — misafirin de
// aynı havayolu firmasında olması gerekiyor. Bu cümle olmadan rehber eksik.
export const CARRIER_RULE =
  "Misafirin de aynı havayolu firmasıyla uçuyor olmalı — kural motoru bunu " +
  "eşleşmeden önce kontrol ediyor.";

// verdict: yes | self_only | paid | no
export const ENTRIES = [
  {
    card: "elite-plus", airport: "IST",
    verdict: "yes",
    headline: "Aileni veya bir misafirini götürebilirsin",
    detail:
      "THY seferinde seyahat ediyorsan Turkish Airlines Lounge'a ailenle " +
      "(eş ve 25 yaşından gün almamış çocuklar) veya bir misafirle girebilirsin. " +
      CARRIER_RULE,
    warning:
      "Star Alliance üyesi BAŞKA bir havayoluyla uçuyorsan aile hakkın yoktur — " +
      "yalnız bir misafir. Bu ayrım çok sık atlanıyor.",
    extra:
      "İstanbul dış hatlarda salon iki bölümdür. Business bölümünde kimsenin misafir " +
      "hakkı yoktur; misafirinle girmek istiyorsan Miles&Smiles bölümüne gitmelisin.",
  },
  {
    card: "elite", airport: "IST",
    verdict: "yes",
    headline: "Elite, Elite Plus ile aynı haktadır",
    detail:
      "Resmî tabloda Elite ve Elite Plus aynı satırdadır: THY seferinde aile veya bir misafir. " +
      "Aradaki fark misafir hakkında değil, diğer ayrıcalıklardadır. " +
      CARRIER_RULE,
    warning:
      "Star Alliance üyesi başka bir havayolunda aile hakkı düşer, yalnız bir misafir kalır.",
  },
  {
    card: "classic-plus", airport: "IST",
    verdict: "self_only",
    // 🔴 v0.17 §4 — OLUMSUZU GÜCE ÇEVİR. Eski başlık "hakkınız tanımlı
    // değil" ile açılıyordu: ziyaretçinin ilk okuduğu şey kaybı oluyordu.
    // Bilgi aynı, sıra değişti — önce ne VERDİĞİ, sonra sınırı.
    headline: "İç hatta ücretsiz girersin — dış hat için Elite ve üstü kart gerekir",
    detail:
      "Classic Plus İÇ HAT salonlarına ücretsiz girer; misafir ve aile hakkı YOKTUR. " +
      "Yanındaki 3-12 yaş aile çocuğu için ücretin %50'si alınır. " +
      "DIŞ HAT salonlarında ise Classic Plus resmî kart listelerinde (Tablo-2 ve " +
      "İstanbul dış hat Miles&Smiles bölümü) yer almaz — tanımlı bir giriş hakkı yoktur.",
    warning:
      "AJet seferinde Classic Plus ÜCRET ÖDER — THY seferinden farklıdır. " +
      "Ayrıca AJet'in salon listesinde İstanbul yoktur.",
  },
  {
    card: "classic", airport: "IST",
    verdict: "paid",
    headline: "Ücretle girersin — tutarı da yazıyoruz",
    detail:
      "Classic kartın ücretsiz giriş hakkı yoktur. İstanbul Havalimanı iç hat " +
      "salonunda ücretli giriş mümkündür. 0-2 yaş bebekten ücret alınmaz.",
    warning:
      "IST 3.000 TL · AYT/ADB/BJV/DLM/ESB 2.800 TL · COV/ASR/GZT/HTY/TZX/RZV/DIY " +
      "2.000 TL (1 Haz–31 Ara 2026).",
  },
  {
    card: "star-alliance-gold", airport: "IST",
    verdict: "yes",
    headline: "Bir misafir götürebilirsin",
    detail:
      "Star Alliance Gold statüsü bir misafir hakkı verir. Aile hakkı yoktur. " +
      CARRIER_RULE,
    warning:
      "3 Mayıs 2021'den beri misafirin SENİNLE AYNI UÇAKTA olması zorunludur. " +
      "Eskiden aynı gün aynı salon yeterliydi; bu kural değişti.",
  },
  {
    card: "priority-pass", airport: "IST",
    verdict: "paid",
    headline: "Kendin girersin, misafirin ücretini sen ödersin",
    detail:
      "Priority Pass İstanbul'da iGA Lounge gibi salonlarda geçerlidir. " +
      // 🔴 v0.17 — SİTE KENDİ KENDİSİYLE ÇELİŞİYORDU: burada "çoğu
      // seviyede ücretlidir", üretilen sayfalarda "hiçbir planda
      // ücretsiz dahil değildir" yazıyordu. Motor (sql/177 md.33)
      // kesin: hiçbir planda ücretsiz misafir yok. İki cümle tek
      // cümleye indi; kaynak motorun kendisi.
      "Hiçbir üyelik planında misafir ücretsiz dahil değil; ücret senin kartından " +
      "çekilir — tutarı önceden gösteriyoruz.",
    warning:
      "Priority Pass Turkish Airlines Lounge'da GEÇMEZ. İki farklı salon, iki farklı kural.",
  },
  {
    card: "priority-pass", airport: "SAW",
    verdict: "paid",
    headline: "Sabiha Gökçen'de birkaç salonda geçerlidir",
    detail:
      "Plaza Premium ve Kepler Club gibi salonlarda kabul edilir. " +
      "İç hat ve dış hat listeleri FARKLIDIR — gideceğin terminale göre kontrol et.",
  },
];

export 
// ============================================================
// 🔴 PROGRAMATİK SEO — 7 SAYFADAN 72 SAYFAYA
// ------------------------------------------------------------
// Rehber elle yazılmış 7 kombinasyonla sınırlıydı. Oysa insanlar
// tam olarak şunu arıyor: "elite plus ankara lounge misafir",
// "classic plus antalya cip". Her (kart × havalimanı) çifti ayrı bir
// aramadır ve her biri ayrı bir sayfayı hak eder.
//
// Elle 72 sayfa yazmak sürdürülemez ve bayatlar. Bunun yerine
// eksikler KURAL MANTIĞINDAN türetiliyor: elle yazılmış özel
// sayfalar (IST bölüm ayrımı gibi) olduğu gibi korunur, kalanlar
// üretilir. Kural değişirse tek yerden değişir.
//
// NOT: üretilen metinler resmî tabloların ÖZETİdir; salon bazlı
// istisnalar (IST dış hat M&S bölümü) elle yazılmış sayfalarda
// anlatılır. Bu yüzden üretilen sayfa "kesin cevap" değil "kartın
// ne verdiği" dilini kullanır ve uygulamaya yönlendirir.
// ============================================================
const CARD_RULES = {
  "elite-plus": {
    label: "Miles&Smiles Elite Plus",
    verdict: "yes",
    title: "Aileni veya bir misafirini götürebilirsin",
    body: "THY veya AJet seferinde seyahat ediyorsan salona ailenle (eş ve 25 yaşından gün almamış çocuklar) ya da bir misafirle girebilirsin. " + CARRIER_RULE,
    warn: "Star Alliance üyesi BAŞKA bir havayoluyla uçuyorsan aile hakkı yoktur — yalnız bir misafir.",
  },
  "elite": {
    label: "Miles&Smiles Elite",
    verdict: "yes",
    title: "Aileni veya bir misafirini götürebilirsin",
    body: "Elite statüsü THY ve AJet seferlerinde salona aile ya da bir misafirle girme hakkı verir. " + CARRIER_RULE,
    warn: "Başka bir Star Alliance havayoluyla uçuyorsan yalnız bir misafir alabilirsin.",
  },
  "classic-plus": {
    label: "Miles&Smiles Classic Plus",
    verdict: "self_only",
    title: "İç hatta kendin ücretsiz girersin",
    body: "Classic Plus iç hat salonlarında kendi girişini ücretsiz sağlar. Yanına birini almak istersen Elite ve üstü statüler misafir hakkı verir.",
    // 🔴 v0.17 — ÜRETİLEN SAYFALARDA UYARI DÜŞMÜŞTÜ (warn: null).
    // Elle yazılmış IST sayfasında uyarı vardı, üretilen 11 sayfada yoktu.
    // Yani AYT/ADB/BJV/DLM/ESB'de AJet ile uçan bir Classic Plus üyesi
    // "ücretsiz girersin" okuyup kapıda 2.800 TL ile karşılaşıyordu.
    // Motor kaynağı: sql/146 md.124-125.
    warn: "AJet seferinde Classic Plus ÜCRET ÖDER (2.800 / 2.000 TL) — THY seferinde ücretsizdir. Taşıyıcı sonucu değiştirir.",
  },
  "classic": {
    // 🔴 v0.17 — ROZET GÖVDEYLE ÇELİŞİYORDU: verdict "self_only" olduğu
    // için rozet "YALNIZ KENDİN" diyor, gövde "ücret ödeyerek girersin"
    // diyordu. Motor (sql/146 md.69-70) net: CLASSIC → 0 misafir,
    // family false, paid_entry TRUE. Doğru verdict "paid" ve elle
    // yazılmış IST sayfası zaten öyleydi — aynı kart iki farklı rozet
    // taşıyordu.
    label: "Miles&Smiles Classic",
    verdict: "paid",
    title: "Ücretle girersin, tutarı da yazıyoruz",
    body: "Classic statüsü tek başına ücretsiz salon girişi sağlamaz; ücret ödeyerek ya da hakkı olan birinin misafiri olarak girebilirsin.",
    warn: "IST 3.000 TL · AYT/ADB/BJV/DLM/ESB 2.800 TL · COV/ASR/GZT/HTY/TZX/RZV/DIY 2.000 TL (1 Haz–31 Ara 2026).",
  },
  "star-alliance-gold": {
    label: "Star Alliance Gold",
    verdict: "yes",
    title: "Bir misafirini götürebilirsin",
    body: "Star Alliance Gold statüsü, ittifak üyesi bir havayoluyla uçarken salona bir misafirle girme hakkı verir. " + CARRIER_RULE,
    warn: "3 Mayıs 2021'den beri misafirin seninle AYNI UÇAKTA olmalı — aynı gün aynı salon artık yetmiyor.",
  },
  // 🔴 20 AĞUSTOS — "ÜCRET SENİN KARTINDAN ÇEKİLİR" ÇIKARILDI.
  // Bu cümle kesin bir ödeme mekanizması iddia ediyordu; oysa ücreti
  // kimin ödediği (host mu, misafir mi, banka mı) karta ve anlaşmaya
  // göre değişir. Aynı fazla-iddiayı app tarafında da yumuşatmıştık;
  // site geride kalmıştı. İkinci ve daha önemli ekleme: bu bir
  // İNDİRİMDİR — üye misafir ücreti, kapıdan girişten belirgin ölçüde
  // düşük. Bunu söylemeden "ücretli" demek, hakkı olduğundan zayıf
  // gösteriyordu.
  "priority-pass": {
    label: "Priority Pass",
    verdict: "paid",
    title: "Misafirin ÜYE ücretiyle girer — kapı fiyatıyla değil",
    body: "Priority Pass anlaşmalı salonlarda geçerli. Misafir hiçbir planda ücretsiz değil ama kapıdan giren birinin ödediğini ödemez: üyelik üzerinden tanımlı, çoğu salonda belirgin biçimde daha düşük bir misafir ücreti var. Tutarı ve kimin ödeyeceğini eşleşmeden önce ilan kartında yazıyoruz — kapıda sürpriz olmasın.",
    warn: null,
  },
  // 🔴 20 AĞUSTOS — DRAGONPASS REHBERDE HİÇ YOKTU.
  // Motorda kuralı var (099 md.204/210, aynı-uçuş şartı dahil),
  // cüzdan hesaplayıcısında var, ama rehberde kart olarak yoktu:
  // DragonPass'li bir kullanıcı kendi kartını arayıp bulamıyordu.
  dragonpass: {
    label: "DragonPass",
    verdict: "paid",
    title: "Misafirin üye ücretiyle girer — ama aynı uçuşta olmalı",
    body: "DragonPass anlaşmalı salonlarda geçerli. Misafir ücreti üyelik üzerinden tanımlı ve kapı fiyatının altında; paketindeki ücretsiz ziyaretler bittiğinde de bu tarife geçerli. 🔴 Priority Pass'ten ayrılan yer: DragonPass misafirin SENİNLE AYNI UÇUŞTA olmasını şart koşuyor — kural motoru bunu eşleşmeden önce kontrol ediyor.",
    warn: "Misafirin seninle aynı uçuşta olmalı — DragonPass'in Priority Pass'ten en kritik farkı bu.",
  },
};

// ============================================================
// 🔴 v0.17 — İNCE İÇERİK (thin content) ÖLÇÜLDÜ VE KAPATILDI
// ------------------------------------------------------------
// Ölçüm: 72 sayfa · 72 benzersiz title · 13 benzersiz description ·
// 6 benzersiz H1. Bu tam olarak Google'ın "doorway page" imzası:
// çok sayfa, tek içerik. Sayfa sayısı bir değer değildir; sayfanın
// KENDİNE ÖZGÜ bir cevabı varsa değerdir.
//
// İki seçenek vardı:
//   (a) üretilen 65 sayfaya robots noindex verip yalnız elle yazılmış
//       7 sayfayı indekslemek,
//   (b) her sayfaya HAVALİMANINA ÖZGÜ GERÇEK bilgi koymak.
// (b) seçildi. Sebebi: gerçek veri ELİMİZDE — salon adı ve terminal
// bilgisi SQL kataloğunda zaten var (002 + 107). noindex, elimizdeki
// veriyi kullanmamayı kalıcılaştırırdı; asıl sorun "sayfa fazla"
// değil "sayfa boş"tu. Boşluğu doldurmak, sayfayı saklamaktan iyidir.
// Ayrıca H1 ve description artık havalimanı adı + şehir + uyarı
// taşıyor (bkz. app/rehber/[slug]/page.jsx).
//
// Kaynak: sql/002_seed_reference.sql (lounges) + sql/107_missing_airports.sql
// (lounge_venues). Kural motoru → site; asla tersi.
// ============================================================
// ============================================================
// 🔴 v0.21 — IST LİSTESİ UYDURULMUŞ KAPI HARFLERİ TAŞIYORDU.
// Eski satır şuydu:
//   "Turkish Airlines Lounge Business (Ana Terminal · Gate D)",
//   "Turkish Airlines Lounge Miles&Smiles (Ana Terminal · Gate F)",
//   "iGA Lounge (Ana Terminal · Gate E)",
//   "Primeclass Lounge (Ana Terminal · Gate A)"
// SQL kataloğunda (lounge_venues · airport_code='IST' · active) IST
// kayıtlarının terminal alanı yalnız "İç Hat" / "Dış Hat" der; tek
// istisna Primeclass'ın "Main T - Gate A" değeridir. Yani D, F ve E
// harflerinin katalogda KAYNAĞI YOK — üç kapı harfi uydurulmuştu.
// Kapı harfi, havalimanında yanlış yöne yürüten en pahalı ayrıntıdır.
// Liste artık kataloğun kendi sözlüğüyle yazılıyor: İç Hat / Dış Hat.
//
// 🔴 PRIMECLASS BİLEREK LİSTEDE DEĞİL. Katalogdaki IST Primeclass
// kaydı "inceleme altında": hiçbir kart ağı (Priority Pass, LoungeKey,
// DragonPass) IST'te Primeclass listelemiyor; kayıt büyük olasılıkla
// Atatürk Havalimanı'ndan devreden bir artık. Kayıt SİLİNMEDİ —
// data/salonlar.csv'de duruyor ve lib/lounges-data.js onu sayıyor —
// ama vitrinde öne çıkarılmıyor. Doğrulanmamış bir salonu öne çıkarmak,
// yolcuyu var olmayan bir kapıya yollamak demek.
//
// 🔴 KATALOGDA OLUP BURADA OLMAYAN 3 KAYIT (bilerek):
// iGA Sleepod (kind=sleep), iGA Shower (kind=shower), XpresSpa
// (kind=spa) — üçü de dış hat, üçü de gerçek. Bunlar "salon" değil;
// bu liste kart sayfalarında "katalogumuzda N salon var" cümlesini
// kuruyor ve bir duşu salon diye saymak sayıyı şişirir.
// ============================================================
export const LOUNGES = {
  IST: [
    "Turkish Airlines Lounge — İç Hat",
    "Turkish Airlines Lounge — İç Hat (Business)",
    "Turkish Airlines Lounge — Dış Hat (Business)",
    "Turkish Airlines Lounge — Dış Hat (Miles&Smiles)",
    "iGA Lounge — İç Hat",
    "iGA Lounge — Dış Hat",
    "iGA Pop-up Lounge — Dış Hat",
  ],
  SAW: ["Primeclass Lounge (dış hat terminali)", "Aeroport Lounge (iç hat terminali)"],
  ESB: ["Primeclass CIP Lounge (dış hat terminali)", "Anatolia Lounge (iç hat terminali)"],
  ADB: ["Primeclass Lounge (dış hat terminali)"],
  AYT: ["Antalya Airport CIP Lounge (T1 dış hat)"],
  BJV: ["Primeclass Lounge (iç hat)", "Primeclass Lounge (dış hat)"],
  DLM: ["CIP Lounge (T2 iç hat)", "CIP Lounge (T2 dış hat)", "DLM Lounge (Terminal 2)"],
  DIY: ["CIP Lounge (terminal)", "Turkish Airlines CIP Lounge (iç hat)"],
  COV: ["Çelebi Platinum Lounge (iç hat)", "Çelebi Platinum Lounge (dış hat)", "Turkish Airlines CIP Lounge (iç hat)"],
  ADA: ["Turkish Airlines CIP Lounge (iç hat)"],
  GZT: ["Turkish Airlines CIP Lounge (iç hat)"],
  TZX: ["Turkish Airlines CIP Lounge (iç hat)"],
  RZV: ["Turkish Airlines CIP Lounge (iç hat)"],
  ASR: ["Turkish Airlines CIP Lounge (iç hat)"],
  HTY: ["Turkish Airlines CIP Lounge (iç hat)"],
};

// ============================================================
// 🔴 v0.21 — İKİ SAYI TUTMUYOR VE BU KAPATILMIYOR, YAZILIYOR.
// Ölçüm (bu düzeltmeden sonra):
//   · yukarıdaki LOUNGES tablosu       → 29 salon (15 havalimanı)
//   · lib/lounges-data.js LOUNGE_COUNTS.trLounges → 48 salon
// Fark 19 ve nedeni belli: LOUNGES ELLE yazılmış bir VİTRİN listesi,
// lounges-data.js ise data/salonlar.csv'den ÜRETİLEN katalogun kendisi.
// Elle yazılan liste katalogun büyümesini hiç takip etmedi. Ölçülen
// havalimanı bazlı fark (LOUNGES / katalog):
//   AYT 1/8 · SAW 2/6 · ESB 2/5 · ADB 1/3 · DLM 3/4 · BJV 2/3 ·
//   IST 7/8 (Primeclass bilerek dışarıda) · kalan 8 havalimanı eşit.
//
// Neden tek hamlede birleştirmiyoruz: bu dosya lounges-data.js'i
// IMPORT EDEMEZ. check.js denetimi guide.js'i `new Function` ile aynı
// süreçte değerlendiriyor (check.js · loadGuide) ve import satırı
// oradaki değerlendirmeyi kırar — yani denetim tamamen susar. Listeyi
// katalogdan türetmek, önce check.js'in yükleme biçimini değiştirmeyi
// gerektirir; bu tur IST çelişkisini kapatmakla sınırlı tutuldu.
// Bu tur düzeltilen: IST (uydurulmuş kapı harfleri + eksik 2 THY dış
// hat salonu). Düzeltilmeyen: AYT/SAW/ESB/ADB/DLM/BJV eksik satırları.
// ============================================================

// Havalimanına özgü tek cümle — her üretilen sayfada FARKLI olur.
export const loungeLine = (ap) => {
  const l = LOUNGES[ap] || [];
  const a = AIRPORTS[ap];
  if (!l.length) return `${a.name} salon listesi ve güncel kurallar uygulamada yer alır.`;
  return `${a.name}'nda katalogumuzda ${l.length} salon var: ${l.join(", ")}. ` +
    `${a.city} uçuşunu eklediğinde hangi salonun senin kartını kabul ettiğini tek tek görürsün.`;
};

// Elle yazılmış sayfalar korunur; yalnız EKSİK çiftler üretilir.
const generated = [];
for (const [card, rule] of Object.entries(CARD_RULES)) {
  for (const ap of Object.keys(AIRPORTS)) {
    if (ENTRIES.some((e) => e.card === card && e.airport === ap)) continue;
    generated.push({
      card, airport: ap,
      verdict: rule.verdict,
      cardLabel: rule.label,
      headline: rule.title,
      detail: rule.body,
      warning: rule.warn,
      extra: loungeLine(ap),
      generated: true,
    });
  }
}
ENTRIES.push(...generated);

// Elle yazılmış sayfaların bir kısmında `extra` yoktu; havalimanına özgü
// salon satırı onlara da düşer. Aynı sayfada iki kez basılmasın diye
// yalnız boş olanlar doldurulur.
for (const e of ENTRIES) if (!e.extra) e.extra = loungeLine(e.airport);

export const slugOf = (e) => `${e.card}-${e.airport.toLowerCase()}`;
export const allSlugs = () => ENTRIES.map(slugOf);
export const findEntry = (slug) => ENTRIES.find((e) => slugOf(e) === slug);
